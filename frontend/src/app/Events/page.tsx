'use client'

import withAuth from '../hoc/withAuth'
import { useEvents } from './hooks/useEvents'
import EventsView from './EventsView'

const EventsPage = () => {
  const { events, loading } = useEvents()

  return <EventsView events={events} loading={loading} />
}

export default withAuth(EventsPage)
