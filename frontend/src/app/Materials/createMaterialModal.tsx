import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { Button, Input, Modal } from 'antd'
import axios from 'axios'
import { ChevronDown } from 'lucide-react'
import { toast } from 'sonner'
import { useAtom } from 'jotai'
import { materialChangeAtom } from '../atoms/materialChange'

const MaterialCategory: MaterialCategoryProps[] = [
  { name: 'Comida', index: 0 },
  { name: 'Decoração', index: 1 },
  { name: 'Utensilios', index: 2 },
  { name: 'Móveis', index: 3 },
  { name: 'Recursos humanos', index: 4 },
  { name: 'Aluguel', index: 5 },
  { name: 'Entretenimento', index: 6 },
  { name: 'Marketing', index: 7 },
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
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')
  const [category, setCategory] = useState<number | null>(null)
  const [change, setChange] = useAtom(materialChangeAtom)
  const [isTouched, setIsTouched] = useState(false)
  const [priceError, setPriceError] = useState('')
  const [nameError, setNameError] = useState('')


  const createMaterialRequest = async () => {
    const fieldsToValidate = [
      { value: name, errorSetter: setNameError },
      { value: price, errorSetter: setPriceError },
    ]

    let isValid = true

    fieldsToValidate.forEach(({ value, errorSetter }) => {
      if (!value) {
        errorSetter('Campo obrigatório *')
        isValid = false
      } else {
        errorSetter('')
      }
    })

    if (category === null) {
      setIsTouched(true)
      isValid = false
    }

    if (!isValid) return

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

  const handleBlur = (fieldName: keyof typeof fieldErrorMap) => {
    const fieldErrorMap = {
      name: {
        value: name,
        setError: setNameError,
      },
      price: {
        value: price,
        setError: setPriceError,
      },
    }

    const field = fieldErrorMap[fieldName]

    if (!field.value) {
      field.setError('Campo obrigatório *')
    } else {
      field.setError('')
    }
  }

  const getCategoryNameAndIndex = (type: string, categoryIndex: number) => {
    setType(type)
    setCategory(categoryIndex)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (!isNaN(Number(value)) || value === '') {
      setPrice(value)
      setPriceError('')
    } else {
      setPriceError('Apenas números são permitidos')
    }
  }

  const isCategoryValid = category !== null

  return (
    <div>
      <Modal
        title="Criar material"
        open={isVisible}
        onCancel={onClose}
        footer={[]}
      >
        <div className="flex flex-col my-8 rounded-xl justify-around">
          <div className="flex flex-col relative">
            <h1>Digite o nome do material</h1>
            <Input
              type="name"
              onChange={e => setName(e.target.value)}
              onBlur={() => handleBlur('name')}
              placeholder="Nome"
              className={`p-2 mb-4 border rounded w-full ${nameError ? 'border-red-500' : 'border-slate-300'}`}
              value={name}
              required
            />
            {nameError && (
              <div
                style={{
                  color: 'red',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: -15,
                }}
              >
                {nameError}
              </div>
            )}
          </div>
          <div className="flex w-full mt-4 mb-4">
            <div className="flex flex-col w-[50%] relative">
              <h1>Categoria</h1>
              <DropdownMenu
                onOpenChange={open => {
                  if (!open) {
                    if (!isCategoryValid) {
                      setIsTouched(true)
                    }
                  }
                }}
              >
                <DropdownMenuTrigger
                  className={`flex border-2 bg-white justify-between px-2 py-1 rounded mr-6 h-10 ${
                    !isCategoryValid && isTouched
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  onBlur={() => setIsTouched(true)}
                >
                  <h1 className={`${!type ? 'text-gray-400' : 'text-black'} mt-1`}>
                    {type ? type : 'Categoria'}
                  </h1>
                  <ChevronDown className="h-4 w-4 mt-2" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  style={{ zIndex: 1000 }}
                  className="border-2 p-2 bg-white my-1 rounded-xl w-52"
                >
                  {MaterialCategory.map((category, index) => (
                    <React.Fragment key={index}>
                      <DropdownMenuItem
                        className="cursor-pointer my-1"
                        onClick={() => {
                          getCategoryNameAndIndex(category.name, category.index)
                          setIsTouched(false)
                        }}
                      >
                        {category.name}
                      </DropdownMenuItem>
                      {index < MaterialCategory.length - 1 && (
                        <hr className="bg-primary h-[0.4px]" />
                      )}
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {!isCategoryValid && isTouched && (
                <span
                  className="text-red-500 text-sm absolute"
                  style={{ top: '100%', marginTop: -15 }}
                >
                  Campo obrigatório *
                </span>
              )}
            </div>
            <div className="w-[50%] relative">
              <h1>Digite o preço</h1>
              <Input
                onChange={handlePriceChange}
                onBlur={() => handleBlur('price')}
                className={`p-2 mb-4 border rounded w-full ${priceError ? 'border-red-500' : 'border-slate-300'}`}
                placeholder="Digite o preço"
                value={price}
                required
              />
              {priceError && (
                <div
                  style={{
                    color: 'red',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: -15,
                  }}
                >
                  {priceError}
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex justify-end mt-3">
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
