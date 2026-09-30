import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }

    localStorage.setItem('loggedIn', 'true')
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo">
          <div className="brand-icon">CC</div>
          <h1>CardPay</h1>
          <p>Secure Credit Card Payment System</p>
        </div>

        <div className="auth-card">
          <h2>Welcome back</h2>
          <p>Sign in to manage your credit cards and payments.</p>

          {error && <div className="alert">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="primary-btn" type="submit">
              Sign In
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
