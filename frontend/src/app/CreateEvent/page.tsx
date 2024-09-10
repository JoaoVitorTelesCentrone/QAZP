'use client'
import React, { useState, useEffect, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronDown, LucideTrash2, PlusCircleIcon } from 'lucide-react'
import { DatePicker, TimePicker, message, Table } from 'antd'
import {
  ClientProps,
  EventType,
  MaterialCategory,
  MaterialType,
  insertMaterialProps,
} from './utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserSideMenu from '../components/UserHeader'
import { documentIdConverter, formatCurrency } from '@/functions/functions'
import { Toaster, toast } from 'sonner'

type Mats = {
  materialId: string
  quantity: number
}

const CreateEvent = () => {
  const [eventName, setEventName] = useState('')
  const [eventType, setEventType] = useState(0)
  const [selectedType, setSelectedType] = useState('')
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
  const [clientName, setClientName] = useState('')
  const [clientDocument, setClientDocument] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [selectedMaterialId, setSelectedMaterialId] = useState('')
  const [selectedMaterialIndex, setSelectedMaterialIndex] = useState(0)
  const [selectedMaterialPrice, setSelectedMaterialPrice] = useState(0)
  const [materialQnt, setMaterialQnt] = useState('')
  const [materials, setMaterials] = useState<MaterialType[]>([])
  const [insertedMaterial, setInsertedMaterial] = useState<
    insertMaterialProps[]
  >([])
  const [materialIdAndQuantity, setMaterialIdAndQuantity] = useState<Mats[]>([])
  const [totalAmount, setTotalAmount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5196/api/Client')
        const clientNames = response.data.map((client: any) => ({
          name: client.fullName,
          documentId: documentIdConverter(client.documentId),
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

  const getMaterialsByCategory = async (
    categoryName: string,
    category: number,
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:5196/api/Material/category/${category}`,
      )
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
    name: string,
    id: string,
    documentId: string,
    email: string,
  ) => {
    setClientId(id)
    setClientName(name)
    setClientDocument(documentId)
    setClientEmail(email)
  }

  const getEventTypeNameAndIndex = (
    eventType: SetStateAction<number>,
    stringEventType: string,
  ) => {
    setEventType(eventType)
    setSelectedType(stringEventType)
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
    setMaterialIdAndQuantity(prevMaterials => [
      ...prevMaterials,
      newMaterialInsertPost,
    ])
    setMaterialQnt('')
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

  const totalAmountConverted = formatCurrency(Number(totalAmount.toFixed(2)))

  const postEvent = async (event: React.FormEvent) => {
    event.preventDefault()
    const body = {
      name: eventName,
      type: eventType,
      clientId: clientId,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
      zipCode: zipCode,
      addressName: addressName,
      addressNumber: addressNumber,
      addressComplement: addressComplement,
      district: district,
      state: state,
      city: city,
      estimatedAudience: Number(estimatedAudience),
      materials: materialIdAndQuantity,
      totalAmount: totalAmount,
    }
    try {
      toast.success('Evento criado com sucesso')
      router.push('/Events')
    } catch (error) {
      toast.error('Erro ao criar evento')
      console.error('Error creating event:', error)
    }
  }

  return (
    <div className="h-full bg-primary">
      <UserSideMenu />
      <Toaster richColors />
      <div className="h-full bg-primary">
        <h1 className="text-4xl font-bold mx-32 py-8 text-center text-tertiary">
          Criar evento
        </h1>
        <form className="flex flex-col w-[1200px] rounded-xl bg-opacity-30 bg-slate-400 p-16 mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-left text-tertiary">
            Informações do Cliente
          </h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex flex-col flex-grow">
                <h1 className="font-bold block mb-2">Cliente</h1>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border border-gray-300 h-[50px] w-full sm:w-[300px] md:w-[400px] bg-white rounded-xl flex items-center justify-between px-4 font-bold">
                    <span>{clientName || 'Selecione um Cliente'}</span>
                    <ChevronDown className="h-6 w-6" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl w-full max-h-48 overflow-y-auto">
                    {clients.map((client, index) => (
                      <div key={index}>
                        <DropdownMenuItem
                          onClick={() =>
                            getClientValues(
                              client.name,
                              client.id,
                              client.documentId,
                              client.email,
                            )
                          }
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
                <label className="font-bold block mb-2">Documento</label>
                <Input
                  value={clientDocument}
                  onChange={e => setClientDocument(e.target.value)}
                  disabled={true}
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[230px]"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label className="font-bold block mb-2">Email</label>
                <Input
                  value={clientEmail}
                  onChange={e => setClientDocument(e.target.value)}
                  disabled={true}
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[380px]"
                />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-left text-tertiary">
            Informações do Evento
          </h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex flex-col flex-grow">
                  <label className="font-bold block mb-2">Tipo</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="border border-gray-300 h-[50px] w-full sm:w-[300px] md:w-[400px] bg-white rounded-xl flex items-center justify-between px-4 font-bold">
                      <span>{selectedType || 'Selecione um Tipo'}</span>
                      <ChevronDown className="h-6 w-6" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl w-full max-h-48 overflow-y-auto">
                      {EventType.map((eventType, index) => (
                        <div key={index}>
                          <DropdownMenuItem
                            className="cursor-pointer my-1"
                            onClick={() =>
                              getEventTypeNameAndIndex(
                                eventType.index,
                                eventType.name,
                              )
                            }
                            key={index}
                          >
                            {eventType.name}
                          </DropdownMenuItem>
                          <hr className="my-1 border-gray-300" />
                        </div>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex flex-col flex-grow">
                  <label className="font-bold block mb-2">Título</label>
                  <Input
                    value={eventName}
                    onChange={e => setEventName(e.target.value)}
                    placeholder="Digite o Título do evento"
                    className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[630px]"
                  />
                </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex flex-col flex-grow">
            <label className="font-bold block mb-2">CEP</label>
                <Input
                  value={zipCode}
                  onChange={e => setZipCode(e.target.value)}
                  placeholder="Digite o CEP"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[420px] md:w-[210px]"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label className="font-bold block mb-2">Endereço</label>
                <Input
                  value={addressName}
                  onChange={e => setAddressName(e.target.value)}
                  placeholder="Digite a Rua"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[420px] md:w-[340px]"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label className="font-bold block mb-2">Número</label>
                <Input
                  value={addressNumber}
                  onChange={e => setAddressNumber(e.target.value)}
                  placeholder="Número"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[420px] md:w-[100px]"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label className="font-bold block mb-2">Complemento</label>
                <Input
                  value={addressComplement}
                  onChange={e => setAddressComplement(e.target.value)}
                  placeholder="Digite o complemento"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[420px] md:w-[350px]"
                /> 
          </div>
          </div>
          </div>
          

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex flex-col flex-grow">
                <label className="font-bold block mb-2">Bairro</label>
                <Input
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  placeholder="Digite o bairro"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[420px] md:w-[315px]"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label className="font-bold block mb-2">Cidade</label>
                <Input
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="Digite a Cidade"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[420px] md:w-[315px]"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label className="font-bold block mb-2">Estado</label>
                <Input
                  value={state}
                  onChange={e => setState(e.target.value)}
                  placeholder="Digite o Estado"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[420px] md:w-[220px]"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label className="font-bold block mb-2">Público estimado</label>
                <Input
                  type="number"
                  value={estimatedAudience}
                  onChange={e => setEstimatedAudience(e.target.value)}
                  placeholder="Público estimado"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[420px] md:w-[150px]"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex flex-col">
                <label className="font-bold block mb-2">Data de ínicio</label>
                <DatePicker
                  onChange={date => handleDateChange(date, setStartDate)}
                  format="YYYY/MM/DD"
                  size="large"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[250px]"
                  placeholder="Selecione uma data"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold block mb-2">
                  Horário de ínicio
                </label>
                <TimePicker
                  onChange={time => handleTimeChange(time, setStartTime)}
                  format="HH:mm:ss"
                  size="large"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[250px]"
                  placeholder="Selecione um horário"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold block mb-2">
                  Data de finalização
                </label>
                <DatePicker
                  onChange={date => handleDateChange(date, setEndDate)}
                  format="YYYY/MM/DD"
                  size="large"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[250px]"
                  placeholder="Selecione uma data"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold block mb-2">
                  Horário de finalização
                </label>
                <TimePicker
                  onChange={time => handleTimeChange(time, setEndTime)}
                  format="HH:mm:ss"
                  size="large"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[250px]"
                  placeholder="Selecione um horário"
                />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-left text-tertiary">
            Selecione os Materiais
          </h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex flex-col flex-grow">
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
                          onClick={() =>
                            getMaterialsByCategory(category.name, index)
                          }
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
                <h1 className="font-bold block mb-2">Material</h1>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border border-gray-300 h-[50px] w-full sm:w-[400px] bg-white rounded-xl flex items-center justify-between px-4 font-bold">
                    <span>{selectedMaterial || 'Selecione um Material'}</span>
                    <ChevronDown className="h-6 w-6" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl w-full max-h-48 overflow-y-auto">
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
                        <hr className="my-1 border-gray-300" />
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-col flex-grow">
                <h1 className="font-bold block mb-2">Quantidade</h1>
                <Input
                  type="number"
                  value={materialQnt}
                  onChange={e => setMaterialQnt(e.target.value)}
                  placeholder="Quantidade"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[420px] md:w-[150px]"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <Button
                  onClick={e =>
                    insertMaterial(
                      e,
                      selectedMaterial,
                      selectedMaterialId,
                      Number(materialQnt),
                      selectedMaterialIndex,
                      selectedMaterialPrice,
                    )
                  }
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[120px] md:w-[155px]  mt-8"
                >
                  <PlusCircleIcon className="h-8 w-8" />
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-center text-tertiary">
              Relação de Materiais
            </h1>
            <Table
              scroll={{ y: 200 }}
              dataSource={insertedMaterial}
              columns={columns}
              pagination={false}
              rowKey="key"
            />
            <div className="bg-tertiary p-4 rounded-xl flex justify-between">
              <span className="font-bold">Valor final</span>
              <span className="font-bold">{totalAmountConverted}</span>
            </div>
          </div>

          <Button
            onClick={postEvent}
            className="bg-cyan-700 w-full mt-4 font-bold text-tertiary"
          >
            Criar evento
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent
