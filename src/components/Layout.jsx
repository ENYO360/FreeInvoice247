
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ConsentBanner from './ConsentBanner.jsx'
import { pages, SITE_NAME } from '../lib/pages.js'

const nav = pages.filter((p) =>
  [
    '/freelance-invoice-generator',
    '/invoice-generator-nigeria',
    '/receipt-generator',
    '/how-to-write-an-invoice',
  ].includes(p.path)
)

const short = {
  '/freelance-invoice-generator': 'Freelance',
  '/invoice-generator-nigeria': 'Nigeria',
  '/receipt-generator': 'Receipts',
  '/how-to-write-an-invoice': 'Guide',
}

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  const navLinkClass = ({ isActive }) =>
    `block rounded-md px-3 py-2 transition-colors ${
      isActive
        ? 'font-semibold text-brand-600 bg-brand-50'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`

  return (
    <div className="flex min-h-screen flex-col">
      <header className="relative border-b border-slate-300 bg-white print:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="text-lg font-bold text-brand-600"
          >
            {SITE_NAME}
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-4 text-sm md:flex"
          >
            {nav.map((p) => (
              <NavLink
                key={p.path}
                to={p.path}
                className={({ isActive }) =>
                  isActive
                    ? 'font-semibold text-brand-600'
                    : 'text-slate-600 hover:text-slate-900'
                }
              >
                {short[p.path]}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 md:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-slate-200 bg-white px-4 py-3 shadow-md md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 text-sm">
              {nav.map((p) => (
                <NavLink
                  key={p.path}
                  to={p.path}
                  onClick={closeMenu}
                  className={navLinkClass}
                >
                  {short[p.path]}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500 print:hidden">
        <p>
          &copy; {new Date().getFullYear()} {SITE_NAME}. Free invoice generator.
        </p>
        <p className="mt-1">
          <Link to="/privacy" className="underline">
            Privacy Policy
          </Link>
        </p>
      </footer>

      <ConsentBanner />
    </div>
  )
}
