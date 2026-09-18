const statusFilters = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

export default function CustomerToolbar({ query, statusFilter, onQueryChange, onStatusChange }) {
  return (
    <div className="toolbar">
      <label className="search-box">
        <span aria-hidden="true">/</span>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search name, email or phone"
          aria-label="Search customers"
        />
      </label>
      <div className="filter-group" role="group" aria-label="Filter by status">
        {statusFilters.map((filter) => (
          <button
            className={statusFilter === filter.value ? 'filter active' : 'filter'}
            key={filter.value}
            type="button"
            onClick={() => onStatusChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}
