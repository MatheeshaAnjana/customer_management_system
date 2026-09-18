function formatDate(value) {
  if (!value) return '-'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

export default function CustomerTable({ customers, onEdit, onDelete }) {
  if (!customers.length) {
    return <div className="empty-state"><span className="empty-mark">--</span><h3>No customers found</h3><p>Try changing your search or add your first customer.</p></div>
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>Customer</th><th>Phone</th><th>Address</th><th>Status</th><th>Added</th><th><span className="sr-only">Actions</span></th></tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td><div className="customer-cell"><span className="avatar">{customer.name.slice(0, 1).toUpperCase()}</span><div><strong>{customer.name}</strong><span>{customer.email}</span></div></div></td>
              <td>{customer.phone}</td>
              <td className="address-cell">{customer.address}</td>
              <td><span className={`status status-${customer.status}`}>{customer.status}</span></td>
              <td>{formatDate(customer.createdDate)}</td>
              <td><div className="row-actions"><button type="button" onClick={() => onEdit(customer)}>Edit</button><button type="button" className="danger-link" onClick={() => onDelete(customer)}>Delete</button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
