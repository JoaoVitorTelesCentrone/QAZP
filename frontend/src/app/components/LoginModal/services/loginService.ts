import { apiClient } from '@/lib/apiClient'

export type LoginResult = {
  token: string
  name: string
}

export async function login(username: string, password: string): Promise<LoginResult> {
  const response = await apiClient.post('/User/login', { username, password })
  return response.data
}
