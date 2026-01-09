import { useEffect, useState } from 'react'
import { getDashboardData } from '../services/dashboard.service'
import { mapEventToTable } from '../mappers/event.mapper'
import { toast } from 'sonner'

export function useDashboard() {
  const [loading, setLoading] = useState(true)
  const [counts, setCounts] = useState({ clients: 0, users: 0, events: 0 })
  const [events, setEvents] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token')!
        const { data } = await getDashboardData(token)

        setCounts({
          clients: data.clients ?? 0,
          users: data.users ?? 0,
          events: data.events ?? 0,
        })

        setEvents(data.eventDetails.map(mapEventToTable))
      } catch {
        toast.error('Erro ao buscar dados da Dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { loading, counts, events }
}
