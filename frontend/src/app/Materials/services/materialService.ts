import axios from 'axios'
import { MaterialProps } from '../types/material'

const API_BASE = 'http://localhost:5196/api/Material'

export const fetchActiveMaterials = async (): Promise<MaterialProps[]> => {
  const res = await axios.get(`${API_BASE}/active-materials`)
  return res.data
}

export const createMaterial = async (data: Partial<MaterialProps>) => {
  return await axios.post(API_BASE, data)
}

export const updateMaterial = async (id: string, data: Partial<MaterialProps>) => {
  return await axios.put(`${API_BASE}/${id}`, data)
}

export const deleteMaterial = async (id: string) => {
  return await axios.patch(`${API_BASE}/${id}`)
}