import { supabase } from '../lib/supabase'

// Get all products, optionally filtered by a search term
export async function getProducts(searchTerm = '') {
  if (!supabase) {
    return { data: null, error: new Error('Supabase is not configured') }
  }

  let query = supabase.from('products').select('*').order('created_at', { ascending: false })

  if (searchTerm) {
    query = query.ilike('name', `%${searchTerm}%`)
  }

  const { data, error } = await query
  return { data, error }
}

export async function getProductById(id) {
  if (!supabase) {
    return { data: null, error: new Error('Supabase is not configured') }
  }

  const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
  return { data, error }
}
