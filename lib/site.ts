/** The public address of the website; canonical links, the sitemap and structured data all start from it. */
export const SITE_URL = 'https://shreerammilk.com'
export const SITE_NAME = 'ShreeRam Milks'
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000').replace(/\/$/, '')

/** How long a page may be served before it is rebuilt from the backend. Keeps the backend quiet under traffic. */
export const REVALIDATE_SECONDS = 300

export type NavLink = { href: string; label: string }

export const MAIN_NAV: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/help', label: 'Help' },
  { href: '/contact', label: 'Contact' },
  { href: '/download', label: 'Download app' },
]

export const POLICY_NAV: NavLink[] = [
  { href: '/privacy', label: 'Privacy policy' },
  { href: '/terms', label: 'Terms & conditions' },
  { href: '/refund-policy', label: 'Refund policy' },
  { href: '/delivery-policy', label: 'Delivery policy' },
  { href: '/account-deletion', label: 'Delete account' },
]

/** Every public page, for the sitemap. */
export const ALL_PATHS: string[] = [...MAIN_NAV, ...POLICY_NAV].map(link => link.href)
