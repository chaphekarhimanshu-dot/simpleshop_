import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'simple-shop-cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })

  // Keep the cart saved in the browser
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addToCart(product, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image_url: product.image_url, quantity }]
    })
  }

  function removeFromCart(productId) {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) return
    setItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  function clearCart() {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const value = { items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}
