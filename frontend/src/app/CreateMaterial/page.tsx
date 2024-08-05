'use client'
import React, { useState } from 'react'
import UserSideMenu from '../components/UserHeader'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { ArrowBigLeft, ArrowDown, ArrowLeft, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Toaster, toast } from 'sonner'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import Link from 'next/link'

type MaterialCategoryProps = {
  name: string
  index: number
}

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

const CreateMaterial = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [type, setType] = useState('')
  const [category, setCategory] = useState(0)

  const createMaterialRequest = async () => {
    const data = {
      name: name,
      category: category,
      value: price,
      isActive: true,
    }
    console.log(data)
    try {
      const response = await axios.post(
        'http://localhost:5196/api/Material',
        data,
      )
      console.log(response.status)
      if (response.status === 201) {
        console.log(response.data)
        console.log(data)
        toast.success('Material criado')
        redirect('/Materials')
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
      <UserSideMenu />
      <Toaster richColors />
      <Link href="/Materials">
        <ArrowLeft className="my-12 mx-24" />
      </Link>

      <h1 className="font-bold text-5xl text-center my-10">Criar material</h1>

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
                      onClick={() =>
                        getCategoryNameAndIndex(category.name, category.index)
                      }
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
              onChange={e => setPrice(e.target.valueAsNumber)}
              placeholder="Digite o preço"
              className="border-2  bg-white placeholder:text-primary"
            />
          </div>
        </div>
        <Button
          onClick={() => createMaterialRequest()}
          className="text-white w-[120px] my-4 ml-96 p-2"
        >
          Criar material
        </Button>
      </div>
    </div>
  )
}

export default CreateMaterial
