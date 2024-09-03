// components/EditEvent.tsx
import React, { useState } from 'react'
import { Edit2Icon } from 'lucide-react'
import EditEventModal from './EditEventModal'

type EditEventProps = {
  eventId: string
}

const EditEvent: React.FC<EditEventProps> = ({ eventId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const openModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  const handleUpdate = async () => {
    // Optionally, you can trigger a parent update or refresh action here
    closeModal()
  }

  return (
    <div>
      <Edit2Icon className="w-4 h-4 cursor-pointer" onClick={openModal} />
      <EditEventModal
        visible={isModalVisible}
        onClose={closeModal}
        eventId={eventId}
        onUpdate={handleUpdate}
      />
    </div>
  )
}

export default EditEvent
