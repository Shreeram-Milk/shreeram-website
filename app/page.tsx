import Image from 'next/image'
import Link from 'next/link'
import { BusinessJsonLd } from '@/components/BusinessJsonLd'
import { Icon, type IconName, ArrowIcon } from '@/components/Icons'
import { PlayStoreButton } from '@/components/PlayStoreButton'
import { PhonePreview } from '@/components/PhonePreview'
import { ProductTile, RangePreview } from '@/components/DairyCollection'
import { Button } from '@/components/ui'
import { getContact, getHome, getProducts } from '@/lib/content-api'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300
export async function generateMetadata() {
  const home = await getHome()
  return pageMetadata({
    title: home.seoTitle,
    description: home.seoDescription,
    path: '/',
    absoluteTitle: true,
  })
}
const STORY = [
  {
    title: 'Goodness starts at the farm.',
    text: 'Trusted farms. Thoughtful care. This is where the journey of your everyday essentials begins.',
    image: 'farm',
    alt: 'Cows grazing on a farm',
    label: 'ROOTED IN CARE',
    detail: '01 / THE SOURCE',
  },
  {
    title: 'Care in every little detail.',
    text: 'Collected fresh and carefully checked before packing. Because what reaches your family matters to ours.',
    image: 'bottling',
    alt: 'Glass milk bottles at the dairy',
    label: 'QUALITY COMES FIRST',
    detail: '02 / THE DAIRY',
  },
  {
    title: 'Freshness meets your doorstep.',
    text: 'Your favourite dairy, delivered in your chosen slot. A simpler routine, and one less thing to think about.',
    image: 'bottle',
    alt: 'Fresh milk in a glass bottle',
    label: 'A BETTER EVERYDAY',
    detail: '03 / YOUR HOME',
  },
]
const PLANS = [
  {
    title: 'A little, now & then.',
    label: 'ONE-TIME ORDER',
    text: 'For the recipe you want to try or the extra milk you need.',
    points: [
      'Choose what you need',
      'Pick your delivery slot',
      'Order whenever you like',
    ],
    featured: false,
  },
  {
    title: 'Make it a daily thing.',
    label: 'YOUR DAILY PLAN',
    text: 'The comfort of fresh dairy, always part of your morning.',
    points: [
      'Choose your delivery days',
      'Pause or skip when you need',
      'Manage everything in the app',
    ],
    featured: true,
  },
  {
    title: 'Find your favourite.',
    label: 'START SMALL',
    text: 'Get to know our dairy with a one-time order first.',
    points: [
      'Explore the dairy range',
      'Start with your essentials',
      'Build your routine later',
    ],
    featured: false,
  },
]
export default async function HomePage() {
  const home = await getHome()
  const [products, contact] = await Promise.all([
    home.showProducts ? getProducts() : Promise.resolve([]),
    getContact(),
  ])
  const highlightIcons: IconName[] = ['leaf', 'shield', 'home', 'calendar']
  return (
    <>
      <BusinessJsonLd contact={contact} />
      {home.announcement ? (
        <p className="announcement">{home.announcement}</p>
      ) : null}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker hero-enter">
              <span className="status-dot" />
              GOOD MORNINGS START HERE
            </div>
            <p className="gujarati hero-enter" lang="gu">
              તાજું દૂધ, દરરોજ.
            </p>
            <h1 className="hero-enter">{home.heroTitle}</h1>
            {home.heroSubtitle ? (
              <p className="lede hero-enter">{home.heroSubtitle}</p>
            ) : null}
            <div className="hero-actions hero-enter">
              <Button href="/products">
                Explore our dairy <ArrowIcon />
              </Button>
              <Button href="/download" variant="secondary">
                Get the app <Icon name="cart" size={18} />
              </Button>
            </div>
            <div className="hero-bottom hero-enter">
              <span className="hero-seal">
                <Icon name="leaf" size={25} />
              </span>
              <span>
                From our dairy. To your family.
                <small>Fresh essentials, a little closer to home.</small>
              </span>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-media">
              <Image
                src={home.heroImageUrl || '/images/hero.jpg'}
                alt="Fresh milk being poured into a glass"
                fill
                sizes="(min-width: 960px) 48vw, 95vw"
                preload
                unoptimized={Boolean(home.heroImageUrl)}
              />
              <span className="hero-image-label">
                THE EVERYDAY, MADE FRESH.
              </span>
              <div className="hero-photo-caption">
                <span>
                  A glass full
                  <br />
                  of good mornings.
                </span>
                <ArrowIcon />
              </div>
            </div>
            <div className="fresh-stamp">
              <Icon name="leaf" size={26} />
              <span>
                Freshness
                <br />
                <strong>comes first.</strong>
              </span>
            </div>
            <span className="hero-side-note">
              G U J A R A T · W I T H L O V E
            </span>
          </div>
        </div>
        <div className="wrap hero-scroll">
          <a href="#collection">
            <span className="scroll-line" />A little goodness awaits{' '}
            <Icon name="arrowDown" size={18} />
          </a>
          <span>FRESH MILK & DAIRY / EVERY DAY</span>
        </div>
      </section>
      <div className="trust-strip">
        <div className="wrap">
          {[
            { icon: 'leaf', text: 'Fresh dairy essentials' },
            { icon: 'home', text: 'Delivered to your door' },
            { icon: 'calendar', text: 'Your routine, your way' },
            { icon: 'language', text: 'Rooted in Gujarat' },
          ].map((item) => (
            <span key={item.text}>
              <Icon name={item.icon as IconName} size={21} />
              {item.text}
            </span>
          ))}
        </div>
      </div>
      <section className="section collection-section" id="collection">
        <div className="wrap">
          <div className="section-heading-row reveal">
            <div>
              <span className="eyebrow">THE GOOD STUFF</span>
              <h2>
                Everyday essentials.
                <br />
                <span className="muted-heading">Extraordinary care.</span>
              </h2>
            </div>
            <div>
              <p>
                From the first sip to the last bite.
                <br />
                Bring a little freshness to your table.
              </p>
              <Link href="/products" className="text-link">
                Explore the collection <ArrowIcon />
              </Link>
            </div>
          </div>
          {home.showProducts && products.length ? (
            <>
              <h3 className="catalog-heading">{home.productsTitle}</h3>
              <div className="product-grid">
                {products.map((product) => (
                  <ProductTile product={product} key={product.id} />
                ))}
              </div>
            </>
          ) : (
            <RangePreview />
          )}
          <p className="collection-note">
            Explore our dairy range. Current availability and ordering are in
            the ShreeRam Milks app.
          </p>
        </div>
      </section>
      {home.highlights.length ? (
        <section className="section highlights-band">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow">A LITTLE MORE CARE</span>
              <h2>Goodness you can count on.</h2>
            </div>
            <ul className="features features-4">
              {home.highlights.map((item, index) => (
                <li
                  className="feature reveal"
                  data-delay={index * 80}
                  key={index}
                >
                  <Icon name={highlightIcons[index % 4]} size={28} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <section className="section story-section" id="our-journey">
        <div className="wrap">
          <div className="section-heading-row reveal">
            <div>
              <span className="eyebrow">THE SHORT JOURNEY TO FRESH</span>
              <h2>
                From a caring farm.
                <br />
                To a happy home.
              </h2>
            </div>
            <p>
              Good dairy has a story.
              <br />
              Here’s a little of ours.
            </p>
          </div>
          <div className="journey">
            {STORY.map((item, index) => (
              <article
                className={`journey-step${index % 2 ? ' reverse' : ''}`}
                key={item.title}
              >
                <span className="journey-node" aria-hidden="true">
                  0{index + 1}
                </span>
                <div
                  className="journey-photo photo reveal"
                  data-motion={index % 2 ? 'right' : 'left'}
                >
                  <Image
                    src={`/images/${item.image}.jpg`}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 960px) 42vw, 90vw"
                  />
                  <span>{item.detail}</span>
                </div>
                <div className="journey-copy reveal" data-delay="120">
                  <span className="eyebrow">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  {index === 2 ? (
                    <Link href="/about" className="text-link">
                      Meet ShreeRam Milks <ArrowIcon />
                    </Link>
                  ) : (
                    <span className="journey-small">
                      Made with care. Every step of the way.
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section plans-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">FITS INTO YOUR LIFE</span>
            <h2>
              A fresh routine.
              <br />
              <span className="muted-heading">On your terms.</span>
            </h2>
            <p>
              One order or an everyday habit. There’s a way that works for you.
            </p>
          </div>
          <div className="plans-grid">
            {PLANS.map((plan, index) => (
              <article
                className={`plan reveal${plan.featured ? ' plan-featured' : ''}`}
                data-delay={index * 100}
                key={plan.label}
              >
                <span className="micro-label">{plan.label}</span>
                {plan.featured ? (
                  <span className="plan-featured-mark">
                    <Icon name="calendar" />
                  </span>
                ) : null}
                <h3>{plan.title}</h3>
                <p>{plan.text}</p>
                <ul className="plan-points">
                  {plan.points.map((point) => (
                    <li key={point}>
                      <Icon name="check" size={17} />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link className="plan-link" href="/download">
                  {plan.featured
                    ? 'Build your daily routine'
                    : 'Explore in the app'}
                  <ArrowIcon />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      {home.steps.length ? (
        <section className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow">LET’S GET STARTED</span>
              <h2>Freshness is a few taps away.</h2>
            </div>
            <ol className="steps-grid">
              {home.steps.map((item, index) => (
                <li className="reveal" key={index}>
                  <span className="step-number">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}
      <section className="section app-section">
        <div className="wrap split">
          <div className="app-copy reveal">
            <span className="eyebrow">A FRESHER WAY TO ORDER</span>
            <h2>
              Your dairy.
              <br />
              Your days.
              <br />
              <span className="orange-heading">Your app.</span>
            </h2>
            <p className="lede">
              Less to remember. More to look forward to. Keep your everyday
              dairy just a tap away.
            </p>
            <ul className="app-features">
              {[
                {
                  icon: 'cart',
                  title: 'Shop your essentials',
                  text: 'Find your favourites and choose a delivery slot.',
                },
                {
                  icon: 'calendar',
                  title: 'A routine with room for life',
                  text: 'Manage your daily plan, pause or skip as needed.',
                },
                {
                  icon: 'language',
                  title: 'Feels right at home',
                  text: 'Available in Gujarati and English.',
                },
              ].map((item) => (
                <li key={item.title}>
                  <span className="feature-icon">
                    <Icon name={item.icon as IconName} />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="hero-actions">
              <PlayStoreButton url={home.playStoreUrl} />
            </div>
          </div>
          <PhonePreview />
        </div>
      </section>
      <section className="closing-section">
        <div className="wrap closing reveal">
          <span className="eyebrow">FRESH STARTS HERE</span>
          <h2>{home.ctaTitle || 'Good mornings. Great dairy.'}</h2>
          <p>
            {home.ctaText || 'Make a little freshness part of your every day.'}
          </p>
          <div className="hero-actions">
            <Button href="/download">
              Discover the app <ArrowIcon />
            </Button>
            <Button href="/contact" variant="secondary">
              Let’s talk
            </Button>
          </div>
          <span className="closing-gujarati" lang="gu">
            દરરોજ, થોડું વધુ તાજું.
          </span>
        </div>
      </section>
    </>
  )
}
