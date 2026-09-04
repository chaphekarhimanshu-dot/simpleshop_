import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getUserOrders } from '../services/orders'

export default function Orders() {
  const { user, loading: authLoading } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    getUserOrders(user.id).then(({ data }) => {
      setOrders(data || [])
      setLoading(false)
    })
  }, [user])

  if (authLoading) return <p className="mx-auto max-w-6xl px-4 py-10 text-gray-500">Loading...</p>
  if (!user) return <Navigate to="/login" replace />

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Your orders</h1>

      {loading && <p className="text-gray-500">Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <p className="text-gray-500">
          You haven't placed any orders yet.{' '}
          <Link to="/shop" className="text-primary hover:underline">
            Start shopping
          </Link>
        </p>
      )}

      <div className="space-y-3">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="block rounded-lg border border-gray-200 bg-white p-4 transition duration-200 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Order #{order.id.slice(0, 8)}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()} · {order.status}
                </p>
              </div>
              <p className="font-semibold text-gray-900">${Number(order.total_amount).toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
