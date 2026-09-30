import { useState } from 'react'

function AddCard() {
  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  })

  const submit = (e) => {
    e.preventDefault()
    alert('Card added successfully!')
  }

  return (
    <>
      <div className="page-heading">
        <h2>Add Credit Card</h2>
        <p>Securely add a new card to your account.</p>
      </div>

      <div className="form-card">
        <form onSubmit={submit}>
          <div className="form-grid">
            <div className="form-group full">
              <label>Card Number</label>
              <input
                required
                placeholder="1234 5678 9012 3456"
                value={card.number}
                onChange={(e) => setCard({...card, number: e.target.value})}
              />
            </div>

            <div className="form-group full">
              <label>Card Holder Name</label>
              <input
                required
                placeholder="Name on card"
                value={card.name}
                onChange={(e) => setCard({...card, name: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Expiry Date</label>
              <input
                required
                placeholder="MM/YY"
                value={card.expiry}
                onChange={(e) => setCard({...card, expiry: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>CVV</label>
              <input
                required
                type="password"
                maxLength="3"
                placeholder="•••"
                value={card.cvv}
                onChange={(e) => setCard({...card, cvv: e.target.value})}
              />
            </div>
          </div>

          <button className="primary-btn" type="submit">
            Add Card
          </button>
        </form>
      </div>
    </>
  )
}

export default AddCard
