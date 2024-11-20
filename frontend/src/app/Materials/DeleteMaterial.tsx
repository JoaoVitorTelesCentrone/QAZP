import { TrashIcon } from 'lucide-react'
import React, { useState } from 'react'
import { toast, Toaster } from 'sonner'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { useAtom } from 'jotai'
import { materialChangeAtom } from '../atoms/materialChange'

type deleteMaterialProps = {
  materialId: string
}

const DeleteMaterial: React.FC<deleteMaterialProps> = ({ materialId }) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const [materialChange, setMaterialChange] = useAtom(materialChangeAtom)
  const deleteData = async (): Promise<void> => {
    try {
      await axios.patch(`http://localhost:5196/api/Material?id=${materialId}`, {
        isDelete: true,
      })
      console.log('Dados deletados com sucesso.')
      setDeleteModal(false)
      setMaterialChange(prev => prev + 1)
      toast.success('Material excluído com sucesso')
    } catch (error) {
      console.error('Erro ao deletar os dados:', error)
    }
  }
  return (
    <div>
      <Toaster richColors />
      <TrashIcon
        className="cursor-pointer h-4 w-4"
        onClick={() => setDeleteModal(true)}
      />
      {deleteModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white shadow-lg shadow-slate-600 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Deletar Cliente</h2>
            <p className="text-gray-700">
              Você tem certeza que deseja deletar este cliente ?
            </p>
            <div className="justify-between">
              <Button
                onClick={() => deleteData()}
                className="mt-6 px-4 py-2 mx-4 bg-red-950 text-white border-2 border-red-950 rounded hover:bg-red-950 hover:text-white hover:border-0"
              >
                Deletar
              </Button>
              <Button
                onClick={prev => setDeleteModal(!prev)}
                className="mt-6 mx-4 px-4 py-2 bg-white text-red-950 rounded hover:bg-white hover:text-red-950"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteMaterial
