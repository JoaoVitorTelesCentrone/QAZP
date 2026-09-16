import axios from 'axios'

const API_BASE = 'http://localhost:5196/api/Event'

export const fetchActiveEvents = async (): Promise<any[]> => {
  const res = await axios.get(`${API_BASE}/active-events`)
  return res.data
}

export const deleteEvent = async (id: string) => {
  return await axios.patch(`${API_BASE}/${id}`, {
    isActive: false,
  })
}
