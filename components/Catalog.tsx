'use client'

import { useMemo, useState } from 'react'
import type { ProductCard } from '@/lib/content-api'
import { ProductTile } from './DairyCollection'

export function Catalog({ products }: { products: ProductCard[] }) {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')
  const filtered = useMemo(() => {
    const items = products.filter((product) =>
      product.name
        .toLocaleLowerCase()
        .includes(search.trim().toLocaleLowerCase()),
    )
    if (sort === 'low')
      items.sort(
        (a, b) =>
          (a.priceFromPaise || Infinity) - (b.priceFromPaise || Infinity),
      )
    if (sort === 'high')
      items.sort((a, b) => b.priceFromPaise - a.priceFromPaise)
    if (sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name))
    return items
  }, [products, search, sort])
  return (
    <>
      <div className="collection-toolbar">
        <label className="search-field">
          <span className="sr-only">Search dairy products</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Find your everyday favourite…"
          />
        </label>
        <label className="sort-field">
          Sort by
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </label>
      </div>
      <p className="catalog-count" role="status">
        {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
        {search ? ` matching “${search}”` : ' to explore'} · Order through the
        app
      </p>
      {filtered.length ? (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductTile product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>A fresh search?</h2>
          <p>
            We couldn’t find a product with that name. Try another search or
            explore the full collection.
          </p>
          <button onClick={() => setSearch('')}>Clear search</button>
        </div>
      )}
      <noscript>
        <p className="notice">
          Product search and sorting need JavaScript. You can still browse all
          the products on this page and order in the app.
        </p>
      </noscript>
    </>
  )
}
