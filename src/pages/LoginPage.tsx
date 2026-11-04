import { useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface LocationState {
  from?: string
}

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as LocationState | null)?.from ?? '/'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (login(username, password)) {
      navigate(from, { replace: true })
    } else {
      setError('Sai tên đăng nhập hoặc mật khẩu (mật khẩu đúng: 123456)')
    }
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h1>Đăng nhập</h1>
      <input
        className="input"
        placeholder="Tên đăng nhập"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error-text">{error}</p>}
      <button className="btn btn-primary btn-block" type="submit">Đăng nhập</button>
    </form>
  )
}
