export default function CustomerStats({ total, active }) {
  return (
    <section className="stats-grid" aria-label="Customer overview">
      <article className="stat-card">
        <span className="stat-label">Total customers</span>
        <strong>{total}</strong>
        <span className="stat-note">All records in directory</span>
      </article>
      <article className="stat-card stat-highlight">
        <span className="stat-label">Active customers</span>
        <strong>{active}</strong>
        <span className="stat-note"><span className="mini-dot" /> Currently engaged</span>
      </article>
      <article className="stat-card">
        <span className="stat-label">Inactive customers</span>
        <strong>{total - active}</strong>
        <span className="stat-note">Needs re-engagement</span>
      </article>
    </section>
  )
}
