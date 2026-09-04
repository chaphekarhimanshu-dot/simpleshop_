import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Account() {
  const { user, loading } = useAuth()

  if (loading) return <p className="mx-auto max-w-6xl px-4 py-10 text-gray-500">Loading...</p>
  if (!user) return <Navigate to="/login" replace />

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Account</h1>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-500">Email</p>
        <p className="mb-4 font-medium text-gray-900">{user.email}</p>

        <p className="text-sm text-gray-500">Name</p>
        <p className="font-medium text-gray-900">{user.user_metadata?.full_name || '—'}</p>
      </div>

      <Link
        to="/orders"
        className="mt-6 block rounded-md border border-gray-300 px-6 py-3 text-center font-medium text-gray-700 transition duration-200 hover:bg-gray-50"
      >
        View my orders
      </Link>
    </div>
  )
}
