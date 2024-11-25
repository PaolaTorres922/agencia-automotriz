import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export const clientsAPI = {
  getAll: () => api.get('/clients'),
  getById: (id: number) => api.get(`/clients/${id}`),
  create: (data: any) => api.post('/clients', data),
  update: (id: number, data: any) => api.put(`/clients/${id}`, data),
  delete: (id: number) => api.delete(`/clients/${id}`)
}

export const vehiclesAPI = {
  getAll: () => api.get('/vehicles'),
  getById: (id: number) => api.get(`/vehicles/${id}`),
  create: (data: any) => api.post('/vehicles', data),
  update: (id: number, data: any) => api.put(`/vehicles/${id}`, data),
  delete: (id: number) => api.delete(`/vehicles/${id}`)
}

export const servicesAPI = {
  getAll: () => api.get('/services'),
  getById: (id: number) => api.get(`/services/${id}`),
  create: (data: any) => api.post('/services', data),
  update: (id: number, data: any) => api.put(`/services/${id}`, data),
  delete: (id: number) => api.delete(`/services/${id}`)
}

export const offersAPI = {
  getAll: () => api.get('/offers'),
  getById: (id: number) => api.get(`/offers/${id}`),
  create: (data: any) => api.post('/offers', data),
  update: (id: number, data: any) => api.put(`/offers/${id}`, data),
  delete: (id: number) => api.delete(`/offers/${id}`)
}

export default api