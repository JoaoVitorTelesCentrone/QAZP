import axios from 'axios'

export async function getActiveQuotes() {
  const response = await axios.get(
    'http://localhost:5196/api/Quote/active-quotes',
  )

  return response.data
}

export async function deleteQuote(id: string) {
  return axios.patch(`http://localhost:5196/api/Quote/${id}`, {
    isDeleted: true,
  })
}
