import axios from 'axios'

const API_URL = 'http://localhost:5196/api/User/login'

export type LoginResult = {
  token: string
  name: string
}

export async function login(username: string, password: string): Promise<LoginResult> {
  const response = await axios.post(API_URL, { username, password })
  return response.data
}
