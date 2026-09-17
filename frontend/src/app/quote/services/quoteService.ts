import { apiClient } from '@/lib/apiClient'

export async function getActiveQuotes() {
  const response = await apiClient.get('/Quote/active-quotes')
  return response.data
}

export async function deleteQuote(id: string) {
  return apiClient.patch(`/Quote/${id}`, {
    isDeleted: true,
  })
}
