'use client' 

import { useRouter } from 'next/navigation'
import { Edit2Icon } from 'lucide-react'
import { eventIdAtom } from '../atoms/EventIdAtom'
import { useAtom } from 'jotai'

const EditButton = ({ eventId }: { eventId: string }) => {
  const router = useRouter()

  const [eventAtom, setEventId] = useAtom(eventIdAtom)

  const handleClick = () => {
    setEventId(eventId)
    router.push(`/EditEvent`)
  }

  return (
    <button onClick={handleClick}>
      <Edit2Icon />
    </button>
  )
}

export default EditButton
