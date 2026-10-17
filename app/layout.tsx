import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { SiteFooter, SiteHeader } from '@/components/SiteChrome'
import { SITE_NAME, SITE_URL } from '@/lib/site'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-jakarta' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description: 'Fresh milk and dairy delivered to your door every day.',
  openGraph: { type: 'website', siteName: SITE_NAME, locale: 'en_IN' },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
