// Runs after `vite build`:
//  1. writes a per-route index.html with the right <title>, description, canonical & og tags
//     (so crawlers and social scrapers see page-specific metadata without running JS)
//  2. injects a short crawlable <noscript> summary into each page
//  3. generates sitemap.xml, and rewrites the Sitemap line in robots.txt and the URLs in llms.txt
import fs from 'node:fs'
import path from 'node:path'
import { pages } from '../src/lib/pages.js'

const SITE = (process.env.VITE_SITE_URL || (fs.existsSync('.env') && /VITE_SITE_URL=(.+)/.exec(fs.readFileSync('.env', 'utf8'))?.[1]) || 'https://yourdomain.com').trim().replace(/\/$/, '')
const dist = 'dist'
const base = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const p of pages) {
  const url = SITE + (p.path === '/' ? '/' : p.path)
  let html = base
    .replace(/<title>.*?<\/title>/s, `<title>${esc(p.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(p.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(p.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(p.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/<noscript>.*?<\/noscript>/s, `<noscript><h1>${esc(p.h1)}</h1><p>${esc(p.intro || p.description)}</p></noscript>`)
  if (p.path === '/') fs.writeFileSync(path.join(dist, 'index.html'), html)
  else { fs.mkdirSync(path.join(dist, p.path), { recursive: true }); fs.writeFileSync(path.join(dist, p.path, 'index.html'), html) }
}

const lastmod = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
  .map((p) => `  <url><loc>${SITE}${p.path === '/' ? '/' : p.path}</loc><lastmod>${lastmod}</lastmod><priority>${p.path === '/' ? '1.0' : '0.8'}</priority></url>`)
  .join('\n')}\n</urlset>\n`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)

for (const f of ['robots.txt', 'llms.txt']) {
  const fp = path.join(dist, f)
  if (fs.existsSync(fp)) fs.writeFileSync(fp, fs.readFileSync(fp, 'utf8').replaceAll('https://yourdomain.com', SITE))
}
console.log(`postbuild: ${pages.length} pages, sitemap + robots + llms.txt for ${SITE}`)
