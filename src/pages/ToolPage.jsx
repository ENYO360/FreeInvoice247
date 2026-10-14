import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import AdSlot from '../components/AdSlot.jsx'
import InvoiceForm from '../components/InvoiceForm.jsx'
import InvoicePreview from '../components/InvoicePreview.jsx'
import { blankInvoice } from '../lib/invoice.js'
import { trackEvent } from '../lib/analytics.js'
import { siteUrl } from '../lib/pages.js'

const STORE = 'freeInvoice_draft'
const load = () => { try { return { ...blankInvoice(), ...JSON.parse(localStorage.getItem(STORE)) } } catch { return blankInvoice() } }

export default function ToolPage({ page }) {
  const [inv, setInv] = useState(load)

  // Apply page preset (currency, tax, wording) when landing on a specialised page.
  useEffect(() => {
    const { items, ...rest } = page.preset || {}
    setInv((p) => {
      const untouched = p.items.length === 1 && !p.items[0].description
      return { ...p, docType: 'INVOICE', ...rest, ...(items && untouched ? { items: items.map((i, n) => ({ ...i, id: n + 1 })) } : {}) }
    })
  }, [page.path])

  useEffect(() => { try { localStorage.setItem(STORE, JSON.stringify(inv)) } catch {} }, [inv])

  const download = () => { trackEvent('download_invoice', { currency: inv.currency, page: page.path }); window.print() }
  const reset = () => { if (confirm('Clear this invoice and start over?')) setInv({ ...blankInvoice(), ...(page.preset ? { currency: page.preset.currency || 'USD' } : {}) }) }

  const app = {
    '@type': 'WebApplication',
    name: page.h1,
    url: siteUrl + page.path,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: page.description,
  }

  return (
    <>
      <Seo page={page} faq={page.faq} extra={[app]} />
      <section className="mx-auto max-w-6xl px-4 pt-8 print:hidden">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{page.h1}</h1>
        <p className="mt-2 max-w-2xl text-slate-600">{page.intro}</p>
      </section>

      <AdSlot slot={import.meta.env.VITE_AD_SLOT_TOP} className="mx-auto mt-6 max-w-6xl px-4" />

      <section className="mx-auto mt-6 grid max-w-6xl gap-6 px-4 lg:grid-cols-2">
        <InvoiceForm inv={inv} setInv={setInv} />
        <div className="space-y-3">
          <div className="flex gap-2 print:hidden">
            <button className="btn flex-1" onClick={download}>Download PDF</button>
            <button className="btn-ghost" onClick={reset}>Reset</button>
          </div>
          <p className="text-xs text-slate-500 print:hidden">Tip: in the print dialog choose “Save as PDF” as the destination.</p>
          <InvoicePreview inv={inv} />
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-3xl space-y-8 px-4 print:hidden">
        <div>
          <h2 className="text-xl font-semibold">How it works</h2>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-600">
            <li>Enter your details and your client's details.</li>
            <li>Add items, tax and any discount. Totals update instantly.</li>
            <li>Click Download PDF and save the file or send it to your client.</li>
          </ol>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Why use FreeInvoice?</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-600">
            <li>100% free, no sign-up, no watermark.</li>
            <li>Private: your invoice stays in your browser and is never uploaded.</li>
            <li>Works on phone, tablet and desktop in 10 major currencies.</li>
          </ul>
        </div>
        {page.faq && (
          <div>
            <h2 className="text-xl font-semibold">Frequently asked questions</h2>
            <div className="mt-3 space-y-4">
              {page.faq.map(([q, a]) => (
                <div key={q}><h3 className="font-medium">{q}</h3><p className="text-slate-600">{a}</p></div>
              ))}
            </div>
          </div>
        )}
        <p className="text-sm text-slate-500">New to invoicing? Read <Link to="/how-to-write-an-invoice" className="underline">how to write an invoice</Link>.</p>
      </section>

      <AdSlot slot={import.meta.env.VITE_AD_SLOT_BOTTOM} className="mx-auto my-10 max-w-6xl px-4" />
    </>
  )
}
