import { useEffect, useState } from 'react'

const emptyCustomer = { name: '', email: '', phone: '', address: '', status: 'active' }

function validateCustomer(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Name is required.'
  if (!values.email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email.'
  if (!values.phone.trim()) errors.phone = 'Phone is required.'
  if (!values.address.trim()) errors.address = 'Address is required.'
  return errors
}

export default function CustomerForm({ customer, isSaving, onSubmit, onClose }) {
  const [values, setValues] = useState(emptyCustomer)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setValues(customer ? {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      status: customer.status,
    } : emptyCustomer)
    setErrors({})
  }, [customer])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validateCustomer(values)
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }
    await onSubmit(values)
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="customer-form-title">
        <div className="modal-heading">
          <div>
            <p className="eyebrow">Customer record</p>
            <h2 id="customer-form-title">{customer ? 'Edit customer' : 'Add customer'}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close form">x</button>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label className="field">
              <span>Full name</span>
              <input name="name" value={values.name} onChange={handleChange} placeholder="e.g. Amara Perera" autoFocus />
              {errors.name && <small className="field-error">{errors.name}</small>}
            </label>
            <label className="field">
              <span>Email address</span>
              <input name="email" type="email" value={values.email} onChange={handleChange} placeholder="amara@example.com" />
              {errors.email && <small className="field-error">{errors.email}</small>}
            </label>
            <label className="field">
              <span>Phone number</span>
              <input name="phone" value={values.phone} onChange={handleChange} placeholder="+94 77 123 4567" />
              {errors.phone && <small className="field-error">{errors.phone}</small>}
            </label>
            <label className="field">
              <span>Status</span>
              <select name="status" value={values.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <label className="field field-wide">
              <span>Address</span>
              <textarea name="address" value={values.address} onChange={handleChange} placeholder="Enter a full address" rows="3" />
              {errors.address && <small className="field-error">{errors.address}</small>}
            </label>
          </div>
          <div className="modal-actions">
            <button className="button button-quiet" type="button" onClick={onClose}>Cancel</button>
            <button className="button button-primary" type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : customer ? 'Save changes' : 'Create customer'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
