import Link from 'next/link'
import { MAIN_NAV, POLICY_NAV, SITE_NAME } from '@/lib/site'

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/" className="brand">{SITE_NAME}</Link>
        <nav aria-label="Main" className="main-nav">
          {MAIN_NAV.map(link => <Link key={link.href} href={link.href} className={link.href === '/download' ? 'nav-cta' : undefined}>{link.label}</Link>)}
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-brand">{SITE_NAME}</p>
          <p className="footer-note">Fresh milk and dairy from a family business, delivered to your door.</p>
        </div>
        <nav aria-label="Pages">
          <p className="footer-title">Pages</p>
          <ul>{MAIN_NAV.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul>
        </nav>
        <nav aria-label="Policies">
          <p className="footer-title">Policies</p>
          <ul>{POLICY_NAV.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul>
        </nav>
      </div>
      <div className="wrap footer-copy">© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</div>
    </footer>
  )
}
