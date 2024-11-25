import { defineStore } from 'pinia'
import { clientsAPI, vehiclesAPI, servicesAPI, offersAPI } from '../services/api'
import { checkClientStatus } from '../services/businessRules'

interface State {
  clients: any[]
  vehicles: any[]
  services: any[]
  offers: any[]
  loading: boolean
  error: string | null
}

export const useStore = defineStore('main', {
  state: (): State => ({
    clients: [],
    vehicles: [],
    services: [],
    offers: [],
    loading: false,
    error: null
  }),

  actions: {
    // Client actions
    async fetchClients() {
      this.loading = true
      try {
        const { data } = await clientsAPI.getAll()
        this.clients = data.filter(client => client.active !== false)
      } catch (error) {
        this.error = 'Error fetching clients'
      } finally {
        this.loading = false
      }
    },

    async createClient(clientData: any) {
      try {
        const { data } = await clientsAPI.create({ ...clientData, active: true })
        this.clients.push(data)
        return data
      } catch (error) {
        this.error = 'Error creating client'
        throw error
      }
    },

    async updateClient(id: number, clientData: any) {
      try {
        const { data } = await clientsAPI.update(id, clientData)
        const index = this.clients.findIndex(client => client.id === id)
        if (index !== -1) {
          this.clients[index] = data
        }
        return data
      } catch (error) {
        this.error = 'Error updating client'
        throw error
      }
    },

    // Vehicle actions
    async fetchVehicles() {
      this.loading = true
      try {
        const { data } = await vehiclesAPI.getAll()
        this.vehicles = data
      } catch (error) {
        this.error = 'Error fetching vehicles'
      } finally {
        this.loading = false
      }
    },

    async createVehicle(vehicleData: any) {
      try {
        const { data } = await vehiclesAPI.create(vehicleData)
        this.vehicles.push(data)
        await checkClientStatus() // Check status after adding new vehicle
        return data
      } catch (error) {
        this.error = 'Error creating vehicle'
        throw error
      }
    },

    async updateVehicle(id: number, vehicleData: any) {
      try {
        const { data } = await vehiclesAPI.update(id, vehicleData)
        const index = this.vehicles.findIndex(vehicle => vehicle.id === id)
        if (index !== -1) {
          this.vehicles[index] = data
        }
        return data
      } catch (error) {
        this.error = 'Error updating vehicle'
        throw error
      }
    },

    // Service actions
    async fetchServices() {
      this.loading = true
      try {
        const { data } = await servicesAPI.getAll()
        this.services = data
      } catch (error) {
        this.error = 'Error fetching services'
      } finally {
        this.loading = false
      }
    },

    async createService(serviceData: any) {
      try {
        const { data } = await servicesAPI.create(serviceData)
        this.services.push(data)
        await checkClientStatus() // Check status after adding new service
        return data
      } catch (error) {
        this.error = 'Error creating service'
        throw error
      }
    },

    async updateService(id: number, serviceData: any) {
      try {
        const { data } = await servicesAPI.update(id, serviceData)
        const index = this.services.findIndex(service => service.id === id)
        if (index !== -1) {
          this.services[index] = data
        }
        return data
      } catch (error) {
        this.error = 'Error updating service'
        throw error
      }
    },

    // Offer actions
    async fetchOffers() {
      this.loading = true
      try {
        const { data } = await offersAPI.getAll()
        // Filter out expired offers (more than 3 months old)
        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
        this.offers = data.filter(offer => new Date(offer.valid_until) > threeMonthsAgo)
      } catch (error) {
        this.error = 'Error fetching offers'
      } finally {
        this.loading = false
      }
    },

    async createOffer(offerData: any) {
      try {
        const { data } = await offersAPI.create(offerData)
        this.offers.push(data)
        return data
      } catch (error) {
        this.error = 'Error creating offer'
        throw error
      }
    },

    async updateOffer(id: number, offerData: any) {
      try {
        const { data } = await offersAPI.update(id, offerData)
        const index = this.offers.findIndex(offer => offer.id === id)
        if (index !== -1) {
          this.offers[index] = data
        }
        return data
      } catch (error) {
        this.error = 'Error updating offer'
        throw error
      }
    },

    // Business rules check
    async checkClientStatus() {
      try {
        await checkClientStatus()
        // Refresh data after status check
        await this.fetchClients()
        await this.fetchOffers()
      } catch (error) {
        this.error = 'Error checking client status'
        throw error
      }
    }
  }
})