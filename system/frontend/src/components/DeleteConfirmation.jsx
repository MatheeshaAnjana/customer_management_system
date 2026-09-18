export default function DeleteConfirmation({ customer, onCancel, onConfirm }) {
  if (!customer) return null

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="delete-title">
        <span className="warning-mark">!</span>
        <h2 id="delete-title">Delete customer?</h2>
        <p>This will permanently remove <strong>{customer.name}</strong> from your directory.</p>
        <div className="modal-actions">
          <button className="button button-quiet" type="button" onClick={onCancel}>Cancel</button>
          <button className="button button-danger" type="button" onClick={onConfirm}>Delete record</button>
        </div>
      </section>
    </div>
  )
}
