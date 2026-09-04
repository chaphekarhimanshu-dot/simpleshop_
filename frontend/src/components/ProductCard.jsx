import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white transition duration-200 hover:shadow-md"
    >
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={product.image_url || 'https://placehold.co/400x400?text=No+Image'}
          alt={product.name}
          className="h-full w-full object-cover transition duration-200 group-hover:opacity-90"
        />
      </div>
      <div className="p-4">
        <h3 className="truncate font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {product.stock_quantity > 0 ? 'In stock' : 'Out of stock'}
        </p>
        <p className="mt-2 font-semibold text-primary">${Number(product.price).toFixed(2)}</p>
      </div>
    </Link>
  )
}
