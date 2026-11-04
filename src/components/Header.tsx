import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCartCount } from '../features/cart/cartSlice'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

export default function Header() {
  const count = useAppSelector(selectCartCount)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">🍌 Bananna Shop</Link>
        <nav className="nav">
          <button className="btn btn-ghost" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
          </button>
          <Link to="/cart" className="btn btn-ghost">
            🛒 Giỏ hàng <span className="badge">{count}</span>
          </Link>
          {user ? (
            <>
              <span className="username">Xin chào, {user.username}</span>
              <button className="btn btn-ghost" onClick={logout}>Đăng xuất</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">Đăng nhập</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
