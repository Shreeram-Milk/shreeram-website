import { Button } from '@/components/ui'

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap wrap-narrow">
        <span className="eyebrow">404 / A LITTLE DETOUR</span>
        <h1>
          Let’s get you
          <br />
          back to the good stuff.
        </h1>
        <p className="lede">
          We couldn’t find that page. A little freshness is waiting for you back
          at our dairy.
        </p>
        <div className="hero-actions">
          <Button href="/products">Explore our dairy ↗</Button>
          <Button href="/" variant="secondary">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  )
}
