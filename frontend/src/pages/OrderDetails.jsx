import { useEffect, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getOrderById } from '../services/orders'

export default function OrderDetails() {
  const { id } = useParams()
  const { user, loading: authLoading } = useAuth()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    getOrderById(id).then(({ data, error }) => {
      if (error || !data) setNotFound(true)
      else setOrder(data)
      setLoading(false)
    })
  }, [id])

  if (authLoading || loading) return <p className="mx-auto max-w-6xl px-4 py-10 text-gray-500">Loading...</p>
  if (!user) return <Navigate to="/login" replace />
  if (notFound) return <p className="mx-auto max-w-6xl px-4 py-10 text-gray-500">Order not found.</p>

  const s = order.shipping_address || {}

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link to="/orders" className="text-sm text-primary hover:underline">
        ← Back to orders
      </Link>

      <h1 className="mb-6 mt-2 text-2xl font-semibold text-gray-900">Order #{order.id.slice(0, 8)}</h1>

      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">Status</p>
        <p className="mb-4 font-medium capitalize text-gray-900">{order.status}</p>

        <p className="text-sm text-gray-500">Shipping to</p>
        <p className="font-medium text-gray-900">
          {s.fullName}, {s.address}, {s.city}, {s.state} {s.postalCode}, {s.country}
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between border-b border-gray-100 p-4 last:border-0">
            <span>
              {item.product_name} × {item.quantity}
            </span>
            <span className="font-medium">${(item.price_at_purchase * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between p-4 font-semibold text-gray-900">
          <span>Total</span>
          <span>${Number(order.total_amount).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
