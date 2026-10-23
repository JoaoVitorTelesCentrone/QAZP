import axios from 'axios'
import { apiClient } from '@/lib/apiClient'

export const fetchClients = async () => {
  // Only active clients can be picked for an event.
  const res = await apiClient.get('/Client/active')
  return res.data
}

export const fetchMaterialsByCategory = async (category: number) => {
  const res = await apiClient.get(`/Material/category/${category}`)
  return res.data
}

export const fetchAddressByZipCode = async (zipCode: string) => {
  const res = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
  return res.data
}

export const createEvent = async (payload: unknown) => {
  return apiClient.post('/Event', payload)
}
