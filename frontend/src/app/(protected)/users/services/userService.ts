import { apiClient } from '@/lib/apiClient'
import { UserApi } from '../mappers/userMapper'

export const getActiveUsers = async () => {
  const response = await apiClient.get('/User/activeUsers')
  return response.data
}

export const updateUser = async (user: UserApi) => {
  const response = await apiClient.put(`/User/${user.id}`, user)
  return response.data
}

export const createUser = async (user: UserApi) => {
  const response = await apiClient.post('/User', user)
  return response.data
}
