import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ToolPage from './pages/ToolPage.jsx'
import GuidePage from './pages/GuidePage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import { pages } from './lib/pages.js'
import { trackPage } from './lib/analytics.js'

const byKind = { tool: ToolPage, guide: GuidePage, privacy: PrivacyPage }

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    const t = setTimeout(() => trackPage(pathname), 50) // wait for <title> to update
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <Layout>
      <Routes>
        {pages.map((p) => {
          const Page = byKind[p.kind]
          return <Route key={p.path} path={p.path} element={<Page page={p} />} />
        })}
        <Route path="*" element={<ToolPage page={pages[0]} />} />
      </Routes>
    </Layout>
  )
}
