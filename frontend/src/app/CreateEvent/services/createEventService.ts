import axios from 'axios'

const API_BASE = 'http://localhost:5196/api'

export const fetchClients = async () => {
  const res = await axios.get(`${API_BASE}/Client`)
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

export const createEvent = async (payload: unknown) => {
  return axios.post(`${API_BASE}/Event`, payload)
}
