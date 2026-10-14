import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { siteUrl } from '../lib/pages.js'

export default function GuidePage({ page }) {
  const howTo = {
    '@type': 'HowTo',
    name: page.h1,
    step: page.steps.map(([name, text], i) => ({ '@type': 'HowToStep', position: i + 1, name, text })),
  }
  const article = { '@type': 'Article', headline: page.h1, mainEntityOfPage: siteUrl + page.path, author: { '@id': siteUrl + '/#org' }, publisher: { '@id': siteUrl + '/#org' } }
  return (
    <>
      <Seo page={page} faq={page.faq} extra={[howTo, article]} />
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{page.h1}</h1>
        <p className="mt-3 text-slate-600">{page.intro}</p>
        <Link to="/" className="btn mt-5">Create an invoice now</Link>

        <h2 className="mt-10 text-xl font-semibold">8 steps to a professional invoice</h2>
        <ol className="mt-4 space-y-4">
          {page.steps.map(([name, text], i) => (
            <li key={name} className="rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="font-semibold">{i + 1}. {name}</h3>
              <p className="mt-1 text-slate-600">{text}</p>
            </li>
          ))}
        </ol>

        <AdSlot slot={import.meta.env.VITE_AD_SLOT_BOTTOM} className="my-8" />

        <h2 className="mt-8 text-xl font-semibold">Frequently asked questions</h2>
        <div className="mt-3 space-y-4">
          {page.faq.map(([q, a]) => (<div key={q}><h3 className="font-medium">{q}</h3><p className="text-slate-600">{a}</p></div>))}
        </div>
      </article>
    </>
  )
}
