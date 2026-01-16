import axios from 'axios'
import { UserApi } from '../mappers/userMapper'

const BASE_URL = 'http://localhost:5196/api/User'

export const getActiveUsers = async () => {
  const response = await axios.get(`${BASE_URL}/activeUsers`)
  return response.data
}

export const updateUser = async (user: UserApi) => {
  const response = await axios.put(`${BASE_URL}/${user.id}`, user)
  return response.data
}

export const createUser = async (user: UserApi) => {
  const response = await axios.post(BASE_URL, user)
  return response.data
}