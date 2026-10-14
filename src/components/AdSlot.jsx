import { useEffect, useRef } from 'react'

const CLIENT = import.meta.env.VITE_ADSENSE_CLIENT

// Responsive display ad. Renders nothing until AdSense is configured.
// Space is reserved (min-height) so ads never shift the layout (good for Core Web Vitals).
export default function AdSlot({ slot, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!CLIENT || !slot) return
    const push = () => {
      if (ref.current && !ref.current.dataset.filled) {
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); ref.current.dataset.filled = '1' } catch {}
      }
    }
    push()
    window.addEventListener('ads-ready', push)
    return () => window.removeEventListener('ads-ready', push)
  }, [slot])

  if (!CLIENT || !slot) return null
  return (
    <aside aria-label="Advertisement" className={`print:hidden ${className}`}>
      <p className="mb-1 text-center text-[10px] uppercase tracking-wide text-slate-400">Advertisement</p>
      <ins ref={ref} className="adsbygoogle block" style={{ display: 'block', minHeight: 90 }}
        data-ad-client={CLIENT} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" />
    </aside>
  )
}
