import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import Orders from './pages/Orders'
import OrderDetails from './pages/OrderDetails'
import { isSupabaseConfigured } from './lib/supabase'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {!isSupabaseConfigured && (
        <div className="bg-amber-50 px-4 py-3 text-center text-sm text-amber-900">
          Add your Supabase URL and anon key to <code>.env</code> in the frontend folder to load products and enable sign-in.
        </div>
      )}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
