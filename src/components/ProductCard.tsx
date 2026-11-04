import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import type { Product } from '../types'

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch()

  return (
    <div className="card product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-img">
          <img src={product.image} alt={product.title} loading="lazy" />
        </div>
        <h3 className="product-title">{product.title}</h3>
      </Link>
      <p className="price">${product.price.toFixed(2)}</p>
      <button className="btn btn-primary btn-block" onClick={() => dispatch(addToCart(product))}>
        🛒 Thêm vào giỏ
      </button>
    </div>
  )
}
