const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5063/api'

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`
    try {
      const error = await response.json()
      message = error.title || error.message || error.detail || message
    } catch {
      // The API may return an empty response for some errors.
    }
    throw new Error(message)
  }

  if (response.status === 204) return null
  return response.json()
}

export const customerApi = {
  getAll: () => request('/Customer'),
  create: (customer) => request('/Customer', {
    method: 'POST',
    body: JSON.stringify(customer),
  }),
  update: (id, customer) => request(`/Customer/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ ...customer, id }),
  }),
  remove: (id) => request(`/Customer/${id}`, { method: 'DELETE' }),
}
