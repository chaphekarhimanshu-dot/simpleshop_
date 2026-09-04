import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProducts } from '../services/products'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts().then(({ data, error }) => {
      if (!error) setProducts((data || []).slice(0, 4))
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Simple things, well made.</h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            A small shop with a handful of good products. No clutter, no noise.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block rounded-md bg-primary px-6 py-3 font-medium text-white transition duration-200 hover:bg-blue-700"
          >
            Shop now
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Featured products</h2>
        {loading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
