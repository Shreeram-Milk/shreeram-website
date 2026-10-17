import Link from 'next/link'
import type { ReactNode } from 'react'

/** A link that looks like a button: orange is only for actions. */
export function Button({ href, children, variant = 'primary', external = false }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary'; external?: boolean }) {
  const className = `btn btn-${variant}`
  if (external) return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  return <Link className={className} href={href}>{children}</Link>
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`card-box ${className}`.trim()}>{children}</div>
}

/** A page band with the shared width. `tone="fill"` gives it the soft warm background. */
export function Section({ children, tone = 'plain', narrow = false, labelledBy }: { children: ReactNode; tone?: 'plain' | 'fill'; narrow?: boolean; labelledBy?: string }) {
  return (
    <section className={`section section-${tone}`} aria-labelledby={labelledBy}>
      <div className={narrow ? 'wrap wrap-narrow' : 'wrap'}>{children}</div>
    </section>
  )
}

/** The one H1 of a page, with a short line under it. */
export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <header className="page-header">
      <h1>{title}</h1>
      {intro ? <p className="lede">{intro}</p> : null}
    </header>
  )
}
