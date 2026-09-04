import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createOrder } from '../services/orders'

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
}

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-gray-600">Please log in to check out.</p>
        <Link
          to="/login"
          className="mt-6 inline-block rounded-md bg-primary px-6 py-3 font-medium text-white transition duration-200 hover:bg-blue-700"
        >
          Log in
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-gray-600">Your cart is empty.</p>
        <Link to="/shop" className="mt-6 inline-block text-primary hover:underline">
          Go to shop
        </Link>
      </div>
    )
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const { data, error } = await createOrder({
      userId: user.id,
      items,
      total,
      shipping: form,
    })

    setSubmitting(false)

    if (error) {
      setError('Could not place your order. Please try again.')
      return
    }

    clearCart()
    navigate(`/orders/${data.id}`)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Checkout</h1>

      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
        <p className="mb-2 text-sm font-medium text-gray-700">Order summary</p>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm text-gray-600">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 font-semibold text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ['fullName', 'Full name'],
          ['email', 'Email'],
          ['phone', 'Phone'],
          ['address', 'Address'],
          ['city', 'City'],
          ['state', 'State'],
          ['postalCode', 'Postal code'],
          ['country', 'Country'],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
            <input
              name={name}
              value={form[name]}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
        ))}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-primary px-6 py-3 font-medium text-white transition duration-200 hover:bg-blue-700 disabled:bg-gray-300"
        >
          {submitting ? 'Placing order...' : 'Place order'}
        </button>
      </form>
    </div>
  )
}
