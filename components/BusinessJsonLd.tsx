import type { ContactDetails } from '@/lib/content-api'
import { SITE_NAME, SITE_URL } from '@/lib/site'
import { JsonLd } from './JsonLd'

/** Organization and LocalBusiness data for Google. Phone and email are included only when staff have set them. */
export function BusinessJsonLd({ contact }: { contact: ContactDetails | null }) {
  const telephone = contact?.supportPhone ? `+91${contact.supportPhone.replace(/^\+91/, '')}` : undefined
  const email = contact?.supportEmail || undefined
  const image = `${SITE_URL}/opengraph-image`
  const shared = { name: SITE_NAME, url: SITE_URL, ...(email ? { email } : {}), ...(telephone ? { telephone } : {}) }
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, ...shared, logo: image, ...(telephone || email ? { contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', areaServed: 'IN', availableLanguage: ['English', 'Gujarati'], ...(telephone ? { telephone } : {}), ...(email ? { email } : {}) } } : {}) },
          { '@type': 'LocalBusiness', '@id': `${SITE_URL}/#business`, ...shared, image, description: 'Fresh milk and dairy products delivered daily to your door in Gujarat.', areaServed: { '@type': 'AdministrativeArea', name: 'Gujarat' }, address: { '@type': 'PostalAddress', addressRegion: 'Gujarat', addressCountry: 'IN' }, ...(contact?.supportHoursEn ? { openingHours: contact.supportHoursEn } : {}) },
        ],
      }}
    />
  )
}
