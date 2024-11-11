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
import dayjs, { Dayjs } from 'dayjs'

const EventTypes: EventTypesProps[] = [
  { name: 'Casamento', index: 0 },
  { name: 'Feira', index: 1 },
  { name: 'Festa', index: 2 },
  { name: 'Festival', index: 3 },
  { name: 'Workshop', index: 4 },
  { name: 'Exibição', index: 5 },
  { name: 'Lançamento', index: 6 },
  { name: 'Campeonato', index: 7 },
  { name: 'Convenção', index: 8 },
  { name: 'Baile', index: 9 },
  { name: 'Seminário', index: 10 },
  { name: 'Assembléia', index: 11 },
  { name: 'Campanha', index: 12 },
  { name: 'Cerimônia', index: 13 },
  { name: 'Simpósio', index: 14 },
]

type EventTypesProps = {
  name: string
  index: number
}

type Mats = {
  materialId: string
  quantity: number
}

export const clientsAtom = atom<ClientProps[]>([])

const CreateEvent = () => {
  const [eventName, setEventName] = useState('')
  const [eventType, setEventType] = useState<number | null>(null)
  const [selectedType, setSelectedType] = useState('')
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [startTime, setStartTime] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [endTime, setEndTime] = useState<Dayjs | null>(null)
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
  const [EventNameError, setEventNameError] = useState('')
  const [clientDocumentError, setclientDocumentError] = useState('')
  const [zipCodeError, setZipCodeError] = useState('')
  const [addressNumberError, setAddressNumberError] = useState('')
  const [addressNameError, setAddressNameError] = useState('')
  const [districtError, setDistrictError] = useState('')
  const [cityError, setCityError] = useState('')
  const [stateError, setStateError] = useState('')
  const [EstimatedAudienceError, setEstimatedAudienceError] = useState('')
  const [isClientTouched, setIsClientTouched] = useState(false)
  const [clientNameError, setClientNameError] = useState('')
  const [startDateError, setStartDateError] = useState('')
  const [endDateError, setEndDateError] = useState('')
  const [startTimeError, setStartTimeError] = useState('')
  const [endTimeError, setEndTimeError] = useState('')
  const [isStartDateTouched, setIsStartDateTouched] = useState(false)
  const [isEndDateTouched, setIsEndDateTouched] = useState(false)
  const [isStartTimeTouched, setIsStartTimeTouched] = useState(false)
  const [isEndTimeTouched, setIsEndTimeTouched] = useState(false)
  const [isTouched, setIsTouched] = useState(false)
  const router = useRouter()

  const formatZipCode = (value: string) => {
    const numericValue = value.replace(/\D/g, '')

    if (numericValue.length <= 5) {
      return numericValue
    } else {
      return numericValue.replace(/^(\d{5})(\d{0,3})$/, '$1-$2')
    }
  }

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatZipCode(e.target.value)
    setZipCode(formattedValue)
  }

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

  function removeMask(value: string): string {
    return value.replace(/\D/g, '')
  }

  const handleEstimatedAudienceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value

    if (!isNaN(Number(value)) || value === '') {
      setEstimatedAudience(value)
      setEstimatedAudienceError('')
    } else {
      setEstimatedAudienceError('Apenas números são permitidos')
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

  const handleStartTimeChange = (
    time: Dayjs | null,
    setTime: React.Dispatch<React.SetStateAction<Dayjs | null>>,
  ) => {
    if (time && time.isValid()) {
      setTime(time)
      setStartTimeError('')
    } else {
      setTime(null)
      setStartTimeError('Campo obrigatório *')
    }
  }

  useEffect(() => {
    if (isStartTimeTouched) {
      if (!startTime) {
        setStartTimeError('Campo obrigatório *')
      } else {
        setStartTimeError('')
      }
    }
  }, [startTime, isStartTimeTouched])

  const handleEndTimeChange = (
    time: Dayjs | null,
    setTime: React.Dispatch<React.SetStateAction<Dayjs | null>>,
  ) => {
    if (time && time.isValid()) {
      setTime(time)
      setEndTimeError('')
    } else {
      setTime(null)
      setEndTimeError('Campo obrigatório *')
    }
  }

  useEffect(() => {
    if (isEndTimeTouched) {
      if (!endTime) {
        setEndTimeError('Campo obrigatório *')
      } else {
        setEndTimeError('')
      }
    }
  }, [endTime, isEndTimeTouched])

  const handleStartDateChange = (
    date: Dayjs | null,
    setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>,
  ) => {
    if (date && date.isValid()) {
      setDate(date)
      setStartDateError('')
    } else {
      setDate(null)
      setStartDateError('Campo obrigatório *')
    }
  }

  useEffect(() => {
    if (isStartDateTouched) {
      if (!startDate) {
        setStartDateError('Campo obrigatório *')
      } else {
        setStartDateError('')
      }
    }
  }, [startDate, isStartDateTouched])

  const handleEndDateChange = (
    date: Dayjs | null,
    setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>,
  ) => {
    if (date && date.isValid()) {
      setDate(date)
      setEndDateError('')
    } else {
      setDate(null)
      setEndDateError('Campo obrigatório *')
    }
  }

  useEffect(() => {
    if (isEndDateTouched) {
      if (!endDate) {
        setEndDateError('Campo obrigatório *')
      } else {
        setEndDateError('')
      }
    }
  }, [endDate, isEndDateTouched])

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
    eventType: number,
    stringEventType: string,
  ) => {
    setEventType(eventType)
    setSelectedType(stringEventType)
    setIsTouched(false)
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
    const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : ''
    const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : ''
    const formattedStartTime = startTime ? startTime.format('HH:mm:ss') : ''
    const formattedEndTime = endTime ? endTime.format('HH:mm:ss') : ''

    event.preventDefault()

    const fieldsToValidate = [
      { value: eventName, errorSetter: setEventNameError },
      { value: estimatedAudience, errorSetter: setEstimatedAudienceError },
      { value: clientDocument, errorSetter: setclientDocumentError },
      { value: zipCode, errorSetter: setZipCodeError },
      { value: addressName, errorSetter: setAddressNameError },
      { value: addressNumber, errorSetter: setAddressNumberError },
      { value: district, errorSetter: setDistrictError },
      { value: city, errorSetter: setCityError },
      { value: state, errorSetter: setStateError },
    ]

    let isValid = true

    fieldsToValidate.forEach(({ value, errorSetter }) => {
      if (!value) {
        errorSetter('Campo obrigatório *')
        isValid = false
      } else {
        errorSetter('')
      }
    })

    if (eventType === null) {
      setIsTouched(true)
      isValid = false
    }

    if (!isValid) return

    const body = {
      name: eventName,
      type: eventType as number,
      clientId: clientId,
      startDate: formattedStartDate,
      startTime: formattedStartTime,
      endDate: formattedEndDate,
      endTime: formattedEndTime,
      zipCode: removeMask(zipCode),
      addressName: addressName,
      addressNumber: addressNumber,
      addressComplement: addressComplement,
      district: district,
      state: state,
      city: city,
      estimatedAudience: estimatedAudience,
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

  const handleBlur = (fieldName: keyof typeof fieldErrorMap) => {
    const fieldErrorMap = {
      eventName: {
        value: eventName,
        setError: setEventNameError,
      },
      estimatedAudience: {
        value: estimatedAudience,
        setError: setEstimatedAudienceError,
      },
      clientDocument: {
        value: clientDocument,
        setError: setclientDocumentError,
      },
      zipCode: {
        value: zipCode,
        setError: setZipCodeError,
      },
      addressName: {
        value: addressName,
        setError: setAddressNameError,
      },
      addressNumber: {
        value: addressNumber,
        setError: setAddressNumberError,
      },
      startDate: {
        value: startDate,
        setError: setStartDateError,
      },
    }

    const field = fieldErrorMap[fieldName]

    if (!field.value) {
      field.setError('Campo obrigatório *')
    } else {
      field.setError('')
    }
  }

  const isTypeValid = eventType !== null

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
              <div className="flex flex-col xl:w-72 relative">
                <label className="font-bold block mb-2">Tipo</label>
                <DropdownMenu
                  onOpenChange={open => {
                    if (!open) {
                      if (!isTypeValid) {
                        setIsTouched(true)
                      }
                    }
                  }}
                >
                  <DropdownMenuTrigger
                    className={`flex border border-gray-300 h-[40px] bg-white items-center justify-between px-4 py-1 font-bold rounded-xl mr-6 ${
                      !isTypeValid && isTouched
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    onBlur={() => setIsTouched(true)}
                  >
                    <h1
                      className={`${!selectedType ? 'text-gray-400' : 'text-black'} mt-1`}
                    >
                      {selectedType ? selectedType : 'Selecione um Tipo'}
                    </h1>
                    <ChevronDown className="h-6 w-6" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl w-60 max-h-48 overflow-y-auto">
                    {EventType.map((eventType, index) => (
                      <React.Fragment key={index}>
                        <DropdownMenuItem
                          className="cursor-pointer my-1"
                          onClick={() => {
                            getEventTypeNameAndIndex(
                              eventType.index,
                              eventType.name,
                            )
                            setIsTouched(false)
                          }}
                        >
                          {eventType.name}
                        </DropdownMenuItem>
                        {index < EventType.length - 1 && (
                          <hr className="my-1 border-gray-300" />
                        )}
                      </React.Fragment>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {!isTypeValid && isTouched && (
                  <span
                    className="text-red-500 text-sm font-bold absolute"
                    style={{ top: '100%', marginTop: -15 }}
                  >
                    Campo obrigatório *
                  </span>
                )}
              </div>
              <div className="flex flex-col xl:w-[300px] relative">
                <label className="font-bold block mb-2">Título</label>
                <Input
                  value={eventName}
                  onChange={e => setEventName(e.target.value)}
                  onBlur={() => handleBlur('eventName')}
                  placeholder="Digite o Título do evento"
                  className={`p-2 mb-4 bg-white text-gray-600 border rounded w-full border-gray-300 h-[40px] sm:w-[250px] md:w-[500px] xl:w-[850px] ${EventNameError ? 'border-red-500' : 'border-slate-300'}`}
                  required
                />
                {EventNameError && (
                  <div
                    style={{
                      color: 'red',
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: -15,
                    }}
                  >
                    {EventNameError}
                  </div>
                )}
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-left text-primary">
            Informações do cliente
          </h1>
          <div className="flex flex-col">
            <div className="flex xl:w-full  space-y-4 ">
              <div className="flex flex-col xl:w-[30%] xl:mr-2 mt-4 relative">
                <h1 className="font-bold block mb-2">Cliente</h1>
                <DropdownMenu
                  onOpenChange={open => {
                    if (!open && !clientName) {
                      setIsClientTouched(true)
                      setClientNameError('Campo obrigatório *')
                    }
                  }}
                >
                  <DropdownMenuTrigger
                    className={`border border-gray-300 h-[40px] text-sm bg-white rounded-xl flex items-center justify-between px-4 ${
                      clientNameError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    onBlur={() => {
                      if (!clientName) {
                        setIsClientTouched(true)
                        setClientNameError('Campo obrigatório *')
                      }
                    }}
                  >
                    <span>{clientName || 'Cliente'}</span>
                    <ChevronDown className="h-6 w-6" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl w-96 max-h-72 overflow-y-auto">
                    {clients.map((client, index) => (
                      <div key={index}>
                        <DropdownMenuItem
                          onClick={() => {
                            getClientValues(
                              client.name,
                              client.id,
                              client.documentId,
                              client.email,
                            )
                            setIsClientTouched(false)
                            setClientNameError('')
                          }}
                        >
                          {client.name}
                        </DropdownMenuItem>
                        <hr className="my-1 border-gray-300" />
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {clientNameError && isClientTouched && (
                  <span
                    className="text-red-500 text-sm font-bold absolute"
                    style={{ top: '100%', marginTop: -15 }}
                  >
                    {clientNameError}
                  </span>
                )}
              </div>
              <div className="relative flex flex-col xl:w-[30%] xl:mx-2 ">
                <label className="font-bold block mb-2">Documento</label>
                <Input
                  value={clientDocument}
                  onChange={e => setClientDocument(e.target.value)}
                  disabled={true}
                  className={`p-2 mb-4 border rounded w-full h-[40px] ${clientDocumentError ? 'border-red-500' : 'border-slate-300'}`}
                />
                {clientDocumentError && (
                  <div
                    style={{
                      color: 'red',
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: -15,
                    }}
                  >
                    {clientDocumentError}
                  </div>
                )}
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
              <div className="flex items-center w-56 relative mb-4">
                <div className="flex flex-col">
                  <label className="font-bold">CEP</label>
                  <Input
                    value={zipCode}
                    onChange={handleZipCodeChange}
                    onBlur={() => handleBlur('zipCode')}
                    maxLength={9}
                    placeholder="Digite o CEP"
                    className={`p-2 mb-4 border rounded w-full ${zipCodeError ? 'border-red-500' : 'border-slate-300'}`}
                    required
                  />
                  {zipCodeError && (
                    <div
                      style={{
                        color: 'red',
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        marginTop: -15,
                      }}
                    >
                      {zipCodeError}
                    </div>
                  )}
                </div>
                <SearchIcon
                  className="p-2 h-12 w-12 cursor-pointer mt-3"
                  onClick={handleSearchClick}
                />
              </div>
              <div className="flex flex-col mr-3 mb-4 relative">
                <label className="font-bold">Endereço</label>
                <Input
                  value={addressName}
                  onChange={e => setAddressName(e.target.value)}
                  placeholder="Digite o endereço"
                  className={`p-2 mb-4 border rounded w-full ${addressNameError ? 'border-red-500' : 'border-slate-300'}`}
                  disabled
                  readOnly
                />
                {addressNameError && (
                  <div
                    style={{
                      color: 'red',
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: -15,
                    }}
                  >
                    {addressNameError}
                  </div>
                )}
              </div>
              <div className="flex flex-col w-40 mr-3 relative mb-4">
                <label className="font-bold ">Número</label>
                <Input
                  value={addressNumber}
                  onChange={e => setAddressNumber(e.target.value)}
                  onBlur={() => handleBlur('addressNumber')}
                  placeholder="Número"
                  className={`p-2 mb-4 border rounded w-full ${addressNumberError ? 'border-red-500' : 'border-slate-300'}`}
                  required
                />

                {addressNumberError && (
                  <div
                    style={{
                      color: 'red',
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: -15,
                    }}
                  >
                    {addressNumberError}
                  </div>
                )}
              </div>
              <div className="flex flex-col w-48 mr-3">
                <label className="font-bold">Complemento</label>
                <Input
                  value={addressComplement}
                  onChange={e => setAddressComplement(e.target.value)}
                  placeholder="Digite o complemento"
                  className="p-2 border-slate-500 bg-white mb-4"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col ">
                <div className="flex flex-col relative mb-4">
                  <label className="font-bold">Bairro</label>
                  <Input
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    placeholder="Digite o bairro"
                    className={`p-2 mb-4 border rounded w-full ${districtError ? 'border-red-500' : 'border-slate-300'}`}
                    disabled
                    readOnly
                  />

                  {districtError && (
                    <div
                      style={{
                        color: 'red',
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        marginTop: -15,
                      }}
                    >
                      {districtError}
                    </div>
                  )}
                </div>
                <div className="flex flex-col  relative mb-4">
                  <label className="font-bold">Cidade</label>
                  <Input
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Digite a Cidade"
                    className={`p-2 mb-4 border rounded w-full ${cityError ? 'border-red-500' : 'border-slate-300'}`}
                    disabled
                    readOnly
                  />

                  {cityError && (
                    <div
                      style={{
                        color: 'red',
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        marginTop: -15,
                      }}
                    >
                      {cityError}
                    </div>
                  )}
                </div>
                <div className="flex flex-col relative ">
                  <label className="font-bold">Estado</label>
                  <Input
                    value={state}
                    onChange={e => setState(e.target.value)}
                    placeholder="Digite o Estado"
                    className={`p-2 mb-4 border rounded w-full ${stateError ? 'border-red-500' : 'border-slate-300'}`}
                    disabled
                    readOnly
                  />

                  {stateError && (
                    <div
                      style={{
                        color: 'red',
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        marginTop: -15,
                      }}
                    >
                      {stateError}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col relative">
                <label className="font-bold">Público</label>
                <Input
                  value={estimatedAudience}
                  onChange={handleEstimatedAudienceChange}
                  onBlur={() => handleBlur('estimatedAudience')}
                  placeholder="Público estimado"
                  className={`p-2 mb-4 border rounded w-full ${EstimatedAudienceError ? 'border-red-500' : 'border-slate-300'}`}
                  required
                />
                {EstimatedAudienceError && (
                  <div
                    style={{
                      color: 'red',
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: -15,
                    }}
                  >
                    {EstimatedAudienceError}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex flex-wrap gap-4">
              <div className="relative mb-6 flex flex-col w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[250px]">
                <label className="font-bold">Data inicial</label>
                <DatePicker
                  onChange={date => {
                    const formattedDate = date
                      ? dayjs(date.format('YYYY-MM-DD'))
                      : null
                    handleStartDateChange(formattedDate, setStartDate)
                    if (formattedDate && formattedDate.isValid()) {
                      setStartDateError('')
                    } else {
                      setStartDateError('Campo obrigatório *')
                    }
                  }}
                  onBlur={() => {
                    if (!isStartDateTouched) {
                      setIsStartDateTouched(true)
                    }
                  }}
                  onOpenChange={open => {
                    if (open && !isStartDateTouched) {
                      setIsStartDateTouched(true)
                    }
                  }}
                  value={startDate}
                  format="YYYY/MM/DD"
                  size="large"
                  className={`bg-white text-gray-600 border ${startDateError ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
                  placeholder="Selecione uma data"
                />
                {startDateError && (
                  <span
                    className="text-red-500 text-sm mt-1"
                    style={{ position: 'absolute', top: '100%', left: '0' }}
                  >
                    {startDateError}
                  </span>
                )}
              </div>
              <div className="relative mb-6 flex flex-col w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[250px]">
                <label className="font-bold">Começo</label>
                <TimePicker
                  onChange={time => {
                    const formattedTime = time ? dayjs(time) : null
                    handleStartTimeChange(formattedTime, setStartTime)
                    if (formattedTime && formattedTime.isValid()) {
                      setStartTimeError('')
                    } else {
                      setStartTimeError('Campo obrigatório *')
                    }
                  }}
                  onBlur={() => {
                    if (!isStartTimeTouched) {
                      setIsStartTimeTouched(true)
                    }
                  }}
                  onOpenChange={open => {
                    if (open && !isStartTimeTouched) {
                      setIsStartTimeTouched(true)
                    }
                  }}
                  value={startTime}
                  format="HH:mm"
                  size="large"
                  className={`bg-white text-gray-600 border ${startTimeError ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
                  placeholder="Selecione um horário"
                />
                {startTimeError && (
                  <span
                    className="text-red-500 text-sm mt-1"
                    style={{ position: 'absolute', top: '100%', left: '0' }}
                  >
                    {startTimeError}
                  </span>
                )}
              </div>
              <div className="relative mb-6 flex flex-col w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[250px]">
                <label className="font-bold">Data final</label>
                <DatePicker
                  onChange={date => {
                    const formattedDate = date
                      ? dayjs(date.format('YYYY-MM-DD'))
                      : null
                    handleEndDateChange(formattedDate, setEndDate)
                    if (formattedDate && formattedDate.isValid()) {
                      setEndDateError('')
                    } else {
                      setEndDateError('Campo obrigatório *')
                    }
                  }}
                  onBlur={() => {
                    if (!isEndDateTouched) {
                      setIsEndDateTouched(true)
                    }
                  }}
                  onOpenChange={open => {
                    if (open && !isEndDateTouched) {
                      setIsEndDateTouched(true)
                    }
                  }}
                  value={endDate}
                  format="YYYY/MM/DD"
                  size="large"
                  className={`bg-white text-gray-600 border ${endDateError ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
                  placeholder="Selecione uma data"
                />
                {endDateError && (
                  <span
                    className="text-red-500 text-sm mt-1"
                    style={{ position: 'absolute', top: '100%', left: '0' }}
                  >
                    {endDateError}
                  </span>
                )}
              </div>
              <div className="relative mb-6 flex flex-col w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[250px]">
                <label className="font-bold">Fim do evento</label>
                <TimePicker
                  onChange={time => {
                    const formattedTime = time ? dayjs(time) : null
                    handleEndTimeChange(formattedTime, setEndTime)
                    if (formattedTime && formattedTime.isValid()) {
                      setEndTimeError('')
                    } else {
                      setEndTimeError('Campo obrigatório *')
                    }
                  }}
                  onBlur={() => {
                    if (!isEndTimeTouched) {
                      setIsEndTimeTouched(true)
                    }
                  }}
                  onOpenChange={open => {
                    if (open && !isEndTimeTouched) {
                      setIsEndTimeTouched(true)
                    }
                  }}
                  value={endTime}
                  format="HH:mm"
                  size="large"
                  className={`bg-white text-gray-600 border ${endTimeError ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
                  placeholder="Selecione um horário"
                />
                {endTimeError && (
                  <span
                    className="text-red-500 text-sm mt-1"
                    style={{ position: 'absolute', top: '100%', left: '0' }}
                  >
                    {endTimeError}
                  </span>
                )}
              </div>
            </div>
          </div>

          <h1 className="w-full p-4 mt-6 rounded-xl bg-cyan-900 text-white text-2xl font-bold text-center">
            Materiais
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex space-y-4 xl:w-full">
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
                  onChange={e => setMaterialQnt(e.target.value)}
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
