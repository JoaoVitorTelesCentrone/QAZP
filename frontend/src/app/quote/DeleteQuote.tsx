import React, { useState } from 'react'
import axios from 'axios'
import { useAtom } from 'jotai'
import { quoteChangeAtom } from '../atoms/changeQuoteAtom'
import { DeleteAction } from '../components/DeleteAction'

type deleteQuoteProps = {
  quoteId: string
}

const DeleteQuote: React.FC<deleteQuoteProps> = ({ quoteId }) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const [quoteChange, setQuoteChange] = useAtom(quoteChangeAtom)

  const deleteData = async (): Promise<void> => {
    try {
      await axios.patch(`http://localhost:5196/api/Quote/${quoteId}`, {
        isDeleted: true,
      })
      console.log('Dados deletados com sucesso.')
      setDeleteModal(false)
      setQuoteChange(prev => prev + 1)
    } catch (error) {
      console.error('Erro ao deletar os dados:', error)
    }
  }
  return (
    <div>
      <DeleteAction
        title="Deletar Orçamento"
        description="Você tem certeza que deseja deletar este orçamento?"
        onDelete={deleteData}
        iconSize="md"
      />
    </div>
  )
}

export default DeleteQuote
