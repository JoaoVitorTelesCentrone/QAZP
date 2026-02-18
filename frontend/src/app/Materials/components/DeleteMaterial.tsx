import { toast } from 'sonner'
import axios from 'axios'
import { useAtom } from 'jotai'
import { materialChangeAtom } from '../../atoms/materialChange'
import { DeleteAction } from '@/app/components/DeleteAction'

type deleteMaterialProps = {
  materialId: string
}

const DeleteMaterial: React.FC<deleteMaterialProps> = ({ materialId }) => {
  const [, setMaterialChange] = useAtom(materialChangeAtom)

  const deleteData = async (): Promise<void> => {
    try {
      await axios.patch(`http://localhost:5196/api/Material/${materialId}`)
      console.log('Dados deletados com sucesso.')
      setMaterialChange(prev => prev + 1)
      toast.success('Material excluído com sucesso')
    } catch (error) {
      console.error('Erro ao deletar os dados:', error)
      toast.error('Erro ao deletar o material')
    }
  }
  return (
    <div>
      <DeleteAction
        title="Deletar Material"
        description="Você tem certeza que deseja deletar este material?"
        onDelete={deleteData}
        iconSize="md"
      />
    </div>
  )
}

export default DeleteMaterial
