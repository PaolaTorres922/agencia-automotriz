import { defineStore } from 'pinia'
import { clientsAPI } from '../services/api'

export const useClientsStore = defineStore('clients', {
  state: () => ({
    clients: [],
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchClients() {
      this.loading = true
      try {
        const response = await clientsAPI.getAll()
        this.clients = response.data
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    
    async createClient(clientData: any) {
      try {
        const response = await clientsAPI.create(clientData)
        this.clients.push(response.data)
        return response.data
      } catch (error) {
        this.error = error
        throw error
      }
    }
  }
})