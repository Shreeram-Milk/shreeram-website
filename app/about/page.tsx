import Image from 'next/image'
import { Icon, type IconName } from '@/components/Icons'
import { Button } from '@/components/ui'
import { pageMetadata } from '@/lib/seo'
export const metadata = pageMetadata({
  title: 'About us',
  description:
    'ShreeRam Milks is a family dairy in Gujarat. We deliver fresh milk and dairy products to your door every day.',
  path: '/about',
})
const VALUES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'leaf',
    title: 'Fresh, every day.',
    text: 'Milk is collected, checked and delivered fresh. Everyday essentials deserve everyday care.',
  },
  {
    icon: 'shield',
    title: 'Care you can count on.',
    text: 'We care about what goes into every bottle and check it before it leaves our dairy.',
  },
  {
    icon: 'home',
    title: 'From our family to yours.',
    text: 'We are a family business. We know our customers and we answer when you call.',
  },
]
export default function AboutPage() {
  return (
    <>
      <section className="editorial-hero">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">A LITTLE ABOUT US</span>
            <h1>
              A family dairy.
              <br />A fresher
              <br />
              <span className="muted-heading">everyday.</span>
            </h1>
            <p className="lede">
              ShreeRam Milks began with a simple idea: every family in Gujarat
              should get pure, fresh milk without a trip to the shop.
            </p>
            <p>
              We work with trusted farms, collect milk fresh and bring it to
              your door. Whether you order once or subscribe for every day, you
              get the same care.
            </p>
            <p>
              Order from the app, choose when you want your delivery and pause
              it whenever you travel. We take care of the rest.
            </p>
            <div className="hero-actions">
              <Button href="/products">
                Meet our dairy <span aria-hidden="true">↗</span>
              </Button>
            </div>
          </div>
          <div className="story-collage reveal" data-motion="right">
            <div className="photo">
              <Image
                src="/images/jar.jpg"
                alt="A jar filled with fresh milk"
                fill
                sizes="(min-width: 700px) 45vw, 85vw"
                preload
              />
            </div>
            <div className="collage-small">
              <Image
                src="/images/farm.jpg"
                alt="Cows grazing on a green farm"
                fill
                sizes="(min-width: 700px) 20vw, 40vw"
              />
            </div>
            <span className="collage-label">
              ROOTED IN GUJARAT. MADE WITH CARE.
            </span>
          </div>
        </div>
      </section>
      <section className="section values-section">
        <div className="wrap">
          <div className="section-heading-row reveal">
            <div>
              <span className="eyebrow">SIMPLE THINGS. DONE WELL.</span>
              <h2>
                Our promises.
                <br />
                Kept daily.
              </h2>
            </div>
            <p>
              Good dairy starts with good values.
              <br />
              These are the ones we come back to.
            </p>
          </div>
          <ul className="features features-3">
            {VALUES.map((value, index) => (
              <li
                key={value.title}
                className="feature reveal"
                data-delay={index * 100}
              >
                <Icon name={value.icon} size={30} />
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="section-heading-row reveal">
            <div>
              <span className="eyebrow">GOODNESS ALONG THE WAY</span>
              <h2>
                A little closer
                <br />
                to where it starts.
              </h2>
            </div>
            <p>
              From the farm to your table,
              <br />
              freshness is a journey worth caring for.
            </p>
          </div>
          <div className="gallery-grid">
            {[
              { src: 'farm', alt: 'Cows on a farm' },
              { src: 'bottling', alt: 'Fresh milk bottles' },
              {
                src: 'dahi',
                alt: 'Dairy breakfast jars topped with strawberries',
              },
            ].map((photo, index) => (
              <div
                key={photo.src}
                className="photo reveal"
                data-delay={index * 100}
              >
                <Image
                  src={`/images/${photo.src}.jpg`}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 700px) 33vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="closing-section">
        <div className="wrap closing reveal">
          <span className="eyebrow">LET’S MAKE MORNINGS BETTER</span>
          <h2>
            A little freshness.
            <br />A lot to look forward to.
          </h2>
          <p>
            Explore the dairy. Find your favourites. Make them part of your day.
          </p>
          <div className="hero-actions">
            <Button href="/products">Explore our dairy ↗</Button>
            <Button href="/contact" variant="secondary">
              Talk to us
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
