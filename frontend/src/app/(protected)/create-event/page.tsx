'use client'

import withAuth from '../../hoc/withAuth'
import { useCreateEvent } from './hooks/useCreateEvent'
import CreateEventView from './CreateEventView'

const CreateEvent = () => {
  const createEvent = useCreateEvent()

  return <CreateEventView {...createEvent} />
}

export default withAuth(CreateEvent)
