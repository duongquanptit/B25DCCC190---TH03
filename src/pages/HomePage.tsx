import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchProducts } from '../features/products/productsSlice'
import ProductCard from '../components/ProductCard'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((s) => s.products)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [status, dispatch])

  const filtered = items.filter((p) => p.title.toLowerCase().includes(keyword.trim().toLowerCase()))

  return (
    <>
      <section className="hero">
        <h1>Small shop. Big happiness!</h1>
        <p>Chào mừng bạn đến với Bananna Shop 🍌</p>
        <input
          className="input"
          type="search"
          placeholder="Tìm sản phẩm theo tên..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </section>

      {status === 'loading' && <p className="notice">Đang tải sản phẩm...</p>}
      {status === 'failed' && (
        <div className="notice error">
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => dispatch(fetchProducts())}>Thử lại</button>
        </div>
      )}
      {status === 'succeeded' && filtered.length === 0 && (
        <p className="notice">Không tìm thấy sản phẩm nào.</p>
      )}

      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  )
}
