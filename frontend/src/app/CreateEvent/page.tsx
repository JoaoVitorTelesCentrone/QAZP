'use client'
import React, { useState, useEffect } from 'react'
import UserSideMenu from '../components/UserHeader'
import axios from 'axios'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LucideTrash2, PlusCircleIcon, Trash2Icon } from 'lucide-react'
import { materialProps } from '../Materials/page'
import DeleteModal from '../components/DeleteModal'
import { Table } from 'antd'
import {
  ClientProps,
  MaterialCategory,
  MaterialType,
  insertMaterialProps,
  insertedColumns,
} from './utils'
import { ColumnDef } from '@tanstack/react-table'
import { ScrollArea } from '@/components/ui/scroll-area'

const CreateEvent = () => {
  const [clients, setClients] = useState<ClientProps[]>([])
  const [clientEmail, setCLientEmail] = useState('')
  const [clientDocument, setCLientDocument] = useState('')
  const [clientName, setCLientName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [selectedMaterialIndex, setSelectedMaterialIndex] = useState(0)
  const [selectedMaterialPrice, setSelectedMaterialPrice] = useState(0)
  const [materialQnt, setMaterialQnt] = useState(0)
  const [materials, setMaterials] = useState<MaterialType[]>([])
  const [insertedMaterial, setInsertedMaterial] = useState<
    insertMaterialProps[]
  >([])
  const [deleteModal, setDeleteModal] = useState(false)

  const getClients = async () => {
    try {
      const response = await axios.get('http://localhost:5196/api/Client')
      console.log(response.data)
      const clientNames = response.data.map((client: any) => ({
        name: client.fullName,
        documentId: client.documentId,
        id: client.id,
        email: client.email,
      }))

      setClients(clientNames)
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }

  const getMaterialsByCategory = async (
    categoryName: string,
    category: number,
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:5196/api/Material/category/${category}`,
      )
      console.log(response.data)
      const materials = response.data.map((material: any) => ({
        name: material.name,
        id: material.id,
        price: material.value,
      }))
      setMaterials(materials)
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
    setSelectedCategory(categoryName)
  }

  useEffect(() => {
    getClients()
  }, [])

  const getCLienInputValues = (
    email: string,
    documentId: string,
    name: string,
    index: number,
  ) => {
    setCLientEmail(email)
    setCLientDocument(documentId)
    setCLientName(name)
  }

  const getMaterialValues = (name: string, index: number, price: number) => {
    setSelectedMaterial(name)
    setSelectedMaterialIndex(index)
    setSelectedMaterialPrice(price)
  }

  const insertMaterial = (
    event: React.FormEvent,
    materialName: string,
    quantity: number,
    index: number,
    price: number,
  ) => {
    event.preventDefault()
    const newMaterialInsert: insertMaterialProps = {
      name: materialName,
      quantity,
      key: index.toString(),
      price,
    }
    setInsertedMaterial(prevMaterials => [...prevMaterials, newMaterialInsert])
    setCLientName('')
    setMaterialQnt(0)
    setSelectedCategory('')
    setSelectedMaterial('')
  }

  const removeMaterial = (index: number) => {
    const newInsertedMaterial = [...insertedMaterial]
    newInsertedMaterial.splice(index, 1)
    setInsertedMaterial(newInsertedMaterial)
  }

  const totalAmount = insertedMaterial.reduce(
    (sum, material) => sum + material.price * material.quantity,
    0,
  )

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
      render: (record: any, index: number) => (
        <LucideTrash2
          onClick={() => removeMaterial(index)}
          className="h-5 w-5 inline-block text-primary ml-2  cursor-pointer"
        />
      ),
    },
  ]

  return (
    <div>
      <UserSideMenu />
      <div className="h-full bg-primary">
        <h1 className="text-4xl font-bold mx-32 py-8 text-center text-tertiary">
          Criar evento
        </h1>
        <form
          action=""
          className="flex flex-col  w-[1200px] rounded-xl bg-opacity-30 bg-slate-400 p-16 mx-auto"
        >
          <h1 className="font-bold text-2xl ">Informações do cliente</h1>
          <div className="flex justify-around my-4 w-full">
            <DropdownMenu>
              <DropdownMenuTrigger className="border-[0.2px] w-[400px] h-[50px] mt-5 bg-white rounded-xl mr-4 font-bold">
                {clientName ? clientName : 'Selecione um cliente'}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white p-2 border-2 rounded-xl w-[280px] overflow-y-auto h-[120px] ">
                {clients.map((client, index) => (
                  <>
                    <DropdownMenuItem
                      onClick={() =>
                        getCLienInputValues(
                          client.email,
                          client.documentId,
                          client.name,
                          index,
                        )
                      }
                      key={index}
                    >
                      {client.name}
                    </DropdownMenuItem>
                    <hr className="h-2" />
                  </>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex  w-full">
              <div className="mx-10">
                <h1 className="p-1 font-bold">Email</h1>
                <h1 className=" text-white text-center font-bold  h-[33px] rounded-xl">
                  {clientEmail}
                </h1>
              </div>

              <div className="mx-10">
                <h1 className="p-1 font-bold">Documento</h1>
                <h1 className=" text-white font-bold text-center  h-[33px] rounded-xl">
                  {clientDocument}
                </h1>
              </div>
            </div>
          </div>
          <h1 className="font-bold text-2xl my-1">Informações do Evento</h1>
          <div className="my-4 flex flex-col justify-around">
            <div className="flex mb-4 justify-around">
              <Input
                className="bg-white text-black mx-2"
                placeholder="Digite o Estado"
              />
              <Input
                className="bg-white text-black mx-2"
                placeholder="Digite a Cidade"
              />
              <Input
                className="bg-white text-black mx-2"
                placeholder="Digite a Rua"
              />
            </div>
            <Input
              className="bg-white text-black mx-2 w-full"
              placeholder="Digite a Audiência estimada"
            />
          </div>
          <h1 className="font-bold text-xl my-1">Selecione os Materiais</h1>
          <div className="flex my-4">
            <div className="flex justify-around w-full">
              <DropdownMenu>
                <DropdownMenuTrigger className="border-[0.2px] h-[50px] mt-4 mx-2 w-[30%] bg-white rounded-xl mr-4 font-bold">
                  {selectedCategory ? selectedCategory : 'Categorias'}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white p-2 h-[120px] overflow-y-auto border-2 rounded-xl w-[300px] ">
                  {MaterialCategory.map((category, index) => (
                    <>
                      <DropdownMenuItem
                        onClick={() =>
                          getMaterialsByCategory(category.name, index)
                        }
                        key={index}
                      >
                        {category.name}
                      </DropdownMenuItem>
                      <hr className="h-2" />
                    </>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="border-[0.2px] mb-2 h-[50px] mt-4 mx-2 w-[40%] bg-white rounded-xl mr-4 font-bold">
                  {selectedMaterial ? selectedMaterial : 'Materiais'}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white h-[120px] w-[400px] overflow-y-auto p-2 border-2 rounded-xl  ">
                  {materials.map((material, index) => (
                    <div key={index}>
                      <DropdownMenuItem
                        onClick={() =>
                          getMaterialValues(
                            material.name,
                            index,
                            material.price,
                          )
                        }
                        key={index}
                      >
                        {material.name}
                      </DropdownMenuItem>
                      <hr className="h-2" />
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                value={materialQnt}
                onChange={e => setMaterialQnt(e.target.valueAsNumber)}
                type="number"
                className="bg-white w-[20%] h-[50px] rounded-xl mt-4 mx-2"
                placeholder="Quantidade"
              />
              <Button
                onClick={e =>
                  insertMaterial(
                    e,
                    selectedMaterial,
                    materialQnt,
                    selectedMaterialIndex,
                    selectedMaterialPrice,
                  )
                }
                className="w-[10%] mx-2 mt-4 h-[50px] rounded-full bg-white"
              >
                <PlusCircleIcon className="h-8 w-8" />
              </Button>
            </div>
          </div>
          <div className="py-8">
            <h1 className="p-2 font-bold text-3xl mx-10 py-7 text-center text-tertiary">
              Informações do seu evento
            </h1>
            <Table
              scroll={{ y: 200 }}
              dataSource={insertedMaterial}
              columns={columns}
              pagination={false}
              rowKey="key"
            />
            <div className="bg-tertiary my-2 p-4 rounded-xl flex justify-between">
              <span className="font-bold">Valor final</span>
              <span className="font-bold">{totalAmount}</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent
