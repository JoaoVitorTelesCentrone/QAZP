import axios from 'axios'
import { EditEventUpdatePayload } from '../types/editEventTypes'

const API_BASE = 'http://localhost:5196/api'

export const fetchEventById = async (eventId: string) => {
  const res = await axios.get(`${API_BASE}/Event/${eventId}`)
  return res.data
}

export const fetchClientById = async (clientId: string) => {
  const res = await axios.get(`${API_BASE}/Client/id/${clientId}`)
  return res.data
}

export const fetchEventMaterials = async (eventId: string) => {
  const res = await axios.get(`${API_BASE}/EventMaterial/event/${eventId}`)
  return res.data
}

export const fetchMaterialsByCategory = async (category: number) => {
  const res = await axios.get(`${API_BASE}/Material/category/${category}`)
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
  return await axios.put(`${API_BASE}/Event/${eventId}`, payload)
}
