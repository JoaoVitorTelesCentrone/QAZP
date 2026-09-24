import { apiClient } from '@/lib/apiClient'
import { MaterialProps } from '../types/materialTypes'

export const fetchActiveMaterials = async (): Promise<MaterialProps[]> => {
  const res = await apiClient.get('/Material/active-materials')
  return res.data
}

export const createMaterial = async (data: Partial<MaterialProps>) => {
  return await apiClient.post('/Material', data)
}

export const updateMaterial = async (id: string, data: Partial<MaterialProps>) => {
  return await apiClient.put(`/Material/${id}`, data)
}

export const deleteMaterial = async (id: string) => {
  return await apiClient.patch(`/Material/${id}`)
}
