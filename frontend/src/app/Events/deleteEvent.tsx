import React, { useState } from 'react'
import DeleteEventModal from './DeleteEventModal'
import { TrashIcon } from 'lucide-react'

interface DeleteEventProps {
  eventId: string // Ensure refreshEvents is part of the props
}

const DeleteEvent: React.FC<DeleteEventProps> = ({ eventId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <TrashIcon 
        className="cursor-pointer w-4 h-4" 
        onClick={showModal} 
      />
      <DeleteEventModal
        isVisible={isModalVisible}
        onClose={closeModal}
        eventId={eventId} // Pass the refresh function to the modal
      />
    </>
  )
}

export default DeleteEvent
