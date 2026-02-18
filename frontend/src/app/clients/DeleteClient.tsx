import React, { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { useAtom } from 'jotai'
import { clientChangeAtom } from '../atoms/clientChangeAtom'
import { intl } from '@/i18n'
import { DeleteAction } from '../components/DeleteAction'

type deleteClientProps = {
  userId: string
}

const DeleteClient: React.FC<deleteClientProps> = ({ userId }) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const [clientChange, setClientChange] = useAtom(clientChangeAtom)
  const deleteData = async (): Promise<void> => {
    try {
      await axios.patch(`http://localhost:5196/api/Client/${userId}`, {
        isDeleted: true,
      })
      setDeleteModal(false)
      setClientChange(prev => prev + 1)
      toast.success(intl.formatMessage({ id: 'delete.client.success.message' }))
    } catch (error) {
      console.error('Erro ao deletar os dados:', error)
      toast.error(intl.formatMessage({ id: 'delete.client.error.message' }))
    }
  }
  return (
    <div>
      <DeleteAction
        title="Deletar Cliente"
        description="Você tem certeza que deseja deletar este cliente?"
        onDelete={deleteData}
        iconSize="md"
      />
    </div>
  )
}

export default DeleteClient
