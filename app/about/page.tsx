import Image from 'next/image'
import { Button, Card, Section } from '@/components/ui'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'About us',
  description: 'ShreeRam Milks is a family dairy in Gujarat. We deliver fresh milk and dairy products to your door every day.',
  path: '/about',
})

const VALUES = [
  { icon: '🌿', title: 'Fresh, every day', text: 'Milk is collected, checked and delivered the same day, so what reaches you is fresh.' },
  { icon: '🧪', title: 'Quality we stand behind', text: 'We care about what goes into every bottle and test it before it leaves our dairy.' },
  { icon: '🏡', title: 'Family, not a factory', text: 'We are a family business. We know our customers and we answer when you call.' },
]

// Stand-in photos; the owner replaces the files in /public/images with their own.
const PHOTOS = [
  { src: '/images/farm.jpg', alt: 'Cows on a farm' },
  { src: '/images/bottling.jpg', alt: 'Fresh milk bottles' },
  { src: '/images/dahi.jpg', alt: 'Fresh dahi in jars' },
]

/** Fixed text and photos. */
export default function AboutPage() {
  return (
    <>
      <Section>
        <div className="split">
          <div>
            <span className="eyebrow">Our story</span>
            <h1>A family dairy, delivered to <span className="accent">your door</span></h1>
            <p className="lede">ShreeRam Milks began with a simple idea: every family in Gujarat should get pure, fresh milk without a trip to the shop.</p>
            <p>We work with trusted farms, collect milk fresh and bring it to your door. Whether you order once or subscribe for every day, you get the same care.</p>
            <p>Order from the app, choose when you want your delivery and pause it whenever you travel. We take care of the rest.</p>
          </div>
          <div className="photo reveal"><Image src="/images/jar.jpg" alt="A jar of fresh milk" fill sizes="(min-width: 860px) 50vw, 100vw" priority /></div>
        </div>
      </Section>
      <Section tone="fill" labelledBy="values-title">
        <div className="section-head reveal"><span className="eyebrow">What we believe in</span><h2 id="values-title">Simple promises, <span className="accent">kept daily</span></h2></div>
        <div className="grid grid-3">
          {VALUES.map(value => <Card key={value.title} className="reveal"><div className="icon-dot" aria-hidden="true">{value.icon}</div><h3>{value.title}</h3><p className="card-text">{value.text}</p></Card>)}
        </div>
      </Section>
      <Section labelledBy="photos-title">
        <div className="section-head reveal"><span className="eyebrow">Inside our dairy</span><h2 id="photos-title">From our dairy to you</h2></div>
        <div className="grid grid-3">
          {PHOTOS.map(photo => <div key={photo.src} className="photo reveal"><Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw" /></div>)}
        </div>
        <div className="hero-actions"><Button href="/download">Get the app</Button><Button href="/contact" variant="secondary">Talk to us</Button></div>
      </Section>
    </>
  )
}
