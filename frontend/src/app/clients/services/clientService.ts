import axios from "axios"

const API_URL = "http://localhost:5196/api/Client"

export const clientService = {
  async getActiveClients() {
    const { data } = await axios.get(`${API_URL}/active`)
    return data
  },

  async getClientById(id: string) {
    const { data } = await axios.get(`${API_URL}/id/${id}`)
    return data
  },

  async updateClient(id: string | undefined, data: any) {
    return axios.put(`${API_URL}/${id}`, data)
  },
  async createClient(clientData: any) {
    return axios.post(`${API_URL}`, clientData)
  },
  
  async deleteClient(id: string) {
    await axios.patch(`${API_URL}/${id}`, {
      isDeleted: true
    })
  }
}