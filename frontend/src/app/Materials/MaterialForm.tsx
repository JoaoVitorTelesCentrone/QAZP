'use client'
import { Input } from '@/components/ui/input'
import { intl } from '@/i18n'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { authAtom } from '../atoms/authAtom'
import { ChevronDown, SearchIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios, { isAxiosError } from 'axios'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MaterialCategory } from '../CreateEvent/utils'

interface MaterialFormProps {
  materialData: MaterialDataProps | undefined
  closeModal: () => void
}

interface MaterialDataProps {
  id: string | undefined
  name: string | undefined
  type: string | undefined
  category: string | undefined
  price: string | undefined
}

const MaterialForm: React.FC<MaterialFormProps> = ({
  materialData,
  closeModal,
}) => {
  const [name, setName] = useState(materialData?.name)
  const [type, seType] = useState(materialData?.type)
  const [category, setCategory] = useState(materialData?.category)
  const [price, setPrice] = useState(materialData?.price)

  const updateMaterial = async (updatedData: MaterialDataProps) => {
    try {
      console.log('Updating client with data:', updatedData)
      const response = await axios.put(
        `http://localhost:5196/api/Material/${materialData?.id}`,
        updatedData,
      )
      console.log('Update response:', response)
      toast.success('Cliente alterado com sucesso')
      closeModal()
    } catch (error) {
      if (isAxiosError(error)) {
        console.error('Error message:', error.message)
        if (error.response) {
          console.error('Response data:', error.response.data)
          console.error('Response status:', error.response.status)
          console.error('Response headers:', error.response.headers)
        }
      } else {
        console.error('Unexpected error:', error)
      }
      toast.error('Falha ao atualizar cliente')
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateMaterial({
      id: materialData?.id,
      name: name,
      type: type,
      category: category,
      price: price,
    })
  }

  useEffect(() => {
    if (materialData) {
      setName(materialData.name || '')
      setCategory(materialData.category)
      setPrice(materialData.price)
      seType(materialData.type)
    }
  }, [materialData])

  return (
    <div className="my-10">
      <div className="flex flex-col border-2 rounded-xl bg-primary bg-opacity-20 p-8 w-[600px] mx-auto justify-around">
        <div className="flex flex-col">
          <h1 className="mx-4">Digite o nome do material</h1>
          <Input
            onChange={e => setName(e.target.value)}
            placeholder="Nome"
            className="border-2  bg-white placeholder:text-primary mx-4 my-1 w-[90%]"
          />
        </div>
        <div className="flex w-full my-2 mx-4">
          <div className="flex flex-col w-[50%]">
            <h1 className="my-1">Categoria</h1>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex border-2 bg-white  justify-between px-6 py-1 rounded-xl mr-8">
                <h1 className="mt-1 mr-3">{type ? type : 'Categoria'}</h1>
                <ChevronDown className="h-4 w-4 mt-2" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="border-2 p-4 bg-white my-1 rounded-xl">
                {MaterialCategory.map((category, index) => (
                  <>
                    <DropdownMenuItem
                      className="cursor-pointer my-1"
                      key={index}
                    >
                      {category.name}
                    </DropdownMenuItem>
                    <hr className="bg-primary h-[0.4px]" />
                  </>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w[50%]">
            <h1 className="my-1">Digite o preço</h1>
            <Input
              type="number"
              placeholder="Digite o preço"
              className="border-2  bg-white placeholder:text-primary"
            />
          </div>
        </div>
        <Button
          onClick={() => console.log()}
          className="text-white w-[120px] my-4 ml-96 p-2"
        >
          Criar material
        </Button>
      </div>
    </div>
  )
}

export default MaterialForm
