import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (form.password !== form.confirm) {
      alert('Passwords do not match.')
      return
    }

    alert('Account created successfully!')
    navigate('/login')
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo">
          <div className="brand-icon">CC</div>
          <h1>CardPay</h1>
          <p>Create your secure account</p>
        </div>

        <div className="auth-card">
          <h2>Create account</h2>
          <p>Register to start managing your credit cards.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full name</label>
              <input
                required
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input
                required
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                required
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Confirm password</label>
              <input
                required
                type="password"
                placeholder="Confirm your password"
                value={form.confirm}
                onChange={(e) => setForm({...form, confirm: e.target.value})}
              />
            </div>

            <button className="primary-btn" type="submit">
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
