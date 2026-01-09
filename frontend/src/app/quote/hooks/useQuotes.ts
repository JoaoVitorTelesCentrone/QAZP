import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { quoteChangeAtom } from '../../atoms/changeQuoteAtom'
import { getActiveQuotes } from '../services/quote.service'
import { mapQuoteToTable } from '../mappers/quote.mapper'
import { Quote } from '../types'

export function useQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [quoteChange] = useAtom(quoteChangeAtom)

  useEffect(() => {
    async function fetchQuotes() {
      setLoading(true)
      try {
        const data = await getActiveQuotes()
        setQuotes(data.map(mapQuoteToTable))
      } finally {
        setLoading(false)
      }
    }

    fetchQuotes()
  }, [quoteChange])

  return { quotes, loading }
}
