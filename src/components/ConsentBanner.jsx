import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getConsent, applyConsent } from '../lib/analytics.js'

export default function ConsentBanner() {
  const [open, setOpen] = useState(() => getConsent() === null)
  if (!open) return null
  const choose = (v) => { applyConsent(v); setOpen(false) }
  return (
    <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white p-4 shadow-lg print:hidden">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center">
        <p className="flex-1 text-sm text-slate-600">
          We use cookies for analytics and ads, which keep this tool free. Your invoice data never leaves your browser.{' '}
          <Link to="/privacy" className="underline">Learn more</Link>
        </p>
        <div className="flex gap-2">
          <button className="btn-ghost" onClick={() => choose(false)}>Decline</button>
          <button className="btn" onClick={() => choose(true)}>Accept</button>
        </div>
      </div>
    </div>
  )
}
