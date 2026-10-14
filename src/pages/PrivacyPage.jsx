import Seo from '../components/Seo.jsx'

export default function PrivacyPage({ page }) {
  return (
    <>
      <Seo page={page} />
      <article className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-slate-600">
        <h1 className="text-3xl font-bold text-slate-800">{page.h1}</h1>
        <p><strong>Your invoices.</strong> The details you type are processed in your browser and saved only in your browser's local storage. We do not upload or store them on our servers.</p>
        <p><strong>Analytics.</strong> With your consent we use Google Analytics to understand how many people use the site and which pages are popular.</p>
        <p><strong>Advertising.</strong> With your consent, Google AdSense may show ads and use cookies to personalise them. You can decline, and ads may still appear but will not be personalised.</p>
        <p><strong>Your choices.</strong> Clear your browser storage to reset your consent choice and delete any saved draft.</p>
        <p><strong>Contact.</strong> Add your contact email here before launch.</p>
      </article>
    </>
  )
}
