import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <>
      <div className="page-heading">
        <h2>Dashboard</h2>
        <p>Here's an overview of your credit card activity.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💳</div>
          <span className="stat-label">Total Cards</span>
          <div className="stat-value">2</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">₹</div>
          <span className="stat-label">Available Credit</span>
          <div className="stat-value">₹74,500</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">↗</div>
          <span className="stat-label">Total Payments</span>
          <div className="stat-value">₹25,400</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <span className="stat-label">Payment Status</span>
          <div className="stat-value">Good</div>
        </div>
      </div>

      <div className="content-grid">
        <div className="panel">
          <h3>Primary Credit Card</h3>

          <div className="card-preview">
            <div className="card-chip"></div>

            <div className="card-number">
              •••• •••• •••• 4821
            </div>

            <div className="card-bottom">
              <div>
                <small>CARD HOLDER</small>
                <strong>AKSHATHA SHIVANI</strong>
              </div>

              <div>
                <small>EXPIRES</small>
                <strong>09/29</strong>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <Link to="/payment" className="primary-btn">
              Make Payment
            </Link>
          </div>
        </div>

        <div className="panel">
          <h3>Recent Transactions</h3>

          <div className="transaction">
            <div className="transaction-left">
              <div className="transaction-icon">🛒</div>
              <div>
                <div className="transaction-name">Amazon</div>
                <div className="transaction-date">Today, 10:32 AM</div>
              </div>
            </div>
            <span className="amount">₹2,450</span>
          </div>

          <div className="transaction">
            <div className="transaction-left">
              <div className="transaction-icon">🍔</div>
              <div>
                <div className="transaction-name">Swiggy</div>
                <div className="transaction-date">Yesterday</div>
              </div>
            </div>
            <span className="amount">₹540</span>
          </div>

          <div className="transaction">
            <div className="transaction-left">
              <div className="transaction-icon">⛽</div>
              <div>
                <div className="transaction-name">Fuel Station</div>
                <div className="transaction-date">28 Sep 2026</div>
              </div>
            </div>
            <span className="amount">₹1,800</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
