import { clientsAPI, servicesAPI, offersAPI } from './api'
import { differenceInMonths, parseISO } from 'date-fns'

export const checkClientStatus = async () => {
  try {
    const { data: clients } = await clientsAPI.getAll()
    const { data: services } = await servicesAPI.getAll()
    
    for (const client of clients) {
      const clientServices = services.filter(service => 
        service.vehicle_id && service.vehicle.client_id === client.id
      )
      
      if (clientServices.length === 0) continue
      
      // Get the most recent service date
      const lastServiceDate = new Date(Math.max(
        ...clientServices.map(service => new Date(service.date).getTime())
      ))
      
      const monthsSinceLastService = differenceInMonths(new Date(), lastServiceDate)
      
      // If more than 6 months without service, generate offer
      if (monthsSinceLastService >= 6 && monthsSinceLastService < 10) {
        await generateSpecialOffer(client.id)
      }
      
      // If more than 10 months without service, deactivate client
      if (monthsSinceLastService >= 10) {
        await deactivateClient(client.id)
      }
    }
  } catch (error) {
    console.error('Error checking client status:', error)
    throw error
  }
}

const generateSpecialOffer = async (clientId: number) => {
  try {
    // Check if client already has an active offer
    const { data: existingOffers } = await offersAPI.getAll()
    const activeOffer = existingOffers.find(offer => 
      offer.client_id === clientId && 
      new Date(offer.valid_until) > new Date()
    )
    
    if (activeOffer) return // Don't create new offer if one is active
    
    // Create new special offer valid for 3 months
    const validUntil = new Date()
    validUntil.setMonth(validUntil.getMonth() + 3)
    
    await offersAPI.create({
      type: 'Loyalty Return Special',
      date: new Date().toISOString().split('T')[0],
      time: '00:00:00',
      cost: 99.99,
      valid_until: validUntil.toISOString().split('T')[0],
      client_id: clientId
    })
  } catch (error) {
    console.error('Error generating special offer:', error)
    throw error
  }
}

const deactivateClient = async (clientId: number) => {
  try {
    await clientsAPI.update(clientId, { active: false })
  } catch (error) {
    console.error('Error deactivating client:', error)
    throw error
  }
}