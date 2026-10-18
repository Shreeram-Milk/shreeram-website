import Link from 'next/link'
import { Catalog } from '@/components/Catalog'
import { RangePreview } from '@/components/DairyCollection'
import { Icon, ArrowIcon } from '@/components/Icons'
import { Button } from '@/components/ui'
import { getProducts } from '@/lib/content-api'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300
export const metadata = pageMetadata({
  title: 'Our dairy collection',
  description:
    'Explore fresh milk and dairy from ShreeRam Milks. Browse the collection and order through our app.',
  path: '/products',
})
export default async function ProductsPage() {
  const products = await getProducts(100)
  return (
    <section className="section catalog-page">
      <div className="wrap">
        <div className="page-breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Our dairy</span>
        </div>
        <header className="page-header">
          <span className="eyebrow">FROM OUR DAIRY, WITH CARE</span>
          <h1>
            Your everyday.
            <br />
            <span className="muted-heading">A little fresher.</span>
          </h1>
          <p className="lede">
            Discover fresh dairy for your morning glass, favourite recipes and
            everything in between. Find your favourites here, then order in the
            app.
          </p>
        </header>
        {products.length ? (
          <Catalog products={products} />
        ) : (
          <>
            <div className="empty-state">
              <Icon name="leaf" size={32} />
              <h2>The collection is taking a little break.</h2>
              <p>
                Our live product list is unavailable right now. Explore the
                dairy range below, or open the app for current availability.
              </p>
              <Button href="/download">
                Discover the app <ArrowIcon />
              </Button>
            </div>
            <div className="range-fallback">
              <RangePreview />
            </div>
          </>
        )}
        <div className="catalog-footer">
          <Icon name="cart" />
          <div>
            <h2>Found your fresh favourite?</h2>
            <p>
              Choose quantities, delivery slots and your daily plan in the
              ShreeRam Milks app.
            </p>
          </div>
          <Button href="/download">
            Order in the app <ArrowIcon />
          </Button>
        </div>
      </div>
    </section>
  )
}
