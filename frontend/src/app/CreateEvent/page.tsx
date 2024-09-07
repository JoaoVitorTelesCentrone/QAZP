'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronDown, LucideTrash2, PlusCircleIcon } from 'lucide-react'
import { DatePicker, TimePicker, message, Table } from 'antd'
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
import UserSideMenu from '../components/UserHeader'

type Mats = {
  materialId: string
  quantity: number
}

const CreateEvent = () => {
  const [startDate, setStartDate] = useState('')
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
  const [clientEmail, setClientEmail] = useState('')
  const [clientDocument, setClientDocument] = useState('')
  const [clientName, setClientName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [selectedMaterialId, setSelectedMaterialId] = useState('')
  const [selectedMaterialIndex, setSelectedMaterialIndex] = useState(0)
  const [selectedMaterialPrice, setSelectedMaterialPrice] = useState(0)
  const [materialQnt, setMaterialQnt] = useState(0)
  const [materials, setMaterials] = useState<MaterialType[]>([])
  const [insertedMaterial, setInsertedMaterial] = useState<insertMaterialProps[]>([])
  const [materialIdAndQuantity, setMaterialIdAndQuantity] = useState<Mats[]>([])
  const [totalAmount, setTotalAmount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5196/api/Client')
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
    fetchClients()
  }, [])

  useEffect(() => {
    const newTotalAmount = insertedMaterial.reduce(
      (sum, material) => sum + material.price * material.quantity,
      0,
    )
    setTotalAmount(newTotalAmount)
  }, [insertedMaterial])

  const handleDateChange = (
    date: any,
    setDate: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (date) {
      const formattedDate = date.format('YYYY-MM-DD')
      setDate(formattedDate)
    } else {
      setDate('')
    }
  }

  const handleTimeChange = (
    time: any,
    setTime: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (time) {
      const formattedTime = time.format('HH:mm:ss')
      setTime(formattedTime)
    } else {
      setTime('')
    }
  }

  const getMaterialsByCategory = async (categoryName: string, category: number) => {
    try {
      const response = await axios.get(`http://localhost:5196/api/Material/category/${category}`)
      const materials = response.data.map((material: any) => ({
        name: material.name,
        id: material.id,
        price: material.price,
      }))
      setMaterials(materials)
      setSelectedCategory(categoryName)
    } catch (error) {
      console.error('Error fetching materials:', error)
    }
  }

  const getClientValues = (
    email: string,
    documentId: string,
    name: string,
    id: string,
    index: number,
  ) => {
    setClientId(id)
    setClientEmail(email)
    setClientDocument(documentId)
    setClientName(name)
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

    const newMaterialInsertPost: Mats = {
      materialId: materialId,
      quantity: quantity,
    }
    setInsertedMaterial(prevMaterials => [...prevMaterials, newMaterialInsert])
    setMaterialIdAndQuantity(prevMaterials => [...prevMaterials, newMaterialInsertPost])
    setMaterialQnt(0)
    setSelectedCategory('')
    setSelectedMaterial('')
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
          className="h-5 w-5 inline-block text-primary ml-2 cursor-pointer"
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
      message.success('Evento criado com sucesso')
      router.push('/Events')
    } catch (error) {
      console.error('Error creating event:', error)
    }
  }

  return (
    <div className="h-full bg-primary">
      <UserSideMenu />
      <div className="h-full bg-primary">
        <h1 className="text-4xl font-bold mx-32 py-8 text-center text-tertiary">Criar evento</h1>
        <form className="flex flex-col w-[1200px] rounded-xl bg-opacity-30 bg-slate-400 p-16 mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="font-bold text-2xl">Informações do cliente</h1>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col flex-grow">
                <label htmlFor="clientName" className="font-bold text-black mb-2">Nome do Cliente</label>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center border border-gray-300 h-[50px] bg-white rounded-xl px-4 text-black font-bold">
                    <span className="flex-grow">{clientName || 'Selecionar cliente'}</span>
                    <ChevronDown className="h-6 w-6 ml-2 text-black" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl w-full max-h-48 overflow-y-auto">
                    {clients.map((client, index) => (
                      <div key={index}>
                        <DropdownMenuItem
                          onClick={() => getClientValues(client.email, client.documentId, client.name, client.id, index)}
                        >
                          {client.name}
                        </DropdownMenuItem>
                        <hr className="my-1 border-gray-300" />
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex flex-col flex-grow">
                <label htmlFor="email" className="font-bold text-black mb-2">Email</label>
                <Input
                  id="email"
                  value={clientEmail}
                  readOnly
                  className="bg-gray-100 text-gray-600 border border-gray-300 rounded-xl h-[50px]"
                />
              </div>

              <div className="flex flex-col flex-grow">
                <label htmlFor="document" className="font-bold text-black mb-2">Documento</label>
                <Input
                  id="document"
                  value={clientDocument}
                  readOnly
                  className="bg-gray-100 text-gray-600 border border-gray-300 rounded-xl h-[50px]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="font-bold text-2xl">Informações do Evento</h1>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <label className="font-bold block mb-2">Data do evento</label>
                <DatePicker
                  onChange={date => handleDateChange(date, setStartDate)}
                  format="YYYY/MM/DD"
                  size="large"
                  className="w-full"
                />
              </div>

              <div className="flex-1">
                <label className="font-bold block mb-2">Fim do evento</label>
                <DatePicker
                  onChange={date => handleDateChange(date, setEndDate)}
                  format="YYYY/MM/DD"
                  size="large"
                  className="w-full"
                />
              </div>

              <div className="flex-1">
                <label className="font-bold block mb-2">Início do evento</label>
                <TimePicker
                  onChange={time => handleTimeChange(time, setStartTime)}
                  format="HH:mm:ss"
                  size="large"
                  className="w-full"
                />
              </div>

              <div className="flex-1">
                <label className="font-bold block mb-2">Fim do evento</label>
                <TimePicker
                  onChange={time => handleTimeChange(time, setEndTime)}
                  format="HH:mm:ss"
                  size="large"
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 my-4">
              <Input
                value={zipCode}
                onChange={e => setZipCode(e.target.value)}
                placeholder="Digite o CEP"
                className="bg-white text-black w-full sm:w-[300px]"
              />
              <Input
                value={state}
                onChange={e => setState(e.target.value)}
                placeholder="Digite o Estado"
                className="bg-white text-black w-full sm:w-[300px]"
              />
              <Input
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Digite a Cidade"
                className="bg-white text-black w-full sm:w-[300px]"
              />
            </div>

            <div className="flex flex-wrap gap-4 my-4">
              <Input
                value={addressName}
                onChange={e => setAddressName(e.target.value)}
                placeholder="Digite a Rua"
                className="bg-white text-black w-full sm:w-[300px]"
              />
              <Input
                value={addressNumber}
                onChange={e => setAddressNumber(e.target.value)}
                placeholder="Digite o número"
                className="bg-white text-black w-full sm:w-[300px]"
              />
              <Input
                value={addressComplement}
                onChange={e => setAddressComplement(e.target.value)}
                placeholder="Digite o complemento"
                className="bg-white text-black w-full sm:w-[300px]"
              />
            </div>

            <Input
              value={estimatedAudience}
              onChange={e => setEstimatedAudience(e.target.value)}
              placeholder="Digite a Audiência estimada"
              className="bg-white text-black w-full"
            />
          </div>

          <div className="space-y-4">
            <h1 className="font-bold text-xl">Selecione os Materiais</h1>
            <div className="flex flex-wrap gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="border border-gray-300 h-[50px] w-full sm:w-[300px] bg-white rounded-xl flex items-center justify-between px-4 font-bold">
                  <span>{selectedCategory || 'Categorias'}</span>
                  <ChevronDown className="h-6 w-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl w-full max-h-48 overflow-y-auto">
                  {MaterialCategory.map((category, index) => (
                    <div key={index}>
                      <DropdownMenuItem
                        onClick={() => getMaterialsByCategory(category.name, index)}
                      >
                        {category.name}
                      </DropdownMenuItem>
                      <hr className="my-1 border-gray-300" />
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="border border-gray-300 h-[50px] w-full sm:w-[400px] bg-white rounded-xl flex items-center justify-between px-4 font-bold">
                  <span>{selectedMaterial || 'Materiais'}</span>
                  <ChevronDown className="h-6 w-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl w-full max-h-48 overflow-y-auto">
                  {materials.map((material, index) => (
                    <div key={index}>
                      <DropdownMenuItem
                        onClick={() => getMaterialValues(material.id, material.name, index, material.price)}
                      >
                        {material.name}
                      </DropdownMenuItem>
                      <hr className="my-1 border-gray-300" />
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Input
                value={materialQnt}
                onChange={e => setMaterialQnt(e.target.valueAsNumber)}
                type="number"
                placeholder="Quantidade"
                className="bg-white w-full sm:w-[150px] h-[50px] rounded-xl"
              />
              <Button
                onClick={e =>
                  insertMaterial(e, selectedMaterial, selectedMaterialId, materialQnt, selectedMaterialIndex, selectedMaterialPrice)
                }
                className="bg-white rounded-full w-full sm:w-[150px] h-[50px]"
              >
                <PlusCircleIcon className="h-8 w-8" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-center text-tertiary">Informações do seu evento</h1>
            <Table
              scroll={{ y: 200 }}
              dataSource={insertedMaterial}
              columns={columns}
              pagination={false}
              rowKey="key"
            />
            <div className="bg-tertiary p-4 rounded-xl flex justify-between">
              <span className="font-bold">Valor final</span>
              <span className="font-bold">{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <Button onClick={postEvent} className="w-full mt-4">Criar evento</Button>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent
