import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearCart, selectCartItems, selectCartTotal } from '../features/cart/cartSlice'

export default function CheckoutPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const [success, setSuccess] = useState(false)

  const handleOrder = () => {
    dispatch(clearCart())
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="notice success">
        <h2>🎉 Đặt hàng thành công!</h2>
        <p>Cảm ơn bạn đã mua sắm tại Bananna Shop.</p>
        <Link to="/" className="btn btn-primary">Tiếp tục mua sắm</Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="notice">
        <p>Không có sản phẩm nào để thanh toán.</p>
        <Link to="/" className="btn btn-primary">Về trang chủ</Link>
      </div>
    )
  }

  return (
    <>
      <h1>Thanh toán</h1>
      <div className="card summary">
        <ul className="order-list">
          {items.map((i) => (
            <li key={i.id}>
              <span>{i.title} × {i.quantity}</span>
              <span>${(i.price * i.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p>Tổng cộng: <strong className="price big">${total.toFixed(2)}</strong></p>
        <button className="btn btn-primary" onClick={handleOrder}>Đặt hàng</button>
      </div>
    </>
  )
}
