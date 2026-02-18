'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { DeleteAction } from '../components/DeleteAction'

type deleteUserProps = {
  userId: string
}

const DeleteUser: React.FC<deleteUserProps> = ({ userId }) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const deleteData = async (): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5196/api/User/${userId}`)
      console.log('Dados deletados com sucesso.')
      setDeleteModal(false)
    } catch (error) {
      console.error('Erro ao deletar os dados:', error)
    }
  }
  return (
    <div>
      <DeleteAction
        title="Deletar usuário"
        description="Você tem certeza que deseja deletar esse usuário?"
        onDelete={deleteData}
      />
    </div>
  )
}

export default DeleteUser
