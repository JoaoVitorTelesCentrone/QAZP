'use client'

import { useRouter } from 'next/navigation'
import { Edit3Icon } from 'lucide-react'

const EditButton = ({ eventId }: { eventId: string }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/EditEvent?id=${eventId}`)
  }

  return (
    <button onClick={handleClick}>
      <Edit3Icon className="cursor-pointer w-5 h-5 mt-1.5"/>
    </button>
  )
}

export default EditButton
