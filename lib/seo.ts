import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from './site'

/** One place that builds a page's title, description, canonical link and share tags, so no page forgets one. */
export function pageMetadata({ title, description, path, absoluteTitle = false }: { title: string; description: string; path: string; absoluteTitle?: boolean }): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${SITE_NAME}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: SITE_NAME, title: fullTitle, description, url: `${SITE_URL}${path}`, locale: 'en_IN' },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
  }
}
