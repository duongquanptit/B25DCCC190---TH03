import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from '../features/cart/cartSlice'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)

  if (items.length === 0) {
    return (
      <div className="notice">
        <p>Giỏ hàng đang trống.</p>
        <Link to="/" className="btn btn-primary">Mua sắm ngay</Link>
      </div>
    )
  }

  return (
    <>
      <h1>Giỏ hàng</h1>
      <div className="cart-list">
        {items.map((item) => (
          <div key={item.id} className="card cart-item">
            <img src={item.image} alt={item.title} />
            <div className="cart-info">
              <h3>{item.title}</h3>
              <p className="price">${item.price.toFixed(2)}</p>
            </div>
            <div className="qty">
              <button
                className="btn btn-ghost"
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                className="btn btn-ghost"
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
              >
                +
              </button>
            </div>
            <button className="btn btn-danger" onClick={() => dispatch(removeFromCart(item.id))}>
              Xoá
            </button>
          </div>
        ))}
      </div>
      <div className="card summary">
        <p>Tổng cộng: <strong className="price big">${total.toFixed(2)}</strong></p>
        <div className="row">
          <button className="btn btn-ghost" onClick={() => dispatch(clearCart())}>Xoá giỏ hàng</button>
          <Link to="/checkout" className="btn btn-primary">Thanh toán</Link>
        </div>
      </div>
    </>
  )
}
