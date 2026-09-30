function AdminDashboard() {
  return (
    <>
      <div className="page-heading">
        <h2>Admin Dashboard</h2>
        <p>Monitor users, cards and payment activity.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <span className="stat-label">Total Users</span>
          <div className="stat-value">1,248</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💳</div>
          <span className="stat-label">Active Cards</span>
          <div className="stat-value">2,841</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">₹</div>
          <span className="stat-label">Payments Today</span>
          <div className="stat-value">₹8.4L</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <span className="stat-label">System Status</span>
          <div className="stat-value">Online</div>
        </div>
      </div>

      <div className="panel">
        <h3>System Overview</h3>

        <div className="transaction">
          <div className="transaction-left">
            <div className="transaction-icon">👤</div>
            <div>
              <div className="transaction-name">New user registrations</div>
              <div className="transaction-date">Today</div>
            </div>
          </div>
          <strong>+32</strong>
        </div>

        <div className="transaction">
          <div className="transaction-left">
            <div className="transaction-icon">💳</div>
            <div>
              <div className="transaction-name">Cards added</div>
              <div className="transaction-date">Today</div>
            </div>
          </div>
          <strong>+87</strong>
        </div>

        <div className="transaction">
          <div className="transaction-left">
            <div className="transaction-icon">₹</div>
            <div>
              <div className="transaction-name">Payments processed</div>
              <div className="transaction-date">Today</div>
            </div>
          </div>
          <strong>1,426</strong>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
