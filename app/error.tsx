'use client'

import { Button } from '@/components/ui'

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="section">
      <div className="wrap wrap-narrow">
        <span className="eyebrow">LET’S TRY THAT AGAIN</span>
        <h1>
          A little pause
          <br />
          in your day.
        </h1>
        <p className="lede">
          This page couldn’t load just now. Give it another try, or head back to
          our dairy.
        </p>
        <div className="hero-actions">
          <button type="button" onClick={reset}>
            Try again
          </button>
          <Button href="/" variant="secondary">
            Back to home ↗
          </Button>
        </div>
      </div>
    </section>
  )
}
