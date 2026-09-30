import { useState } from 'react'
import './App.css'

function App() {
  const [page, setPage] = useState('login')
  const [loggedIn, setLoggedIn] = useState(false)
  const [cards, setCards] = useState([
    {
      id: 1,
      number: '4532  ••••  ••••  7890',
      holder: 'GANESH',
      expiry: '12/29',
      type: 'VISA',
    },
  ])

  const [transactions] = useState([
    {
      id: 1,
      merchant: 'Amazon',
      amount: '₹2,499',
      date: '30 Sep 2026',
      status: 'Completed',
    },
    {
      id: 2,
      merchant: 'Swiggy',
      amount: '₹680',
      date: '28 Sep 2026',
      status: 'Completed',
    },
    {
      id: 3,
      merchant: 'Myntra',
      amount: '₹1,299',
      date: '25 Sep 2026',
      status: 'Completed',
    },
  ])

  const handleLogin = (e) => {
    e.preventDefault()
    setLoggedIn(true)
    setPage('dashboard')
  }

  const handleLogout = () => {
    setLoggedIn(false)
    setPage('login')
  }

  const addCard = (card) => {
    setCards([...cards, { ...card, id: Date.now() }])
    setPage('dashboard')
  }

  if (!loggedIn && page === 'login') {
    return <Login onLogin={handleLogin} onRegister={() => setPage('register')} />
  }

  if (!loggedIn && page === 'register') {
    return <Register onLogin={() => setPage('login')} />
  }

  return (
    <div className="app">
      <Sidebar
        page={page}
        setPage={setPage}
        onLogout={handleLogout}
      />

      <main className="main-content">
        {page === 'dashboard' && (
          <Dashboard
            cards={cards}
            transactions={transactions}
            setPage={setPage}
          />
        )}

        {page === 'add-card' && (
          <AddCard
            onAddCard={addCard}
            onCancel={() => setPage('dashboard')}
          />
        )}

        {page === 'payment' && (
          <MakePayment
            cards={cards}
            onSuccess={() => setPage('transactions')}
          />
        )}

        {page === 'transactions' && (
          <Transactions transactions={transactions} />
        )}

        {page === 'admin' && <AdminDashboard />}
      </main>
    </div>
  )
}

/* =========================
   LOGIN
========================= */

function Login({ onLogin, onRegister }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand">
          <div className="brand-icon">₹</div>
          <h1>PaySecure</h1>
        </div>

        <h2>Welcome back</h2>
        <p className="auth-subtitle">
          Sign in to manage your cards and payments.
        </p>

        <form onSubmit={onLogin}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="ganesh@example.com"
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
          />

          <div className="forgot">
            <span>Forgot password?</span>
          </div>

          <button className="primary-btn" type="submit">
            Sign in
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <button onClick={onRegister} className="link-btn">
            Create account
          </button>
        </p>
      </div>
    </div>
  )
}

/* =========================
   REGISTER
========================= */

function Register({ onLogin }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand">
          <div className="brand-icon">₹</div>
          <h1>PaySecure</h1>
        </div>

        <h2>Create account</h2>
        <p className="auth-subtitle">
          Create your secure payment account.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onLogin()
          }}
        >
          <label>Full name</label>
          <input
            type="text"
            placeholder="Ganesh"
            defaultValue="Ganesh"
            required
          />

          <label>Email address</label>
          <input
            type="email"
            placeholder="ganesh@example.com"
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            required
          />

          <button className="primary-btn" type="submit">
            Create account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <button onClick={onLogin} className="link-btn">
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}

/* =========================
   SIDEBAR
========================= */

function Sidebar({ page, setPage, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon small">₹</div>
        <span>PaySecure</span>
      </div>

      <nav>
        <button
          className={page === 'dashboard' ? 'nav-item active' : 'nav-item'}
          onClick={() => setPage('dashboard')}
        >
          <span>⌂</span>
          Dashboard
        </button>

        <button
          className={page === 'add-card' ? 'nav-item active' : 'nav-item'}
          onClick={() => setPage('add-card')}
        >
          <span>▣</span>
          My Cards
        </button>

        <button
          className={page === 'payment' ? 'nav-item active' : 'nav-item'}
          onClick={() => setPage('payment')}
        >
          <span>↗</span>
          Make Payment
        </button>

        <button
          className={page === 'transactions' ? 'nav-item active' : 'nav-item'}
          onClick={() => setPage('transactions')}
        >
          <span>☷</span>
          Transactions
        </button>

        <button
          className={page === 'admin' ? 'nav-item active' : 'nav-item'}
          onClick={() => setPage('admin')}
        >
          <span>⚙</span>
          Admin
        </button>
      </nav>

      <div className="sidebar-bottom">
        <div className="user-mini">
          <div className="avatar">G</div>
          <div>
            <strong>Ganesh</strong>
            <span>Card Holder</span>
          </div>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          ⇥ Logout
        </button>
      </div>
    </aside>
  )
}

/* =========================
   DASHBOARD
========================= */

function Dashboard({ cards, transactions, setPage }) {
  return (
    <>
      <header className="topbar">
        <div>
          <h1>Good evening, Ganesh 👋</h1>
          <p>Here's what's happening with your account today.</p>
        </div>

        <div className="top-avatar">G</div>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Total Balance</span>
          <strong>₹48,750</strong>
          <small className="positive">+8.4% this month</small>
        </div>

        <div className="stat-card">
          <span>Available Credit</span>
          <strong>₹1,51,250</strong>
          <small>Credit limit ₹2,00,000</small>
        </div>

        <div className="stat-card">
          <span>Total Cards</span>
          <strong>{cards.length}</strong>
          <small>Active cards</small>
        </div>

        <div className="stat-card">
          <span>This Month</span>
          <strong>₹12,480</strong>
          <small className="negative">+3.2% spending</small>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Your Cards</h2>
              <p>Manage your saved cards</p>
            </div>

            <button
              className="outline-btn"
              onClick={() => setPage('add-card')}
            >
              + Add Card
            </button>
          </div>

          <div className="cards-container">
            {cards.map((card) => (
              <CreditCard key={card.id} card={card} />
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Recent Transactions</h2>
              <p>Your latest payments</p>
            </div>

            <button
              className="link-btn"
              onClick={() => setPage('transactions')}
            >
              View all
            </button>
          </div>

          <div className="transaction-list">
            {transactions.slice(0, 3).map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* =========================
   CREDIT CARD
========================= */

function CreditCard({ card }) {
  return (
    <div className="credit-card">
      <div className="card-top">
        <span>PaySecure</span>
        <span className="visa">{card.type}</span>
      </div>

      <div className="chip">▦</div>

      <div className="card-number">
        {card.number}
      </div>

      <div className="card-bottom">
        <div>
          <small>CARD HOLDER</small>
          <strong>{card.holder}</strong>
        </div>

        <div>
          <small>EXPIRES</small>
          <strong>{card.expiry}</strong>
        </div>
      </div>
    </div>
  )
}

/* =========================
   ADD CARD
========================= */

function AddCard({ onAddCard, onCancel }) {
  const [number, setNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')

  const submit = (e) => {
    e.preventDefault()

    onAddCard({
      number: number || '4532  ••••  ••••  7890',
      holder: 'GANESH',
      expiry: expiry || '12/29',
      type: 'VISA',
      cvv,
    })
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Add a new card</h1>
          <p>Add your card securely to PaySecure.</p>
        </div>

        <button className="outline-btn" onClick={onCancel}>
          ← Back
        </button>
      </div>

      <div className="form-layout">
        <div className="panel form-panel">
          <h2>Card details</h2>

          <form onSubmit={submit}>
            <label>Card number</label>
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="4532 1234 5678 7890"
              maxLength="19"
              required
            />

            <div className="two-columns">
              <div>
                <label>Expiry date</label>
                <input
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  required
                />
              </div>

              <div>
                <label>CVV</label>
                <input
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  maxLength="3"
                  required
                />
              </div>
            </div>

            <label>Card holder name</label>
            <input
              value="GANESH"
              readOnly
            />

            <button className="primary-btn" type="submit">
              Add Card
            </button>
          </form>
        </div>

        <div>
          <h3 className="preview-title">Card preview</h3>

          <CreditCard
            card={{
              number: number || '4532  ••••  ••••  7890',
              holder: 'GANESH',
              expiry: expiry || '12/29',
              type: 'VISA',
            }}
          />
        </div>
      </div>
    </div>
  )
}

/* =========================
   PAYMENT
========================= */

function MakePayment({ cards, onSuccess }) {
  const [amount, setAmount] = useState('')
  const [merchant, setMerchant] = useState('')
  const [message, setMessage] = useState('')

  const submit = (e) => {
    e.preventDefault()

    setMessage(
      `Payment of ₹${amount} to ${merchant} was processed successfully.`
    )

    setTimeout(() => {
      onSuccess()
    }, 1800)
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Make a Payment</h1>
          <p>Send a secure payment using your saved card.</p>
        </div>
      </div>

      <div className="payment-layout">
        <div className="panel form-panel">
          <h2>Payment details</h2>

          <form onSubmit={submit}>
            <label>Merchant / Recipient</label>
            <input
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              placeholder="Enter merchant name"
              required
            />

            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="₹ 0.00"
              required
            />

            <label>Pay using</label>

            <select>
              {cards.map((card) => (
                <option key={card.id}>
                  {card.type} ending 7890 — GANESH
                </option>
              ))}
            </select>

            <button className="primary-btn" type="submit">
              Pay Securely
            </button>

            {message && (
              <div className="success-message">
                ✓ {message}
              </div>
            )}
          </form>
        </div>

        <div className="panel security-panel">
          <div className="security-icon">✓</div>
          <h2>Secure Payment</h2>
          <p>
            Your payment information is protected using secure
            authentication.
          </p>

          <div className="security-item">
            <span>✓</span>
            Encrypted payment
          </div>

          <div className="security-item">
            <span>✓</span>
            Secure card storage
          </div>

          <div className="security-item">
            <span>✓</span>
            Transaction monitoring
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================
   TRANSACTIONS
========================= */

function Transactions({ transactions }) {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Transactions</h1>
          <p>View all your recent payment activity.</p>
        </div>
      </div>

      <div className="panel">
        <div className="table">
          <div className="table-header">
            <span>Merchant</span>
            <span>Amount</span>
            <span>Date</span>
            <span>Status</span>
          </div>

          {transactions.map((transaction) => (
            <div className="table-row" key={transaction.id}>
              <strong>{transaction.merchant}</strong>
              <span>{transaction.amount}</span>
              <span>{transaction.date}</span>
              <span className="status">{transaction.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* =========================
   ADMIN
========================= */

function AdminDashboard() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Monitor users, cards and payment activity.</p>
        </div>
      </div>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Total Users</span>
          <strong>1,248</strong>
          <small className="positive">+12% this month</small>
        </div>

        <div className="stat-card">
          <span>Active Cards</span>
          <strong>2,431</strong>
          <small>Currently active</small>
        </div>

        <div className="stat-card">
          <span>Transactions</span>
          <strong>8,924</strong>
          <small>This month</small>
        </div>

        <div className="stat-card">
          <span>System Status</span>
          <strong className="system-online">Online</strong>
          <small>All services operational</small>
        </div>
      </section>

      <div className="panel admin-message">
        <div className="security-icon">✓</div>
        <div>
          <h2>System running normally</h2>
          <p>
            All payment services, authentication services and card
            management services are operational.
          </p>
        </div>
      </div>
    </div>
  )
}

/* =========================
   TRANSACTION ROW
========================= */

function TransactionRow({ transaction }) {
  return (
    <div className="transaction-row">
      <div className="merchant-icon">
        {transaction.merchant.charAt(0)}
      </div>

      <div className="transaction-info">
        <strong>{transaction.merchant}</strong>
        <span>{transaction.date}</span>
      </div>

      <div className="transaction-amount">
        <strong>{transaction.amount}</strong>
        <span>{transaction.status}</span>
      </div>
    </div>
  )
}

export default App
