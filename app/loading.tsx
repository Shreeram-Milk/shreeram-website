export default function Loading() {
  return (
    <section className="section" aria-busy="true" aria-label="Loading page">
      <div className="wrap">
        <span className="eyebrow">A LITTLE FRESHNESS IS ON ITS WAY</span>
        <div className="loading-skeleton" aria-hidden="true">
          <span />
          <span />
          <span />
          <div />
        </div>
        <p className="sr-only" role="status">
          Loading ShreeRam Milks…
        </p>
      </div>
    </section>
  )
}
