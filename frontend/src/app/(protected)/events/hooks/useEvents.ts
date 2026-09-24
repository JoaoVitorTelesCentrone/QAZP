import { useState, useEffect, useCallback } from 'react'
import { useAtom } from 'jotai'
import { fetchActiveEvents } from '../services/eventService'
import { mapEventApiToRow } from '../mappers/eventMapper'
import { EventProps } from '../types/eventTypes'
import { eventChangeAtom } from '../../../atoms/eventChangeAtom'

export const useEvents = () => {
  const [events, setEvents] = useState<EventProps[]>([])
  const [loading, setLoading] = useState(true)
  const [eventChange] = useAtom(eventChangeAtom)

  const fetchEvents = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchActiveEvents()
      setEvents(data.map(mapEventApiToRow))
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents, eventChange])

  return { events, loading, refetch: fetchEvents }
}
