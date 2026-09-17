import { apiClient } from '@/lib/apiClient'

export const clientService = {
  async getActiveClients() {
    const { data } = await apiClient.get('/Client/active')
    return data
  },

  async getClientById(id: string) {
    const { data } = await apiClient.get(`/Client/id/${id}`)
    return data
  },

  async updateClient(id: string | undefined, data: any) {
    return apiClient.put(`/Client/${id}`, data)
  },
  async createClient(clientData: any) {
    return apiClient.post('/Client', clientData)
  },

  async deleteClient(id: string) {
    await apiClient.patch(`/Client/${id}`, {
      isDeleted: true
    })
  }
}
