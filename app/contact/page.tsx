import Image from 'next/image'
import Link from 'next/link'
import { BusinessJsonLd } from '@/components/BusinessJsonLd'
import { PageHeader } from '@/components/ui'
import { Icon, ArrowIcon } from '@/components/Icons'
import { getContact } from '@/lib/content-api'
import { pageMetadata } from '@/lib/seo'
export const revalidate = 300
export const metadata = pageMetadata({
  title: 'Contact us',
  description:
    'Call, WhatsApp or email ShreeRam Milks. We are happy to help with orders, deliveries and your account.',
  path: '/contact',
})
const withCountryCode = (value: string) => {
  const digits = value.replace(/\D/g, '')
  return digits.length === 10 ? `91${digits}` : digits
}
export default async function ContactPage() {
  const contact = await getContact()
  const rows = contact
    ? [
        contact.supportPhone && {
          label: 'Give us a call',
          value: contact.supportPhone,
          href: `tel:+${withCountryCode(contact.supportPhone)}`,
        },
        contact.supportWhatsApp && {
          label: 'A message on WhatsApp',
          value: contact.supportWhatsApp,
          href: `https://wa.me/${withCountryCode(contact.supportWhatsApp)}`,
        },
        contact.supportEmail && {
          label: 'Drop us a little note',
          value: contact.supportEmail,
          href: `mailto:${contact.supportEmail}`,
        },
      ].filter((row): row is { label: string; value: string; href: string } =>
        Boolean(row),
      )
    : []
  return (
    <section className="section">
      <div className="wrap">
        <BusinessJsonLd contact={contact} />
        <div className="contact-hero">
          <PageHeader
            title="Good conversations start here."
            intro="A question, a little feedback or help with your daily dairy. We’re happy to hear from you."
          />
        </div>
        <div className="contact-layout">
          <div>
            {rows.length ? (
              <ul className="contact-list">
                {rows.map((row) => (
                  <li key={row.label} className="reveal">
                    <span className="contact-label">{row.label}</span>
                    <a
                      className="contact-value"
                      href={row.href}
                      target={
                        row.href.startsWith('https') ? '_blank' : undefined
                      }
                      rel={
                        row.href.startsWith('https')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                    >
                      {row.value} <ArrowIcon />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state" role="status">
                <Icon name="bell" size={30} />
                <h2>Our details are unavailable right now.</h2>
                <p>
                  Please try again in a little while. You can also find support
                  through the ShreeRam Milks app.
                </p>
                <Link href="/download" className="text-link">
                  Discover the app <ArrowIcon />
                </Link>
              </div>
            )}
            {contact?.supportHoursEn ? (
              <div className="contact-hours">
                <Icon name="calendar" />
                <div>
                  <span className="contact-label">Here when you need us</span>
                  <p>{contact.supportHoursEn}</p>
                </div>
              </div>
            ) : null}
          </div>
          <aside className="contact-side reveal">
            <div className="photo">
              <Image
                src="/images/farm.jpg"
                alt="A green dairy farm"
                fill
                sizes="(min-width: 700px) 40vw, 90vw"
              />
            </div>
            <h2>From our family to yours.</h2>
            <p>
              Good service is part of good dairy. Every question matters, just
              like every delivery.
            </p>
            <Link className="text-link" href="/help">
              Visit the help centre <ArrowIcon />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  )
}
