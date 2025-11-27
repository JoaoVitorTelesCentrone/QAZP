'use client'

import axios from 'axios'
import { useAtom } from 'jotai'
import { getQuoteAtom } from '../atoms/getQuoteAtom'


function MeuComponente() {
  const [quote, setQuote] = useAtom(getQuoteAtom)
  async function fetchQuote() {
    try {
      const response = await axios.get('http://localhost:5196/api/Quote')

      if (response.status === 200) {
        setQuote(response.data)
      } else {
        throw new Error('Erro ao obter a citação')
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
    }
  }

  return (
    <div>
      <h1>Citação:</h1>
      <p className="p-8 text-xl text-black">{quote.firstName}</p>
      <button className="bg-primary rounded-xl text-white" onClick={fetchQuote}>
        Clicar
      </button>
    </div>
  )
}

export default MeuComponente
