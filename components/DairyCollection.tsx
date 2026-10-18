import Image from 'next/image'
import Link from 'next/link'
import type { ProductCard } from '@/lib/content-api'
import { ArrowIcon } from './Icons'

export const DAIRY_RANGE = [
  {
    name: 'Milk',
    tag: 'THE MORNING ESSENTIAL',
    image: 'glass',
    text: 'A fresh beginning to every day.',
  },
  {
    name: 'Breakfast favourites',
    tag: 'A LITTLE MORNING INSPIRATION',
    image: 'dahi',
    text: 'Goodness for your breakfast table.',
  },
  {
    name: 'Daily essentials',
    tag: 'FRESHNESS FOR YOUR ROUTINE',
    image: 'bottle',
    text: 'Find your favourites in the app.',
  },
]

export function RangePreview() {
  return (
    <div className="range-grid">
      {DAIRY_RANGE.map((item, index) => (
        <Link
          href="/products"
          key={item.name}
          className={`range-card range-${index} reveal`}
          data-delay={index * 100}
        >
          <div className="range-photo">
            <Image
              src={`/images/${item.image}.jpg`}
              alt={item.name}
              fill
              sizes="(min-width: 760px) 33vw, 90vw"
            />
            <span className="round-arrow" aria-hidden="true">
              <ArrowIcon />
            </span>
          </div>
          <div className="range-body">
            <span className="micro-label">{item.tag}</span>
            <h3>{item.name}</h3>
            <p>{item.text}</p>
            <span className="text-link">
              Explore our dairy <ArrowIcon />
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export function ProductTile({ product }: { product: ProductCard }) {
  return (
    <article className="product-card reveal">
      <Link
        href="/download"
        className="product-photo"
        aria-label={`Order ${product.name} in the app`}
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 960px) 30vw, (min-width: 600px) 45vw, 90vw"
            unoptimized
          />
        ) : (
          <div className="product-placeholder">
            <Image src="/logo.png" alt="" width={96} height={96} />
            <span>ShreeRam Milks</span>
          </div>
        )}
        <span className="product-tag">DAIRY ESSENTIAL</span>
        <span className="round-arrow" aria-hidden="true">
          <ArrowIcon />
        </span>
      </Link>
      <div className="product-body">
        <h3>{product.name}</h3>
        {product.priceFromPaise > 0 ? (
          <p className="price">
            From ₹
            {new Intl.NumberFormat('en-IN', {
              maximumFractionDigits: 2,
            }).format(product.priceFromPaise / 100)}
          </p>
        ) : (
          <p className="price">See options in the app</p>
        )}
        <Link className="text-link" href="/download">
          Order in the app <ArrowIcon />
        </Link>
      </div>
    </article>
  )
}
