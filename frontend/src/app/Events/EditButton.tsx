// EditButton.tsx
'use client' // Ensure this file is treated as a client-side component

import { useRouter } from 'next/navigation' // Use next/navigation for newer Next.js versions
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
