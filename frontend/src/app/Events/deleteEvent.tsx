import React, { useState } from 'react'
import DeleteEventModal from './DeleteEventModal'
import { TrashIcon } from 'lucide-react'

interface DeleteEventProps {
  eventId: string
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
      <TrashIcon className="cursor-pointer w-5 h-5" onClick={showModal} />
      <DeleteEventModal
        isVisible={isModalVisible}
        onClose={closeModal}
        eventId={eventId}
      />
    </>
  )
}

export default DeleteEvent
