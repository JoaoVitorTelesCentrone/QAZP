'use client'

import { ChevronDown, LucideTrash2, PlusCircleIcon } from 'lucide-react'
import { Button, Input, Table } from 'antd'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MaterialCategory } from '../constants/materialCategory'
import { MaterialType, insertMaterialProps } from '../types/createEventTypes'

type MaterialsSectionProps = {
  selectedCategory: string
  onSelectCategory: (categoryName: string, category: number) => void

  selectedMaterial: string
  materials: MaterialType[]
  onSelectMaterial: (id: string, name: string, index: number, price: number) => void

  materialQnt: string
  onMaterialQntChange: (e: React.ChangeEvent<HTMLInputElement>) => void

  onAddMaterial: (event: React.FormEvent) => void

  insertedMaterial: insertMaterialProps[]
  onRemoveMaterial: (index: number) => void

  totalAmountConverted: string

  onSubmit: (event: React.FormEvent) => void
}

export default function MaterialsSection({
  selectedCategory,
  onSelectCategory,
  selectedMaterial,
  materials,
  onSelectMaterial,
  materialQnt,
  onMaterialQntChange,
  onAddMaterial,
  insertedMaterial,
  onRemoveMaterial,
  totalAmountConverted,
  onSubmit,
}: MaterialsSectionProps) {
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '',
      key: 'action',
      render: (_value: unknown, _record: insertMaterialProps, index: number) => (
        <LucideTrash2
          onClick={() => onRemoveMaterial(index)}
          className="h-5 w-5 inline-block text-primary ml-2 cursor-pointer"
        />
      ),
    },
  ]

  return (
    <>
      <h1 className="w-full p-4 mt-6 rounded-xl bg-cyan-900 text-white text-2xl font-bold text-center">
        Materiais
      </h1>
      <div className="flex flex-col gap-4">
        <div className="flex space-y-4 xl:w-full">
          <div className="flex flex-col sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[400px] mt-4 sm:mr-2 md:mr-4 lg:mr-6 xl:mr-12 2xl:w-[500px] 2xl:mr-16">
            <h1 className="font-bold">Categoria</h1>
            <DropdownMenu>
              <DropdownMenuTrigger className="border border-gray-300 h-[40px]  bg-white rounded-xl flex items-center justify-between px-4 font-bold">
                <span>{selectedCategory || 'Categoria'}</span>
                <ChevronDown className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-300 rounded w-72 xl:w-96 max-h-48 overflow-y-auto">
                {MaterialCategory.map((category, index) => (
                  <div key={index}>
                    <DropdownMenuItem
                      onClick={() => onSelectCategory(category.name, index)}
                    >
                      {category.name}
                    </DropdownMenuItem>
                    <hr className="my-1 border-gray-300" />
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[400px] sm:mr-2 md:mr-4 lg:mr-6 xl:mr-12 2xl:w-[500px] 2xl:mr-16">
            <h1 className="font-bold">Material</h1>
            <DropdownMenu>
              <DropdownMenuTrigger className="border border-gray-300 h-[40px] bg-white rounded-xl flex items-center justify-between px-4 font-bold">
                <span>{selectedMaterial || 'Material'}</span>
                <ChevronDown className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-300 rounded w-96 max-h-48 overflow-y-auto">
                {materials.map((material, index) => (
                  <div key={index}>
                    <DropdownMenuItem
                      onClick={() =>
                        onSelectMaterial(material.id, material.name, index, material.price)
                      }
                    >
                      {material.name}
                    </DropdownMenuItem>
                    <hr className="my-1 border-gray-300" />
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col xl:w-56 xl:mx-10 w-36 sm:mr-2 md:mr-4 lg:mr-6 xl:mr-12 2xl:w-[200px] 2xl:mr-16">
            <h1 className="font-bold ">Quantidade</h1>
            <Input
              value={materialQnt}
              onChange={onMaterialQntChange}
              placeholder="Quantidade"
              className="bg-white text-gray-600 border border-gray-300 rounded h-[40px] w-36 xl:w-56 "
            />
          </div>
          <div className="flex flex-col">
            <Button
              onClick={onAddMaterial}
              className="bg-white text-gray-600 border border-gray-300 rounded h-[40px] mt-6 xl:w-24"
            >
              <PlusCircleIcon className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-4 mr-6">
        <h1 className="text-3xl font-bold text-primary">Relação de Materiais</h1>
        <Table
          scroll={{ y: 200 }}
          dataSource={insertedMaterial}
          columns={columns}
          pagination={false}
          rowKey="key"
        />
        <div className="bg-tertiary p-4 rounded flex justify-between">
          <span className="font-bold">Valor final</span>
          <span className="font-bold">{totalAmountConverted}</span>
        </div>
      </div>
      <div className="flex justify-end mt-3 mr-6">
        <Button
          onClick={onSubmit}
          className="bg-primary mt-4 font-bold text-tertiary w-[20%]"
        >
          Criar evento
        </Button>
      </div>
    </>
  )
}
