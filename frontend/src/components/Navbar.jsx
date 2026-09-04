import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold text-gray-900">
          Simple Shop
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/shop" className="transition duration-200 hover:text-primary">
            Shop
          </Link>

          <Link to="/cart" className="relative flex items-center transition duration-200 hover:text-primary">
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-primary px-1.5 text-xs text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link to="/account" className="flex items-center gap-1 transition duration-200 hover:text-primary">
                <User size={18} /> Account
              </Link>
              <button onClick={handleSignOut} className="transition duration-200 hover:text-primary">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="transition duration-200 hover:text-primary">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
