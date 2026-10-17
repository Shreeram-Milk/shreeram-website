import { BusinessJsonLd } from '@/components/BusinessJsonLd'
import { Card, PageHeader, Section } from '@/components/ui'
import { getContact } from '@/lib/content-api'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300
export const metadata = pageMetadata({
  title: 'Contact us',
  description: 'Call, WhatsApp or email ShreeRam Milks. We are happy to help with orders, deliveries and your account.',
  path: '/contact',
})

const digitsOf = (value: string) => value.replace(/\D/g, '')
const withCountryCode = (value: string) => {
  const digits = digitsOf(value)
  return digits.length === 10 ? `91${digits}` : digits
}

/** Contact details are the ones set in the admin's App Settings; only what is filled in is shown. */
export default async function ContactPage() {
  const contact = await getContact()
  const rows = contact
    ? [
        contact.supportPhone && { label: 'Phone', value: contact.supportPhone, href: `tel:+${withCountryCode(contact.supportPhone)}` },
        contact.supportWhatsApp && { label: 'WhatsApp', value: contact.supportWhatsApp, href: `https://wa.me/${withCountryCode(contact.supportWhatsApp)}` },
        contact.supportEmail && { label: 'Email', value: contact.supportEmail, href: `mailto:${contact.supportEmail}` },
      ].filter((row): row is { label: string; value: string; href: string } => Boolean(row))
    : []
  return (
    <Section narrow>
      <BusinessJsonLd contact={contact} />
      <PageHeader title="Contact us" intro="Questions about an order, a delivery or your account? Reach us here." />
      {rows.length > 0 ? (
        <Card>
          <ul className="contact-list">
            {rows.map(row => (
              <li key={row.label}><span className="contact-label">{row.label}</span><a className="contact-value" href={row.href}>{row.value}</a></li>
            ))}
            {contact?.supportHoursEn ? <li><span className="contact-label">Hours</span><span className="contact-value">{contact.supportHoursEn}</span></li> : null}
          </ul>
        </Card>
      ) : (
        <p className="notice" role="status">Our contact details are not available right now. Please try again in a little while.</p>
      )}
    </Section>
  )
}
