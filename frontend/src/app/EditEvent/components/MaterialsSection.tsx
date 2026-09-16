'use client'

import { ChevronDown, LucideTrash2, PlusCircleIcon } from 'lucide-react'
import { Button, Input, Table } from 'antd'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MaterialCategory, MaterialType } from '@/app/CreateEvent/utils'
import { EditEventMaterial } from '../types/editEventTypes'

type MaterialsSectionProps = {
  selectedCategory: string
  onSelectCategory: (categoryName: string, category: number) => void

  selectedMaterial: string
  sMaterials: MaterialType[]
  onSelectMaterial: (id: string, name: string, index: number, price: number) => void

  materialQnt: string
  onMaterialQntChange: (e: React.ChangeEvent<HTMLInputElement>) => void

  onAddMaterial: (event: React.FormEvent) => void

  materials: EditEventMaterial[]
  onRemoveMaterial: (index: number) => void

  totalAmountConverted: string

  onUpdate: () => void
}

export default function MaterialsSection({
  selectedCategory,
  onSelectCategory,
  selectedMaterial,
  sMaterials,
  onSelectMaterial,
  materialQnt,
  onMaterialQntChange,
  onAddMaterial,
  materials,
  onRemoveMaterial,
  totalAmountConverted,
  onUpdate,
}: MaterialsSectionProps) {
  const materialColumns = [
    {
      title: 'Nome',
      dataIndex: 'materialName',
      key: 'materialName',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Preço',
      dataIndex: 'materialPrice',
      key: 'materialPrice',
    },
    {
      title: '',
      key: 'action',
      render: (record: any, index: number) => (
        <LucideTrash2
          onClick={() => onRemoveMaterial(index)}
          className="h-5 w-5 inline-block text-primary ml-2 cursor-pointer"
        />
      ),
    },
  ]

  return (
    <div>
      <h1 className="w-full p-4 mt-6 rounded-xl bg-cyan-900 text-white text-2xl font-bold text-center">
        Materiais
      </h1>

      <div className="flex flex-col justify-around mx-auto my-10">
        <div className="flex flex-col xl:flex-row">
          <div className="flex flex-col ">
            <h1 className="font-bold block mb-2">Categoria</h1>
            <DropdownMenu>
              <DropdownMenuTrigger className="border border-gray-300 h-[50px] w-full sm:w-[300px] bg-white rounded-xl flex items-center justify-between px-4 font-bold">
                <span>{selectedCategory || 'Selecione uma Categoria'}</span>
                <ChevronDown className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl w-full max-h-48 overflow-y-auto">
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
          <div className="flex flex-col flex-grow">
            <h1 className="font-bold block mb-2 xl:ml-10">Material</h1>
            <DropdownMenu>
              <DropdownMenuTrigger className="border border-gray-300 h-[50px] w-full sm:w-[300px] xl:mx-10 bg-white rounded-xl flex items-center justify-between px-4 font-bold">
                <span>{selectedMaterial || 'Selecione um Material'}</span>
                <ChevronDown className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl w-full max-h-48 overflow-y-auto">
                {sMaterials.map((material, index) => (
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
          <div className="flex flex-col flex-grow">
            <h1 className="font-bold block mb-2">Quantidade</h1>
            <Input
              value={materialQnt}
              onChange={onMaterialQntChange}
              placeholder="Quantidade"
              className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px]  w-32"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <Button
              onClick={onAddMaterial}
              className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[120px] mt-8"
            >
              <PlusCircleIcon className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Table
          scroll={{ y: 200 }}
          dataSource={materials}
          columns={materialColumns}
          pagination={false}
          rowKey="key"
        />
        <div className="bg-tertiary p-4  mt-4 rounded-xl flex justify-between">
          <span className="font-bold">Valor final</span>
          <span className="font-bold">{totalAmountConverted}</span>
        </div>
      </div>

      <div className="flex mt-4">
        <Button onClick={onUpdate}>Atualizar</Button>
      </div>
    </div>
  )
}
