import { useMemo, useState } from 'react'
import CustomerForm from './components/CustomerForm'
import CustomerTable from './components/CustomerTable'
import CustomerStats from './components/CustomerStats'
import CustomerToolbar from './components/CustomerToolbar'
import DeleteConfirmation from './components/DeleteConfirmation'
import ErrorBanner from './components/ErrorBanner'
import { useCustomers } from './hooks/useCustomers'
import './App.css'

function AppHeader({ theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Clientory home">
        <span className="brand-mark">C</span>
        <span>clientory</span>
      </a>
      <div className="topbar-meta">
        <span className="connection-dot" />
        <span>Workspace online</span>
        <span className="topbar-divider" />
        <span>Admin view</span>
        <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
          {theme === 'light' ? 'Dark' : 'Light'} mode
        </button>
      </div>
    </header>
  )
}

function PageHeading({ onAddCustomer }) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">Operations / Directory</p>
        <h1>Customers</h1>
        <p className="subtitle">Keep your customer relationships clear, current, and easy to act on.</p>
      </div>
      <button className="button button-primary" type="button" onClick={onAddCustomer}>
        <span className="plus">+</span> Add customer
      </button>
    </div>
  )
}

function DirectoryPanel({ customers, isLoading, error, query, statusFilter, onRefresh, onQueryChange, onStatusChange, onRetry, onEdit, onDelete }) {
  return (
    <section className="directory-panel">
      <div className="panel-heading">
        <div>
          <h2>Customer directory</h2>
          <p>{customers.visible.length} of {customers.total} records showing</p>
        </div>
        <button className="refresh-button" type="button" onClick={onRefresh} disabled={isLoading}>Refresh</button>
      </div>
      <CustomerToolbar query={query} statusFilter={statusFilter} onQueryChange={onQueryChange} onStatusChange={onStatusChange} />
      <ErrorBanner message={error} onRetry={onRetry} />
      {isLoading ? <LoadingState /> : <CustomerTable customers={customers.visible} onEdit={onEdit} onDelete={onDelete} />}
    </section>
  )
}

function LoadingState() {
  return <div className="loading-state"><span className="spinner" /> Loading customers...</div>
}

function AppFooter() {
  return <footer><span>Clientory CRM</span><span>Customer data, made useful.</span></footer>
}

function App() {
  const { customers, isLoading, isSaving, error, loadCustomers, saveCustomer, deleteCustomer } = useCustomers()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [formOpen, setFormOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('clientory-theme') || 'light')

  const visibleCustomers = useMemo(() => customers.filter((customer) => {
    const searchable = `${customer.name} ${customer.email} ${customer.phone}`.toLowerCase()
    return searchable.includes(query.toLowerCase()) && (statusFilter === 'all' || customer.status === statusFilter)
  }), [customers, query, statusFilter])
  const activeCount = customers.filter((customer) => customer.status === 'active').length
  const customerView = { visible: visibleCustomers, total: customers.length }

  const openCreateForm = () => {
    setEditingCustomer(null)
    setFormOpen(true)
  }

  const openEditForm = (customer) => {
    setEditingCustomer(customer)
    setFormOpen(true)
  }

  const handleSubmit = async (values) => {
    await saveCustomer(values, editingCustomer?.id)
    setFormOpen(false)
  }

  const handleDelete = async () => {
    await deleteCustomer(deleteTarget.id)
    setDeleteTarget(null)
  }

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    localStorage.setItem('clientory-theme', nextTheme)
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <AppHeader theme={theme} onToggleTheme={toggleTheme} />
      <main className="main-content">
        <PageHeading onAddCustomer={openCreateForm} />
        <CustomerStats total={customers.length} active={activeCount} />
        <DirectoryPanel
          customers={customerView}
          isLoading={isLoading}
          error={error}
          query={query}
          statusFilter={statusFilter}
          onRefresh={loadCustomers}
          onQueryChange={setQuery}
          onStatusChange={setStatusFilter}
          onRetry={loadCustomers}
          onEdit={openEditForm}
          onDelete={setDeleteTarget}
        />
      </main>
      <AppFooter />
      {formOpen && <CustomerForm customer={editingCustomer} isSaving={isSaving} onSubmit={handleSubmit} onClose={() => setFormOpen(false)} />}
      <DeleteConfirmation customer={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={handleDelete} />
    </div>
  )
}

export default App
