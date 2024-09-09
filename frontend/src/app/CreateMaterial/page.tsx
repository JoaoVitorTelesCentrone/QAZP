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

    try {
      const response = await axios.post(
        'http://localhost:5196/api/Material',
        data,
      )
      if (response.status === 201) {
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
    <div className="bg-tertiary h-screen">
      <div className="flex flex-col bg-tertiary max-h-screen">
        <UserSideMenu />
        <Toaster richColors />
        <h1 className="font-monospace font-semibold ml-72 my-12 text-5xl text-center ">
          Criar material
        </h1>
        <div className="ml-72">
          <div className="mt-16 mb-4 flex-col flex mx-auto border-0 rounded-xl border-secondary-foreground shadow-lg shadow-slate-500 border-slate-200 bg-slate-900 bg-opacity-10 p-4 max-w-[500px]">
            <div>
              <div className="flex w-full justify-between">
                <div className="w-full">
                  <h1>Material</h1>
                  <Input
                    onChange={e => setName(e.target.value)}
                    placeholder="Digite o material"
                    className="p-4 border-slate-500 bg-white mb-4"
                  />
                </div>
              </div>
            </div>
            <div className="w-full justify-between flex">
              <div className="flex flex-col w-[50%]">
                <h1>Categoria</h1>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex border-2  border-slate-500 bg-white mb-4 justify-between px-6 py-1 rounded-xl">
                    <h1 className="mt-1 mr-3">{type ? type : 'Categoria'}</h1>
                    <ChevronDown className="h-4 w-4 mt-2" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="border-2 p-4 bg-white my-1 rounded-xl">
                    {MaterialCategory.map((category, index) => (
                      <>
                        <DropdownMenuItem
                          className="cursor-pointer my-1"
                          onClick={() =>
                            getCategoryNameAndIndex(
                              category.name,
                              category.index,
                            )
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
                <h1>Preço</h1>
                <Input
                  type="number"
                  onChange={e => setPrice(e.target.valueAsNumber)}
                  placeholder="Digite o preço"
                  className="p-4 border-slate-500 bg-white mb-4"
                />
              </div>
            </div>
            <Button
              onClick={() => createMaterialRequest()}
              className="text-white w-[210px] my-4 ml-64 p-2"
              variant="default"
            >
              Criar material
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateMaterial
