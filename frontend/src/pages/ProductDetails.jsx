import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/products'
import { useCart } from '../context/CartContext'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    getProductById(id).then(({ data, error }) => {
      if (error || !data) setNotFound(true)
      else setProduct(data)
      setLoading(false)
    })
  }, [id])

  if (loading) return <p className="mx-auto max-w-6xl px-4 py-10 text-gray-500">Loading product...</p>
  if (notFound) return <p className="mx-auto max-w-6xl px-4 py-10 text-gray-500">Product not found.</p>

  function handleAddToCart() {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image_url || 'https://placehold.co/600x600?text=No+Image'}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-xl font-semibold text-primary">${Number(product.price).toFixed(2)}</p>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <p className="mt-4 text-sm text-gray-500">
            {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <label htmlFor="qty" className="text-sm text-gray-600">
              Quantity
            </label>
            <input
              id="qty"
              type="number"
              min="1"
              max={product.stock_quantity || 1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-20 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
            />
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock_quantity <= 0}
            className="mt-6 rounded-md bg-primary px-6 py-3 font-medium text-white transition duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {added ? 'Added!' : 'Add to cart'}
          </button>

          <button
            onClick={() => navigate('/cart')}
            className="ml-3 mt-6 rounded-md border border-gray-300 px-6 py-3 font-medium text-gray-700 transition duration-200 hover:bg-gray-50"
          >
            View cart
          </button>
        </div>
      </div>
    </div>
  )
}
