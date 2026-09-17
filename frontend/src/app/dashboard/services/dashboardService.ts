import axios from 'axios'

export async function getDashboardData(token: string) {
  return axios.get('http://localhost:5196/api/Dashboard', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
