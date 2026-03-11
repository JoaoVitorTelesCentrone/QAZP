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

  async deleteClient(id: string) {
    await axios.patch(`${API_URL}/${id}`, {
      isDeleted: true
    })
  }
}