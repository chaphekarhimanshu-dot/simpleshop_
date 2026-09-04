import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-gray-500">Your cart is empty.</p>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-md bg-primary px-6 py-3 font-medium text-white transition duration-200 hover:bg-blue-700"
        >
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Your cart</h1>

      <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4">
            <img
              src={item.image_url || 'https://placehold.co/80x80?text=No+Image'}
              alt={item.name}
              className="h-16 w-16 rounded object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">${Number(item.price).toFixed(2)} each</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="rounded border border-gray-300 p-1 transition duration-200 hover:bg-gray-50"
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="rounded border border-gray-300 p-1 transition duration-200 hover:bg-gray-50"
              >
                <Plus size={14} />
              </button>
            </div>

            <p className="w-20 text-right font-medium text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-gray-400 transition duration-200 hover:text-red-500"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Link to="/shop" className="text-sm font-medium text-primary transition duration-200 hover:underline">
          Continue shopping
        </Link>

        <div className="text-right">
          <p className="text-sm text-gray-500">Subtotal</p>
          <p className="text-xl font-semibold text-gray-900">${total.toFixed(2)}</p>
          <button
            onClick={() => navigate('/checkout')}
            className="mt-3 rounded-md bg-primary px-6 py-3 font-medium text-white transition duration-200 hover:bg-blue-700"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  )
}
