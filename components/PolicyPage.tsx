import type { Metadata } from 'next'
import Link from 'next/link'
import { POLICY_NAV } from '@/lib/site'
import { getPolicy } from '@/lib/content-api'
import { pageMetadata } from '@/lib/seo'
import { PageHeader, Section } from './ui'

export type PolicyRoute = {
  path: string
  type: string
  title: string
  description: string
}

export const POLICY_ROUTES: Record<
  'privacy' | 'terms' | 'refund' | 'delivery',
  PolicyRoute
> = {
  privacy: {
    path: '/privacy',
    type: 'privacy',
    title: 'Privacy policy',
    description:
      'What ShreeRam Milks collects, why we collect it and how long we keep it.',
  },
  terms: {
    path: '/terms',
    type: 'terms',
    title: 'Terms and conditions',
    description:
      'The rules for ordering, subscriptions and using ShreeRam Milks.',
  },
  refund: {
    path: '/refund-policy',
    type: 'refund',
    title: 'Refund policy',
    description:
      'When and how ShreeRam Milks refunds an order or a missed delivery.',
  },
  delivery: {
    path: '/delivery-policy',
    type: 'delivery',
    title: 'Delivery policy',
    description: 'Where, when and how ShreeRam Milks delivers your order.',
  },
}

export const policyMetadata = (route: PolicyRoute): Metadata =>
  pageMetadata({
    title: route.title,
    description: route.description,
    path: route.path,
  })

/** A blank line starts a new paragraph; a single line break stays a line break. Rendered as text, never as HTML. */
const paragraphsOf = (body: string): string[] =>
  body
    .split(/\r?\n\s*\r?\n/)
    .map((part) => part.trim())
    .filter(Boolean)

/** One published policy, as written in the admin's Legal & Policies. */
export async function PolicyPage({ route }: { route: PolicyRoute }) {
  const policy = await getPolicy(route.type)
  return (
    <Section>
      <div className="page-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Policies & information</span>
      </div>
      <div className="policy-layout">
        <aside className="policy-sidebar">
          <span className="eyebrow">THE DETAILS</span>
          <nav aria-label="Policy documents">
            {POLICY_NAV.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                aria-current={link.href === route.path ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <article>
          <PageHeader
            title={policy?.titleEn || route.title}
            intro={
              policy
                ? `Version ${policy.version} · Effective ${policy.effectiveDate}`
                : undefined
            }
          />
          {policy ? (
            <div className="prose">
              {paragraphsOf(policy.bodyEn).map((part, index) => (
                <p key={index} className="pre-line">
                  {part}
                </p>
              ))}
            </div>
          ) : (
            <p className="notice">
              This document is not available right now. Please check back soon.
            </p>
          )}
        </article>
      </div>
    </Section>
  )
}
