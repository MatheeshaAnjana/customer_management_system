import { useCallback, useEffect, useState } from 'react'
import { customerApi } from '../api/customerApi'

export function useCustomers() {
  const [customers, setCustomers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const loadCustomers = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      setCustomers(await customerApi.getAll())
    } catch (loadError) {
      setError(loadError.message || 'Unable to load customers.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCustomers()
  }, [loadCustomers])

  const saveCustomer = async (customer, editingId) => {
    setIsSaving(true)
    setError('')
    try {
      const savedCustomer = editingId
        ? await customerApi.update(editingId, customer)
        : await customerApi.create(customer)
      await loadCustomers()
      return savedCustomer
    } catch (saveError) {
      setError(saveError.message || 'Unable to save customer.')
      throw saveError
    } finally {
      setIsSaving(false)
    }
  }

  const deleteCustomer = async (id) => {
    setError('')
    try {
      await customerApi.remove(id)
      setCustomers((current) => current.filter((customer) => customer.id !== id))
    } catch (deleteError) {
      setError(deleteError.message || 'Unable to delete customer.')
      throw deleteError
    }
  }

  return { customers, isLoading, isSaving, error, loadCustomers, saveCustomer, deleteCustomer }
}
