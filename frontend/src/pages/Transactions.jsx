function Transactions() {
  const transactions = [
    ['TXN001', 'Amazon', '30 Sep 2026', '₹2,450', 'Success'],
    ['TXN002', 'Swiggy', '29 Sep 2026', '₹540', 'Success'],
    ['TXN003', 'Fuel Station', '28 Sep 2026', '₹1,800', 'Success'],
    ['TXN004', 'Myntra', '27 Sep 2026', '₹3,200', 'Pending'],
    ['TXN005', 'Payment', '25 Sep 2026', '₹5,000', 'Success'],
  ]

  return (
    <>
      <div className="page-heading">
        <h2>Transactions</h2>
        <p>View and track all your card transactions.</p>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Description</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => (
              <tr key={item[0]}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>{item[2]}</td>
                <td><strong>{item[3]}</strong></td>
                <td>
                  <span className={`status ${item[4].toLowerCase()}`}>
                    {item[4]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Transactions
