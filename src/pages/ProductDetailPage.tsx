import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchProducts } from '../features/products/productsSlice'
import { addToCart } from '../features/cart/cartSlice'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { items, status } = useAppSelector((s) => s.products)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [status, dispatch])

  if (status === 'idle' || status === 'loading') return <p className="notice">Đang tải...</p>
  if (status === 'failed') return <p className="notice error">Không tải được sản phẩm.</p>

  const product = items.find((p) => p.id === Number(id))
  if (!product) {
    return (
      <div className="notice">
        <p>Không tìm thấy sản phẩm.</p>
        <Link to="/" className="btn btn-primary">Về trang chủ</Link>
      </div>
    )
  }

  return (
    <div className="card detail">
      <div className="detail-img">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="detail-info">
        <span className="tag">{product.category}</span>
        <h1>{product.title}</h1>
        <p className="price big">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <div className="row">
          <button className="btn btn-primary" onClick={() => dispatch(addToCart(product))}>
            🛒 Thêm vào giỏ
          </button>
          <Link to="/" className="btn btn-ghost">Quay lại</Link>
        </div>
      </div>
    </div>
  )
}
