import Image from 'next/image'
import { BusinessJsonLd } from '@/components/BusinessJsonLd'
import { PlayStoreButton } from '@/components/PlayStoreButton'
import { Button, Card, Section } from '@/components/ui'
import { getContact, getHome, getProducts, type ProductCard } from '@/lib/content-api'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300

export async function generateMetadata() {
  const home = await getHome()
  return pageMetadata({ title: home.seoTitle, description: home.seoDescription, path: '/', absoluteTitle: true })
}

const rupees = (paise: number) => `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(paise / 100)}`

function ProductTile({ product }: { product: ProductCard }) {
  return (
    <Card className="product-card">
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

/** The front page. Words come from the admin's Home page editor; the layout is fixed. */
export default async function HomePage() {
  const home = await getHome()
  const [products, contact] = await Promise.all([home.showProducts ? getProducts() : Promise.resolve([]), getContact()])
  return (
    <>
      <BusinessJsonLd contact={contact} />
      {home.announcement ? <p className="announcement">{home.announcement}</p> : null}

      <Section>
        <div className="hero-grid">
          <div>
            <span className="hero-eyebrow">Fresh every morning</span>
            <h1>{home.heroTitle}</h1>
            {home.heroSubtitle ? <p className="lede">{home.heroSubtitle}</p> : null}
            <div className="hero-actions">
              <PlayStoreButton url={home.playStoreUrl} />
              <Button href="/about" variant="secondary">Our story</Button>
            </div>
          </div>
          {home.heroImageUrl ? (
            <div className="hero-media"><Image src={home.heroImageUrl} alt="Fresh ShreeRam Milks dairy products" fill sizes="(min-width: 860px) 45vw, 100vw" priority unoptimized /></div>
          ) : null}
        </div>
      </Section>

      {home.highlights.length > 0 ? (
        <Section tone="fill" labelledBy="why-title">
          <h2 id="why-title" className="section-title">Why families choose us</h2>
          <div className="grid grid-4">
            {home.highlights.map((item, index) => (
              <Card key={index}><div className="icon-dot" aria-hidden="true">✓</div><h3>{item.title}</h3><p className="card-text">{item.text}</p></Card>
            ))}
          </div>
        </Section>
      ) : null}

      {home.steps.length > 0 ? (
        <Section labelledBy="how-title">
          <h2 id="how-title" className="section-title">How it works</h2>
          <ol className="grid grid-4" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {home.steps.map((item, index) => (
              <li key={index}><Card><div className="step-number" aria-hidden="true">{index + 1}</div><h3>{item.title}</h3><p className="card-text">{item.text}</p></Card></li>
            ))}
          </ol>
        </Section>
      ) : null}

      {home.showProducts && products.length > 0 ? (
        <Section tone="fill" labelledBy="products-title">
          <h2 id="products-title" className="section-title">{home.productsTitle}</h2>
          <div className="grid grid-4">{products.map(product => <ProductTile key={product.id} product={product} />)}</div>
        </Section>
      ) : null}

      <Section>
        <div className="cta-band">
          <h2>{home.ctaTitle || 'Get the ShreeRam Milks app'}</h2>
          {home.ctaText ? <p className="lede">{home.ctaText}</p> : null}
          <div className="hero-actions"><PlayStoreButton url={home.playStoreUrl} /></div>
        </div>
      </Section>
    </>
  )
}
