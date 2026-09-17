import { apiClient } from '@/lib/apiClient'

export async function getDashboardData(token: string) {
  return apiClient.get('/Dashboard', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
