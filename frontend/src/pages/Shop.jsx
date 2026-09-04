import { useEffect, useState } from 'react'
import { getProducts } from '../services/products'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getProducts(search).then(({ data, error }) => {
      if (error) setError('Could not load products. Please try again.')
      else {
        setError(null)
        setProducts(data || [])
      }
      setLoading(false)
    })
  }, [search])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Shop</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8 w-full max-w-sm rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none"
      />

      {loading && <p className="text-gray-500">Loading products...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="text-gray-500">No products found.</p>
      )}

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
