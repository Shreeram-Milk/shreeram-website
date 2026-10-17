import Image from 'next/image'
import Link from 'next/link'
import { MAIN_NAV, POLICY_NAV, SITE_NAME } from '@/lib/site'
export { SiteHeader } from './SiteHeader'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <span className="eyebrow">GOOD FOOD. GOOD MORNINGS.</span>
        <p>
          A fresh start.
          <br />
          <span>Every single day.</span>
        </p>
        <Link
          href="/products"
          className="footer-arrow"
          aria-label="Explore our dairy"
        >
          ↗
        </Link>
      </div>
      <div className="wrap footer-grid">
        <div>
          <Link href="/" className="brand" aria-label={`${SITE_NAME} home`}>
            <Image
              className="brand-mark"
              src="/logo.png"
              alt=""
              width={52}
              height={52}
            />
            <span>ShreeRam Milks</span>
          </Link>
          <p className="footer-note">
            Fresh milk and dairy from a family business in Gujarat. A little
            care, delivered to your door.
          </p>
          <span className="footer-gujarati" lang="gu">
            તાજું દૂધ, દરરોજ.
          </span>
        </div>
        <nav aria-label="Pages">
          <p className="footer-title">Explore</p>
          <ul>
            {MAIN_NAV.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Policies">
          <p className="footer-title">The details</p>
          <ul>
            {POLICY_NAV.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="wrap">
        <div className="footer-copy">
          <span>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </span>
          <span>Rooted in Gujarat. Delivered with care.</span>
        </div>
      </div>
    </footer>
  )
}
