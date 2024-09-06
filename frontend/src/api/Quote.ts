import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await axios.get(`http://localhost:5196/api/Quote`)
    if (response.status === 200) {
      const quoteData = response.data
      res.status(200).json(quoteData)
    } else {
      throw new Error('Erro ao obter a citação')
    }
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error)
    res.status(500).json({ error: 'Erro ao fazer a requisição' })
  }
}
