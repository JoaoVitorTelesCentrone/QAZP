import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handleSearchClick(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { cep } = req.query

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    if (response.status === 200) {
      const cepData = response.data
      res.status(200).json(cepData)
    } else {
      throw new Error('Erro ao obter os dados do CEP')
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao obter dados do CEP' })
  }
}
