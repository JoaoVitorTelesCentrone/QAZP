import { apiClient } from '@/lib/apiClient'

export const fetchActiveEvents = async (): Promise<any[]> => {
  const res = await apiClient.get('/Event/active-events')
  return res.data
}

export const deleteEvent = async (id: string) => {
  return await apiClient.patch(`/Event/${id}`, {
    isActive: false,
  })
}
