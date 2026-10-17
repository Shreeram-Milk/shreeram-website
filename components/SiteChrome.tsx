import Link from 'next/link'
import { MAIN_NAV, POLICY_NAV, SITE_NAME } from '@/lib/site'

function BrandLogo() {
  return (
    <>
      <span className="brand-mark" aria-hidden="true">🥛</span>
      <span className="brand-name">ShreeRam <span>Milks</span></span>
    </>
  )
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/" className="brand" aria-label={`${SITE_NAME} home`}><BrandLogo /></Link>
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
          <p className="footer-brand"><Link href="/" className="brand" aria-label={`${SITE_NAME} home`}><BrandLogo /></Link></p>
          <p className="footer-note">Fresh milk and dairy from a family business in Gujarat, delivered to your door every morning.</p>
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
      <div className="wrap">
        <div className="footer-copy"><span>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span><span>Made with care in Gujarat</span></div>
      </div>
    </footer>
  )
}
