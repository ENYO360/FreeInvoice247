# Invoicely - free invoice generator (React + Vite + Tailwind + Firebase Hosting)

## 1. Run it
```
npm install
cp .env.example .env     # fill in values (see below)
npm run dev              # local
npm run build            # builds + generates per-page HTML, sitemap.xml, robots, llms.txt
```

## 2. Before launch (replace placeholders)
1. Pick a domain, then set `VITE_SITE_URL` in `.env` (rebuild updates canonicals, sitemap, schema, robots, llms.txt).
2. Rename "Invoicely" in `src/lib/pages.js` (`SITE_NAME`) and titles if you prefer another brand.
3. Add a real contact email in `src/pages/PrivacyPage.jsx`.
4. Replace `https://yourdomain.com` once in `index.html` (default canonical/og).

## 3. Deploy (Firebase Hosting)
```
npm i -g firebase-tools
firebase login
firebase init hosting     # public dir: dist, SPA rewrite: No (firebase.json already set), don't overwrite
npm run build && firebase deploy
```
Connect your custom domain in Firebase Console > Hosting.

## 4. Google Analytics
Create a GA4 property > Web stream > copy the `G-XXXX` ID into `VITE_GA_ID`. Page views and a
`download_invoice` / `add_item` event are tracked after the visitor accepts cookies (Consent Mode v2).
In GA4 mark `download_invoice` as a Key event - it is your main conversion.

## 5. Google Search Console (do this on launch day)
Add the domain property, verify via DNS, submit `https://yourdomain.com/sitemap.xml`, then use
URL Inspection > Request indexing on each of the 6 pages. Also add the site to Bing Webmaster Tools
(Bing feeds ChatGPT/Copilot answers - useful for GEO).

## 6. Ads (AdSense)
Apply at adsense.google.com once the site is live with the guide pages and privacy policy.
After approval: set `VITE_ADSENSE_CLIENT` and the two `VITE_AD_SLOT_*` IDs, and put your
`google.com, pub-..., DIRECT, f08c47fec0942fa0` line in `public/ads.txt`.
Ads are hidden until configured. For visitors in the EEA/UK, use Google's certified consent
tool (Privacy & messaging in AdSense) instead of the simple banner.

## 7. SEO + GEO already included
- Unique title/description/canonical per page, written into static HTML at build time
- JSON-LD: Organization, WebSite, WebApplication, FAQPage, HowTo, Article, BreadcrumbList
- sitemap.xml, robots.txt (AI crawlers allowed), llms.txt, clean Q&A-style content AI answers can quote
- Local/GEO page for Nigeria (NGN + 7.5% VAT) - copy the pattern in `src/lib/pages.js` to add
  Ghana, Kenya, South Africa, UK, etc. Each new page = one new object in the `pages` array.

## 8. Growth ideas (highest impact first)
1. Add 1 new landing page per week (e.g. "invoice template for photographers", "proforma invoice generator").
2. Write guides (late-payment email, invoice vs receipt) and link them to the tool.
3. Get 5-10 backlinks: Nigerian dev/startup communities, Product Hunt, Reddit r/freelance, Indie Hackers.
4. Later: optional Firebase Auth + Firestore so users can save clients/invoices and join an email list (your lead capture).
