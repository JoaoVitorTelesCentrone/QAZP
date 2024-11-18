import React, { useState } from 'react'
import axios from 'axios'
import { Modal, Button } from 'antd'
import { useAtom } from 'jotai'
import { eventChangeAtom } from '../atoms/eventChangeAtom'

interface DeleteEventModalProps {
  isVisible: boolean
  onClose: () => void
  eventId: string
}

const DeleteEventModal: React.FC<DeleteEventModalProps> = ({
  isVisible,
  onClose,
  eventId,
}) => {
  const [loading, setLoading] = useState(false)
  const [eventChange, setEventChange] = useAtom(eventChangeAtom)

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await axios.patch(`http://localhost:5196/api/Event/${eventId}`, {
        isActive: false,
      })
      setEventChange(prev => prev + 1)
      onClose()
    } catch (error) {
      console.error('Error updating event:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Confirm Delete"
      open={isVisible}
      onCancel={onClose} // Close the modal when "X" is clicked
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="confirm"
          type="primary"
          loading={loading}
          onClick={handleConfirm}
        >
          Confirm
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this event?</p>
    </Modal>
  )
}

export default DeleteEventModal
