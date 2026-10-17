import Image from 'next/image'
import { BusinessJsonLd } from '@/components/BusinessJsonLd'
import { PlayStoreButton } from '@/components/PlayStoreButton'
import { Button, Card } from '@/components/ui'
import { getContact, getHome, getProducts, type ProductCard } from '@/lib/content-api'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300

export async function generateMetadata() {
  const home = await getHome()
  return pageMetadata({ title: home.seoTitle, description: home.seoDescription, path: '/', absoluteTitle: true })
}

const rupees = (paise: number) => `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(paise / 100)}`

// Fixed sections. The photos in /public/images are stand-ins until the owner's own photos replace them.
const TICKER = ['Fresh cow milk', 'Buffalo milk', 'Thick dahi', 'Soft paneer', 'Pure ghee', 'Buttermilk', 'Delivered every morning']

const STATS = [
  { value: 'Daily', label: 'Doorstep delivery, morning or evening' },
  { value: 'Same day', label: 'Milk collected, checked and delivered' },
  { value: '1 tap', label: 'Pause or skip a day when you travel' },
  { value: '2 languages', label: 'Use the app in Gujarati or English' },
]

const STORY = [
  { step: 'Step 1', title: 'From trusted farms', text: 'Healthy, well-fed cattle on farms we know by name.', image: '/images/farm.jpg', alt: 'Cows grazing on a farm at sunrise' },
  { step: 'Step 2', title: 'Checked and bottled', text: 'Every batch is tested and packed fresh the same morning.', image: '/images/bottling.jpg', alt: 'Rows of fresh milk bottles' },
  { step: 'Step 3', title: 'At your door', text: 'Our own delivery team brings it in the slot you choose.', image: '/images/bottle.jpg', alt: 'A glass bottle of fresh milk' },
]

const PLANS = [
  { title: 'Buy once', text: 'Order what you need, when you need it.', points: ['No commitment', 'Pick a delivery slot', 'Pay securely online'], featured: false },
  { title: 'Daily plan', text: 'Fresh milk every morning without ordering again.', points: ['Choose your days', 'Pause or skip anytime', 'Same price, every day'], featured: true },
  { title: 'Try first', text: 'Not sure yet? Start with a short trial pack.', points: ['A few days only', 'Taste the difference', 'Switch to a plan later'], featured: false },
]

const APP_FEATURES = [
  { icon: '🛒', title: 'Order in a minute', text: 'Pick products, choose a slot, pay securely.' },
  { icon: '📅', title: 'Manage your plan', text: 'Change quantity, pause or skip in one tap.' },
  { icon: '🔔', title: 'Know when it arrives', text: 'Delivery updates and offers on your phone.' },
  { icon: 'ગુ', title: 'Gujarati and English', text: 'Use the app in the language you like.' },
]

function ProductTile({ product }: { product: ProductCard }) {
  return (
    <Card className="product-card reveal">
      <div className="product-photo">
        {product.imageUrl ? <Image src={product.imageUrl} alt={product.name} fill sizes="(min-width: 960px) 25vw, (min-width: 640px) 50vw, 100vw" unoptimized /> : null}
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        {product.priceFromPaise > 0 ? <p className="price">From {rupees(product.priceFromPaise)}</p> : null}
      </div>
    </Card>
  )
}

/** The front page. Hero words, highlights, steps, products and the closing call come from the admin's Home page editor; the rest is fixed. */
export default async function HomePage() {
  const home = await getHome()
  const [products, contact] = await Promise.all([home.showProducts ? getProducts() : Promise.resolve([]), getContact()])
  return (
    <>
      <BusinessJsonLd contact={contact} />
      {home.announcement ? <p className="announcement"><span className="live-dot" aria-hidden="true" />{home.announcement}</p> : null}

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow"><span className="live-dot" aria-hidden="true" />Delivering fresh every morning</span>
            <h1>{home.heroTitle}</h1>
            {home.heroSubtitle ? <p className="lede">{home.heroSubtitle}</p> : null}
            <div className="hero-actions">
              <PlayStoreButton url={home.playStoreUrl} />
              <Button href="/about" variant="secondary">Our story</Button>
            </div>
            <div className="hero-trust"><span>Tested every batch</span><span>Fresh every day</span><span>Pause anytime</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-media">
              {home.heroImageUrl
                ? <Image src={home.heroImageUrl} alt="Fresh ShreeRam Milks dairy products" fill sizes="(min-width: 860px) 45vw, 100vw" priority unoptimized />
                : <Image src="/images/hero.jpg" alt="Fresh milk being poured into a glass" fill sizes="(min-width: 860px) 45vw, 100vw" priority />}
            </div>
            <div className="float-card float-a"><span className="float-icon" aria-hidden="true">🚚</span><span><strong>Out for delivery</strong><small>Arriving in your slot</small></span></div>
            <div className="float-card float-b"><span className="float-icon" aria-hidden="true">🥛</span><span><strong>Fresh today</strong><small>Collected this morning</small></span></div>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">{[...TICKER, ...TICKER].map((item, index) => <span key={index} className="ticker-item">{item}</span>)}</div>
      </div>

      <section className="section" aria-label="ShreeRam Milks at a glance">
        <div className="wrap">
          <div className="stats reveal">{STATS.map(stat => <div key={stat.label} className="stat"><div className="stat-value">{stat.value}</div><p className="stat-label">{stat.label}</p></div>)}</div>
        </div>
      </section>

      {home.highlights.length > 0 ? (
        <section className="section section-fill" aria-labelledby="why-title">
          <div className="wrap">
            <div className="section-head reveal"><span className="eyebrow">Why us</span><h2 id="why-title">Why families <span className="accent">choose us</span></h2></div>
            <div className="grid grid-4">
              {home.highlights.map((item, index) => (
                <Card key={index} className="reveal"><div className="icon-dot" aria-hidden="true">✓</div><h3>{item.title}</h3><p className="card-text">{item.text}</p></Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section" aria-labelledby="story-title">
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow">Farm to door</span><h2 id="story-title">From the farm to your <span className="accent">doorstep</span></h2><p className="lede">No middlemen and no long storage. Just fresh milk, the way it should be.</p></div>
          <div className="story">
            {STORY.map(item => (
              <article key={item.title} className="story-card reveal">
                <Image src={item.image} alt={item.alt} fill sizes="(min-width: 860px) 33vw, 100vw" />
                <div className="story-body"><span className="story-step">{item.step}</span><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {home.showProducts && products.length > 0 ? (
        <section className="section section-fill" aria-labelledby="products-title">
          <div className="wrap">
            <div className="section-head reveal"><span className="eyebrow">Our products</span><h2 id="products-title">{home.productsTitle}</h2></div>
            <div className="grid grid-4">{products.map(product => <ProductTile key={product.id} product={product} />)}</div>
          </div>
        </section>
      ) : null}

      <section className="section" aria-labelledby="plans-title">
        <div className="wrap">
          <div className="section-head center reveal"><span className="eyebrow">Ways to buy</span><h2 id="plans-title">Order the way <span className="accent">you like</span></h2><p className="lede">Once, every day, or a short trial first. All from the same app.</p></div>
          <div className="grid grid-3">
            {PLANS.map(plan => (
              <Card key={plan.title} className={`plan-card reveal${plan.featured ? ' featured' : ''}`}>
                {plan.featured ? <span className="plan-tag">Most popular</span> : null}
                <h3>{plan.title}</h3>
                <p className="card-text">{plan.text}</p>
                <ul className="plan-points">{plan.points.map(point => <li key={point}>{point}</li>)}</ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {home.steps.length > 0 ? (
        <section className="section section-fill" aria-labelledby="how-title">
          <div className="wrap">
            <div className="section-head reveal"><span className="eyebrow">How it works</span><h2 id="how-title">Start in <span className="accent">{home.steps.length} simple steps</span></h2></div>
            <ol className="grid grid-4 step-list">
              {home.steps.map((item, index) => (
                <li key={index} className="reveal"><Card><div className="step-number" aria-hidden="true">{index + 1}</div><h3>{item.title}</h3><p className="card-text">{item.text}</p></Card></li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <section className="section" aria-labelledby="app-title">
        <div className="wrap">
          <div className="app-band reveal">
            <div>
              <span className="eyebrow">The app</span>
              <h2 id="app-title">Your dairy, in <span className="accent">your pocket</span></h2>
              <p className="lede">Everything you need to get fresh milk every day, without a single phone call.</p>
              <ul className="app-features">
                {APP_FEATURES.map(item => <li key={item.title}><span className="float-icon" aria-hidden="true">{item.icon}</span><span><strong>{item.title}</strong><br /><span className="card-text">{item.text}</span></span></li>)}
              </ul>
              <div className="hero-actions"><PlayStoreButton url={home.playStoreUrl} /></div>
            </div>
            <div className="phone" aria-hidden="true">
              <div className="phone-screen">
                <div className="phone-top"><small>Good morning</small><strong>Your milk is on the way</strong></div>
                <div className="phone-row"><span className="thumb"><Image src="/images/glass.jpg" alt="" fill sizes="40px" /></span><span><b>Cow milk</b>1 litre · daily</span><em>Today</em></div>
                <div className="phone-row"><span className="thumb"><Image src="/images/dahi.jpg" alt="" fill sizes="40px" /></span><span><b>Dahi</b>500 g</span><em>Today</em></div>
                <div className="phone-row"><span className="thumb"><Image src="/images/paneer.jpg" alt="" fill sizes="40px" /></span><span><b>Paneer</b>200 g</span><em>Sat</em></div>
                <div className="phone-pill">✓ Plan active · next delivery tomorrow</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="cta-title">
        <div className="wrap">
          <div className="cta-band reveal">
            <h2 id="cta-title">{home.ctaTitle || 'Get the ShreeRam Milks app'}</h2>
            {home.ctaText ? <p className="lede">{home.ctaText}</p> : null}
            <div className="hero-actions"><PlayStoreButton url={home.playStoreUrl} /><Button href="/contact" variant="secondary">Talk to us</Button></div>
          </div>
        </div>
      </section>
    </>
  )
}
