'use client'
import React, { useState, useEffect, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Input } from 'antd'
import {
  ChevronDown,
  LucideTrash2,
  PlusCircleIcon,
  SearchIcon,
} from 'lucide-react'
import { Button, DatePicker, TimePicker, message, Table } from 'antd'
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
import { atom, useAtom } from 'jotai'

import withAuth from '../hoc/withAuth'

type Mats = {
  materialId: string
  quantity: number
}

export const clientsAtom = atom<ClientProps[]>([])

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
  const [clients, setClients] = useAtom(clientsAtom)
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

  const handleSearchClick: React.MouseEventHandler<
    SVGSVGElement
  > = async event => {
    try {
      event.preventDefault()
      const response = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json/`,
      )

      const cepData = response.data
      setAddressName(cepData.logradouro)
      setDistrict(cepData.bairro)
      setCity(cepData.localidade)
      setState(cepData.uf)
    } catch (error) {
      console.error('Erro ao buscar o CEP:', error)
    }
  }

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
      await axios.post('http://localhost:5196/api/Event', body)
      toast.success('Evento criado com sucesso')
      router.push('/Events')
    } catch (error) {
      toast.error('Erro ao criar evento')
      console.error('Error creating event:', error)
    }
  }

  return (
    <div className="h-full bg-tertiary">
      <UserSideMenu />
      <Toaster richColors />
      <div className="h-full bg-tertiary">
        <form className="flex flex-col rounded-xl  bg-gray-300 p-6 mr-10 mt-10 mx-auto ml-64 space-y-4">
          <h1 className="text-3xl font-bold text-left text-primary">
            Criar evento
          </h1>
          <h1 className="text-2xl font-bold text-left text-primary">
            Informações do Evento
          </h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex space-y-4 sm:space-y-0 sm:space-x-6 mr-7">
              <div className="flex flex-col xl:w-72">
                <label className="font-bold block mb-2">Tipo</label>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border border-gray-300 h-[40px] bg-white rounded-xl flex items-center justify-between px-4 font-bold">
                    <span>{selectedType || 'Selecione um Tipo'}</span>
                    <ChevronDown className="h-6 w-6" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl w-60 max-h-48 overflow-y-auto">
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
              <div className="flex flex-col xl:w-[300px]">
                <label className="font-bold block mb-2">Título</label>
                <Input
                  value={eventName}
                  onChange={setEventName}
                  placeholder="Digite o Título do evento"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[40px] sm:w-[400px] md:w-[800px]"
                  required
                />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-left text-primary">
            Informações do cliente
          </h1>
          <div className="flex flex-col">
            <div className="flex Xl:w-full  space-y-4 ">
              <div className="flex flex-col xl:w-[30%] xl:mr-2 mt-4 ">
                <h1 className="font-bold block mb-2">Cliente</h1>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border border-gray-300 h-[40px] bg-white rounded-xl flex items-center justify-between px-4 font-bold">
                    <span>{clientName || 'Cliente'}</span>
                    <ChevronDown className="h-6 w-6" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl w-96 max-h-72 overflow-y-auto">
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
              <div className="flex flex-col xl:w-[30%] xl:mx-2 ">
                <label className="font-bold block mb-2">Documento</label>
                <Input
                  value={clientDocument}
                  onChange={e => setClientDocument(e.target.value)}
                  disabled={true}
                  className="bg-white text-gray-600 border-gray-300 h-[40px]  "
                />
              </div>
              <div className="flex flex-col xl:w-[30%] xl:mx-2 ">
                <label className="font-bold block mb-2">Email</label>
                <Input
                  value={clientEmail}
                  onChange={e => setClientDocument(e.target.value)}
                  disabled={true}
                  className="bg-white text-gray-600 border border-gray-300  h-[40px] "
                />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-left text-primary">
            Endereço
          </h1>

          <div className="xl:flex">
            <div className="flex flex-col">
              <div className="flex items-center w-56">
                <div className="flex flex-col">
                  <label className="font-bold">CEP</label>
                  <Input
                    value={zipCode}
                    onChange={setZipCode}
                    placeholder="Digite o CEP"
                    className="bg-white text-gray-600 border border-gray-300 rounded"
                    required
                  />
                </div>
                <SearchIcon
                  className="p-2 h-12 w-12 cursor-pointer mt-3"
                  onClick={handleSearchClick}
                />
              </div>
              <div className="flex flex-col  mr-6">
                <label className="font-bold">Endereço</label>
                <Input
                  value={addressName}
                  onChange={e => setAddressName(e.target.value)}
                  placeholder="Digite o endereço"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl  "
                  disabled
                  readOnly
                />
              </div>
              <div className="flex flex-col w-32 mr-3">
                <label className="font-bold ">Número</label>
                <Input
                  value={addressNumber}
                  onChange={e => setAddressNumber}
                  placeholder="Número"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl "
                  required
                />
              </div>
              <div className="flex flex-col w-48 mr-3">
                <label className="font-bold">Complemento</label>
                <Input
                  value={addressComplement}
                  onChange={e => setAddressComplement(e.target.value)}
                  placeholder="Digite o complemento"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl "
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col ">
                <div className="flex flex-col ">
                  <label className="font-bold">Bairro</label>
                  <Input
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    placeholder="Digite o bairro"
                    className="bg-white text-gray-600 border border-gray-300 rounded-xl  "
                    disabled
                    readOnly
                  />
                </div>
                <div className="flex flex-col  ">
                  <label className="font-bold">Cidade</label>
                  <Input
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Digite a Cidade"
                    className="bg-white text-gray-600 border border-gray-300 rounded-xl "
                    disabled
                    readOnly
                  />
                </div>
                <div className="flex flex-col ">
                  <label className="font-bold">Estado</label>
                  <Input
                    value={state}
                    onChange={e => setState(e.target.value)}
                    placeholder="Digite o Estado"
                    className="bg-white text-gray-600 border border-gray-300 rounded-xl  "
                    disabled
                    readOnly
                  />
                </div>
              </div>
              <div className="flex flex-col ">
                <label className="font-bold">Público</label>
                <Input
                  type="number"
                  value={estimatedAudience}
                  onChange={e => setEstimatedAudience}
                  placeholder="Público estimado"
                  className="bg-white text-gray-600 border border-gray-300-xl  "
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex">
              <div className="flex flex-col">
                <label className="font-bold">Data inicial</label>
                <DatePicker
                  onChange={date => handleDateChange(date, setStartDate)}
                  format="YYYY/MM/DD"
                  size="large"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl  "
                  placeholder="Selecione uma data"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold">Começo</label>
                <TimePicker
                  onChange={time => handleTimeChange(time, setStartTime)}
                  format="HH:mm:ss"
                  size="large"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl "
                  placeholder="Selecione um horário"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold">Data final</label>
                <DatePicker
                  onChange={date => handleDateChange(date, setEndDate)}
                  format="YYYY/MM/DD"
                  size="large"
                  className="bg-white text-gray-600 border border-gray-300 rounded h-[40px] "
                  placeholder="Selecione uma data"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold">Fim do evento</label>
                <TimePicker
                  onChange={time => handleTimeChange(time, setEndTime)}
                  format="HH:mm:ss"
                  size="large"
                  className="bg-white text-gray-600 border border-gray-300 rounded h-[40px] "
                  placeholder="Selecione um horário"
                />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-left text-primary mt-4">
            Selecione os Materiais
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex space-y-4 ">
              <div className="flex flex-col xl:w-56 xl:mr-10 mt-4">
                <h1 className="font-bold">Categoria</h1>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border border-gray-300 h-[40px]  bg-white rounded flex items-center justify-between px-4 font-bold">
                    <span>{selectedCategory || 'Categoria'}</span>
                    <ChevronDown className="h-6 w-6" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-300 rounded w-72 xl:w-96 max-h-48 overflow-y-auto">
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
              <div className="flex flex-col xl:w-56 xl:mx-10">
                <h1 className="font-bold">Material</h1>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border border-gray-300 h-[40px] bg-white rounded flex items-center justify-between px-4 font-bold">
                    <span>{selectedMaterial || 'Material'}</span>
                    <ChevronDown className="h-6 w-6" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-300 rounded w-96 max-h-48 overflow-y-auto">
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
              <div className="flex flex-col xl:w-56 xl:mx-10 w-36">
                <h1 className="font-bold ">Quantidade</h1>
                <Input
                  type="number"
                  value={materialQnt}
                  onChange={setMaterialQnt}
                  placeholder="Quantidade"
                  className="bg-white text-gray-600 border border-gray-300 rounded h-[40px] w-36 xl:w-48 "
                />
              </div>
              <div className="flex flex-col">
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
                  className="bg-white text-gray-600 border border-gray-300 rounded h-[40px] mt-6 xl:w-24"
                >
                  <PlusCircleIcon className="h-8 w-8" />
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-4 mr-6">
            <h1 className="text-3xl font-bold text-primary">
              Relação de Materiais
            </h1>
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
              onClick={postEvent}
              className="bg-primary mt-4 font-bold text-tertiary w-[20%]"
            >
              Criar evento
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withAuth(CreateEvent)
