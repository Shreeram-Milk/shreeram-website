import { Button, Card, PageHeader, Section } from '@/components/ui'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'About us',
  description: 'ShreeRam Milks is a family dairy in Gujarat. We deliver fresh milk and dairy products to your door every day.',
  path: '/about',
})

const VALUES = [
  { title: 'Fresh every day', text: 'Milk is collected, checked and delivered the same day, so what reaches you is fresh.' },
  { title: 'Quality we stand behind', text: 'We care about what goes into every bottle and test it before it leaves our dairy.' },
  { title: 'Family, not a factory', text: 'We are a family business. We know our customers and we answer when you call.' },
]

/** Fixed text. The photo areas below are placeholders for the owner's own photos. */
export default function AboutPage() {
  return (
    <>
      <Section narrow>
        <PageHeader title="A family dairy, delivered to your door" intro="ShreeRam Milks began with a simple idea: every family in Gujarat should get pure, fresh milk without a trip to the shop." />
        <p>We work with trusted farms, collect milk fresh and bring it to your door in the morning. Whether you order once or subscribe for every day, you get the same care.</p>
        <p>Order from the app, choose when you want your delivery and pause it whenever you travel. We take care of the rest.</p>
      </Section>
      <Section tone="fill" labelledBy="values-title">
        <h2 id="values-title" className="section-title">What we believe in</h2>
        <div className="grid grid-3">
          {VALUES.map(value => <Card key={value.title}><h3>{value.title}</h3><p className="card-text">{value.text}</p></Card>)}
        </div>
      </Section>
      <Section labelledBy="photos-title">
        <h2 id="photos-title" className="section-title">From our dairy</h2>
        <div className="grid grid-3">
          <div className="photo-slot" role="img" aria-label="Photo of our farm, coming soon">Photo: our farm</div>
          <div className="photo-slot" role="img" aria-label="Photo of our dairy, coming soon">Photo: our dairy</div>
          <div className="photo-slot" role="img" aria-label="Photo of our delivery team, coming soon">Photo: our delivery team</div>
        </div>
        <div className="hero-actions"><Button href="/download">Get the app</Button><Button href="/contact" variant="secondary">Talk to us</Button></div>
      </Section>
    </>
  )
}
