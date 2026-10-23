import axios from 'axios'
import { apiClient } from '@/lib/apiClient'
import { EditEventUpdatePayload } from '../types/editEventTypes'

export const fetchEventById = async (eventId: string) => {
  const res = await apiClient.get(`/Event/${eventId}`)
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

export const updateEvent = async (
  eventId: string,
  payload: EditEventUpdatePayload,
) => {
  return await apiClient.put(`/Event/${eventId}`, payload)
}
