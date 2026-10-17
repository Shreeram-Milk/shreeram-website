import type { Metadata, Viewport } from 'next'
import { Manrope, Noto_Sans_Gujarati } from 'next/font/google'
import { SiteFooter, SiteHeader } from '@/components/SiteChrome'
import { MotionRuntime } from '@/components/MotionRuntime'
import { SITE_NAME, SITE_URL } from '@/lib/site'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})
const gujarati = Noto_Sans_Gujarati({
  subsets: ['gujarati'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-gujarati',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description: 'Fresh milk and dairy delivered to your door every day.',
  openGraph: { type: 'website', siteName: SITE_NAME, locale: 'en_IN' },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: '#faf7ef',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} ${gujarati.variable}`}>
      <body>
        <noscript>
          <style>{`@media(max-width:959px){.site-header{position:relative}.header-row{height:auto;min-height:82px;flex-wrap:wrap;padding-block:16px}.menu-toggle{display:none}.main-nav{position:static;visibility:visible;opacity:1;transform:none;box-shadow:none;padding:10px 0 0;max-height:none;flex-direction:row;flex-wrap:wrap;gap:10px 20px;width:100%;border:0}.main-nav>a{opacity:1;transform:none;font-size:12px;padding:7px 0}.main-nav .nav-cta{font-size:12px;margin:0;padding:8px 15px}.mobile-menu-label,.mobile-menu-note{display:none}}`}</style>
        </noscript>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MotionRuntime />
      </body>
    </html>
  )
}
