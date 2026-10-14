import { Helmet } from 'react-helmet-async'
import { siteUrl, SITE_NAME } from '../lib/pages.js'

export default function Seo({ page, faq, extra = [] }) {
  const url = siteUrl + (page.path === '/' ? '/' : page.path)
  const graph = [
    { '@type': 'Organization', '@id': siteUrl + '/#org', name: SITE_NAME, url: siteUrl, logo: siteUrl + '/favicon.svg' },
    { '@type': 'WebSite', '@id': siteUrl + '/#site', url: siteUrl, name: SITE_NAME, publisher: { '@id': siteUrl + '/#org' } },
    ...extra,
  ]
  if (faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    })
  }
  if (page.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl + '/' },
        { '@type': 'ListItem', position: 2, name: page.h1, item: url },
      ],
    })
  }
  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={url} />
      <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
    </Helmet>
  )
}
