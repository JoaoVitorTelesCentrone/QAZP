'use client'

import { useSearchParams } from 'next/navigation'
import EditEventView from './EditEventView'
import { useEditEvent } from './hooks/useEditEvent'

const EditEvent = () => {
  const searchParams = useSearchParams()
  const eventId = searchParams.get('id') ?? ''

  const editEvent = useEditEvent(eventId)

  return <EditEventView {...editEvent} />
}

export default EditEvent
