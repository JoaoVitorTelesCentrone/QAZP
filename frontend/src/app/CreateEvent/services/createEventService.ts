import axios from 'axios'
import { apiClient } from '@/lib/apiClient'

export const fetchClients = async () => {
  const res = await apiClient.get('/Client')
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
