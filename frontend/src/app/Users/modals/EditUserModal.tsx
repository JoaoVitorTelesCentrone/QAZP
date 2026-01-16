'use client'
import React from 'react'
import EditUserForm from '../components/EditUserForm'
import { UserApi } from '../mappers/userMapper'

interface EditUserModalProps {
  userData: UserApi
  isVisible: boolean
  onClose: () => void
  onUpdated?: () => void
}

const EditUserModal: React.FC<EditUserModalProps> = ({ userData, isVisible, onClose, onUpdated }) => {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <EditUserForm userData={userData} closeModal={onClose} onUpdated={onUpdated} />
      </div>
    </div>
  )
}

export default EditUserModal
