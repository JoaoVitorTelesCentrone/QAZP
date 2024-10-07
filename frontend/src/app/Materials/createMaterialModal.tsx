import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { Button, Modal } from 'antd'
import axios from 'axios'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

import { useAtom } from 'jotai'
import { materialChangeAtom } from '../atoms/materialChange'
import ValidatedInput from '../components/ValidatedInput'

const MaterialCategory: MaterialCategoryProps[] = [
  { name: 'Comida', index: 1 },
  { name: 'Decoração', index: 2 },
  { name: 'Utensilios', index: 3 },
  { name: 'Móveis', index: 4 },
  { name: 'Recursos humanos', index: 5 },
  { name: 'Aluguel', index: 6 },
  { name: 'Entretenimento', index: 7 },
  { name: 'Marketing', index: 8 },
]

type MaterialCategoryProps = {
  name: string
  index: number
}
export type createMaterialProps = {
  isVisible: boolean
  onClose: () => void
}

const CreateMaterialModal: React.FC<createMaterialProps> = ({
  isVisible,
  onClose,
}) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [type, setType] = useState('')
  const [category, setCategory] = useState(0)
  const [change, setChange] = useAtom(materialChangeAtom)

  const createMaterialRequest = async () => {
    const data = {
      name: name,
      category: category,
      price: price,
      isActive: true,
    }

    try {
      const response = await axios.post(
        'http://localhost:5196/api/Material',
        data,
      )
      if (response.status === 201) {
        toast.success('Material criado')
        setChange(prev => prev + 1)
        onClose()
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
      toast.error('Deu erro!')
    }

    return true
  }

  const getCategoryNameAndIndex = (type: string, category: number) => {
    setType(type)
    setCategory(category)
  }

  return (
    <div>
      <Modal
        title="Criar material"
        visible={isVisible}
        onCancel={onClose}
        footer={[]}
      >
        <div className="flex flex-col my-8 rounded-xl justify-around">
          <div className="flex flex-col">
            <h1>Digite o nome do material</h1>
            <ValidatedInput
              type="name"
              onChange={setName}
              placeholder="Nome"
              className="border-2  bg-white placeholder:text-primary mx-4 my-1 w-[90%]"
              value={name}
              required
            />
          </div>
          <div className="flex w-full mt-4">
            <div className="flex flex-col w-[50%]">
              <h1>Categoria</h1>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex border-2 bg-white  justify-between px-2 py-1 rounded mr-6 h-10">
                  <h1>{type ? type : 'Categoria'}</h1>
                  <ChevronDown className="h-4 w-4 mt-1" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="border-2 p-2 bg-white my-1 rounded-xl w-52">
                  {MaterialCategory.map((category, index) => (
                    <>
                      <DropdownMenuItem
                        className="cursor-pointer my-1"
                        key={index}
                        onClick={() =>
                          getCategoryNameAndIndex(category.name, category.index)
                        }
                      >
                        {category.name}
                      </DropdownMenuItem>
                      <hr className="bg-primary h-[0.4px]" />
                    </>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="w-[50%]">
              <h1>Digite o preço</h1>
              <ValidatedInput
                onChange={value => setPrice(Number(value))}
                className="p-2 border-slate-500 bg-white mb-4 border rounded w-full"
                placeholder="Digite o preço"
                value={price} 
                type="number"
                required
              />
            </div>
          </div>
          <div className='w-full flex justify-end mt-3'>
            <Button
              className="bg-primary text-white w-[30%]"
              onClick={() => createMaterialRequest()}
            >
              Criar material
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CreateMaterialModal
