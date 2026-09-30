import { useState } from 'react'

function MakePayment() {
  const [amount, setAmount] = useState('')
  const [success, setSuccess] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!amount || Number(amount) <= 0) return
    setSuccess(true)
    setAmount('')
  }

  return (
    <>
      <div className="page-heading">
        <h2>Make Payment</h2>
        <p>Pay your credit card balance securely.</p>
      </div>

      <div className="form-card">
        {success && (
          <div className="success-box">
            ✓ Payment submitted successfully.
          </div>
        )}

        <form onSubmit={submit}>
          <div className="form-group">
            <label>Select Card</label>
            <select>
              <option>•••• 4821 — Visa</option>
              <option>•••• 7294 — Mastercard</option>
            </select>
          </div>

          <div className="form-group">
            <label>Payment Amount</label>
            <input
              type="number"
              min="1"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <select>
              <option>Bank Account</option>
              <option>UPI</option>
              <option>Debit Card</option>
            </select>
          </div>

          <button className="primary-btn" type="submit">
            Pay Now
          </button>
        </form>
      </div>
    </>
  )
}

export default MakePayment
