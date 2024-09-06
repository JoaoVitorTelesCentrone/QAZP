'use client'
import { Dayjs } from 'dayjs'
import React, { useState, useEffect } from 'react'
import UserSideMenu from '../components/UserHeader'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LucideTrash2, PlusCircleIcon, Trash2Icon } from 'lucide-react'
import { Calendar, DatePicker, message, Table, TimePicker } from 'antd'
import {
  ClientProps,
  MaterialCategory,
  MaterialType,
  insertMaterialProps,
  insertedColumns,
} from './utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { redirect } from 'next/navigation'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

type mats = {
  materialId: string
  quantity: number
}

const CreateEvent = () => {
  const [startDate, setStartDate] = useState('')
  const router = useRouter()
  const [startTime, setStartTime] = useState('')

  const [endDate, setEndDate] = useState('')

  const [endTime, setEndTime] = useState('')

  const [zipCode, setZipCode] = useState('')
  const [addressName, setAddressName] = useState('')
  const [addressNumber, setAddressNumber] = useState('')
  const [addressComplement, setAddressComplement] = useState('')
  const [district, setDistrict] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [estimatedAudience, setEstimatedAudience] = useState('')
  const [clients, setClients] = useState<ClientProps[]>([])
  const [clientId, setClientId] = useState('')
  const [clientEmail, setCLientEmail] = useState('')
  const [clientDocument, setCLientDocument] = useState('')
  const [clientName, setCLientName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [selectedMaterialId, setSelectedMaterialId] = useState('')
  const [selectedMaterialIndex, setSelectedMaterialIndex] = useState(0)
  const [selectedMaterialPrice, setSelectedMaterialPrice] = useState(0)
  const [materialQnt, setMaterialQnt] = useState(0)
  const [materials, setMaterials] = useState<MaterialType[]>([])
  const [insertedMaterial, setInsertedMaterial] = useState<
    insertMaterialProps[]
  >([])
  const [materialIdAndQuantity, setMaterialIdAndQuantity] = useState<mats[]>([])
  const [totalAmount, setTotalAmount] = useState(0)

  const handleDateChange = (
    date: Dayjs | null,
    setDate: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (date) {
      const formattedDate = `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${date.date().toString().padStart(2, '0')}`
      setDate(formattedDate)
    } else {
      setDate('')
    }
  }

  const handleTimeChange = (
    time: Dayjs | null,
    setTime: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (time) {
      const formattedTime = `${time.hour().toString().padStart(2, '0')}:${time.minute().toString().padStart(2, '0')}:${time.second().toString().padStart(2, '0')}`
      setTime(formattedTime)
    } else {
      setTime('')
    }
  }

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
        price: material.price,
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

  useEffect(() => {
    const newTotalAmount = insertedMaterial.reduce(
      (sum, material) => sum + material.price * material.quantity,
      0,
    )
    setTotalAmount(newTotalAmount)
  }, [insertedMaterial])

  const getCLienInputValues = (
    email: string,
    documentId: string,
    name: string,
    id: string,
    index: number,
  ) => {
    setClientId(id)
    setCLientEmail(email)
    setCLientDocument(documentId)
    setCLientName(name)
  }

  const getMaterialValues = (
    id: string,
    name: string,
    index: number,
    price: number,
  ) => {
    setSelectedMaterialId(id)
    setSelectedMaterial(name)
    setSelectedMaterialIndex(index)
    setSelectedMaterialPrice(price)
  }

  const insertMaterial = (
    event: React.FormEvent,
    materialName: string,
    materialId: string,
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

    const newMaterialInsertPost: mats = {
      materialId: materialId,
      quantity: quantity,
    }
    setInsertedMaterial(prevMaterials => [...prevMaterials, newMaterialInsert])
    setMaterialIdAndQuantity(prevMaterials => [
      ...prevMaterials,
      newMaterialInsertPost,
    ])
    setMaterialQnt(0)
    setSelectedCategory('')
    setSelectedMaterial('')
    console.log(materialIdAndQuantity)
  }

  const removeMaterial = (index: number) => {
    const newInsertedMaterial = [...insertedMaterial]
    newInsertedMaterial.splice(index, 1)
    setInsertedMaterial(newInsertedMaterial)
  }

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

  const postEvent = async (event: React.FormEvent) => {
    event.preventDefault()
    const body = {
      name: clientName || 'string',
      type: 0,
      clientId: clientId,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      zipCode: zipCode || 'string',
      addressName: addressName || 'string',
      addressNumber: addressNumber || 'string',
      addressComplement: addressComplement || 'string',
      district: district || 'string',
      state: state || 'string',
      city: city || 'string',
      estimatedAudience: parseInt(estimatedAudience, 10) || 0,
      materials: materialIdAndQuantity,
      totalAmount: totalAmount || 0,
    }
    try {
      const res = await axios.post('http://localhost:5196/api/Event', body)
      console.log(res.data)
      console.log(clientId, materialIdAndQuantity, body)
      message.success('Evento criado com sucesso')
      router.push('/Events')
    } catch (error) {
      console.error()
    }
    console.log(clientId, materialIdAndQuantity, body)
  }

  return (
    <div className="h-full bg-primary">
      <UserSideMenu />
      <div className="h-full bg-primary">
        <h1 className="text-4xl font-bold mx-32 py-8 text-center text-tertiary">
          Criar evento
        </h1>
        <form
          action=""
          className="flex flex-col w-[1200px] rounded-xl bg-opacity-30 bg-slate-400 p-16 mx-auto"
        >
          <h1 className="font-bold text-2xl ">Informações do cliente</h1>
          <div className="flex justify-around my-4 w-full">
            <DropdownMenu>
              <DropdownMenuTrigger className="border-[0.2px] w-[400px] h-[50px] mt-5 bg-white rounded-xl mr-4 font-bold">
                {clientName ? clientName : 'Selecione um cliente'}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white p-2 border-2 rounded-xl w-[280px] overflow-y-auto h-[120px] ">
                {clients.map((client, index) => (
                  <div key={index}>
                    <DropdownMenuItem
                      onClick={() =>
                        getCLienInputValues(
                          client.email,
                          client.documentId,
                          client.name,
                          client.id,
                          index,
                        )
                      }
                    >
                      {client.name}
                    </DropdownMenuItem>
                    <hr className="h-2" />
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex w-full">
              <div className="mx-10">
                <h1 className="p-1 font-bold">Email</h1>
                <div className="text-white text-center font-bold h-[33px] rounded-xl">
                  {clientEmail}
                </div>
              </div>

              <div className="mx-10">
                <h1 className="p-1 font-bold">Documento</h1>
                <div className="text-white font-bold text-center h-[33px] rounded-xl">
                  {clientDocument}
                </div>
              </div>
            </div>
          </div>

          <h1 className="font-bold text-2xl my-1">Informações do Evento</h1>
          <div className="my-4 flex flex-col justify-around">
            <div className="my-10 flex justify-around">
              <div>
                <h1 className="font-bold">Data do evento</h1>
                <DatePicker
                  onChange={date => handleDateChange(date, setStartDate)}
                  format="YYYY/MM/DD"
                  size="large"
                />
              </div>

              <div>
                <h1 className="font-bold">Fim do evento</h1>
                <DatePicker
                  onChange={date => handleDateChange(date, setEndDate)}
                  format="YYYY/MM/DD"
                  size="large"
                />
              </div>
              <div>
                <h1 className="font-bold">Início do evento</h1>
                <TimePicker
                  onChange={date => handleTimeChange(date, setStartTime)}
                  format="HH:mm:ss"
                  needConfirm={false}
                  size="large"
                />
              </div>
              <div>
                <h1 className="font-bold">Fim do evento</h1>
                <TimePicker
                  onChange={date => handleTimeChange(date, setEndTime)}
                  format="HH:mm:ss"
                  needConfirm={false}
                  size="large"
                />
              </div>
            </div>
            <div className="flex mb-4 justify-around">
              <Input
                className="bg-white text-black mx-2"
                placeholder="Digite o CEP"
              />
              <Input
                className="bg-white text-black mx-2"
                placeholder="Digite o Estado"
                onChange={e => setDistrict(e.target.value)}
              />
              <Input
                className="bg-white text-black mx-2"
                placeholder="Digite a Cidade"
                onChange={e => setCity(e.target.value)}
              />
            </div>
            <div className="flex mb-4 justify-around">
              <Input
                className="bg-white text-black mx-2"
                placeholder="Digite a Rua"
                onChange={e => setAddressName(e.target.value)}
              />
              <Input
                className="bg-white text-black mx-2"
                placeholder="Digite o número"
                onChange={e => setAddressNumber(e.target.value)}
              />
              <Input
                className="bg-white text-black mx-2"
                placeholder="Digite o complemento"
                onChange={e => setAddressComplement(e.target.value)}
              />
            </div>
            <Input
              className="bg-white text-black mx-2 w-full"
              placeholder="Digite a Audiência estimada"
              onChange={e => setEstimatedAudience(e.target.value)}
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
                    <div key={index}>
                      <DropdownMenuItem
                        onClick={() =>
                          getMaterialsByCategory(category.name, index)
                        }
                      >
                        {category.name}
                      </DropdownMenuItem>
                      <hr className="h-2" />
                    </div>
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
                            material.id,
                            material.name,
                            index,
                            material.price,
                          )
                        }
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
                    selectedMaterialId,
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
          <Button onClick={e => postEvent(e)}>Criar evento</Button>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent
