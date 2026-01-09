'use client'

import withAuth from '../hoc/withAuth'
import { useQuotes } from './hooks/useQuotes'
import QuoteView from './QuoteView'

function Page() {
  const { quotes, loading } = useQuotes()
  return <QuoteView loading={loading} quotes={quotes} />
}

export default withAuth(Page)
