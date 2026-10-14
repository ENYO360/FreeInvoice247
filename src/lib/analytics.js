// Google Analytics 4 with Consent Mode v2. Nothing is stored until the visitor accepts.
const GA_ID = import.meta.env.VITE_GA_ID
const CLIENT = import.meta.env.VITE_ADSENSE_CLIENT
const KEY = 'FreeInvoice_consent'

window.dataLayer = window.dataLayer || []
function gtag() { window.dataLayer.push(arguments) }

export function getConsent() { try { return localStorage.getItem(KEY) } catch { return null } }

let started = false
export function initAnalytics() {
  if (started) return
  started = true
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 })
  if (GA_ID) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(s)
    gtag('js', new Date())
    gtag('config', GA_ID, { send_page_view: false })
  }
  if (getConsent() === 'granted') applyConsent(true)
}

export function applyConsent(granted) {
  try { localStorage.setItem(KEY, granted ? 'granted' : 'denied') } catch {}
  const v = granted ? 'granted' : 'denied'
  gtag('consent', 'update', { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v })
  if (granted && CLIENT && !document.getElementById('adsense-js')) {
    const s = document.createElement('script')
    s.id = 'adsense-js'
    s.async = true
    s.crossOrigin = 'anonymous'
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`
    document.head.appendChild(s)
    window.dispatchEvent(new Event('ads-ready'))
  }
}

export function trackPage(path) {
  if (GA_ID) gtag('event', 'page_view', { page_path: path, page_location: window.location.href, page_title: document.title })
}
export function trackEvent(name, params = {}) {
  if (GA_ID) gtag('event', name, params)
}
