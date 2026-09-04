import { supabase } from '../lib/supabase'

// Create an order and its order items together
export async function createOrder({ userId, items, total, shipping }) {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      total_amount: total,
      shipping_address: shipping,
      status: 'pending',
    })
    .select()
    .single()

  if (orderError) return { error: orderError }

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    product_name: item.name,
    price_at_purchase: item.price,
    quantity: item.quantity,
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
  if (itemsError) return { error: itemsError }

  return { data: order }
}

export async function getUserOrders(userId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function getOrderById(orderId) {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  if (orderError) return { error: orderError }

  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId)

  if (itemsError) return { error: itemsError }

  return { data: { ...order, items } }
}
