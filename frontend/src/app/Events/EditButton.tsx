'use client' 

import { useRouter } from 'next/navigation'
import { Edit3Icon } from 'lucide-react'
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
      <Edit3Icon className="cursor-pointer w-5 h-5 mt-1.5"/>
    </button>
  )
}

export default EditButton
