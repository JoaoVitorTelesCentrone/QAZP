import axios from 'axios'

const API_URL = 'http://localhost:5196/api/User/'

export async function login(username: string, password: string) {
  const response = await axios.post(API_URL, { username, password })
  return response.data
}