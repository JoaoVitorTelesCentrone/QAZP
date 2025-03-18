'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  ChevronDown,
  LucideTrash2,
  PlusCircleIcon,
  SearchIcon,
} from 'lucide-react'
import dayjs, { Dayjs } from 'dayjs'
import axios from 'axios'
import { Button, DatePicker, Input, message, Table, TimePicker } from 'antd'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserSideMenu from '@/app/components/UserHeader'
import { useAtom } from 'jotai'
import { clientsAtom } from '@/app/CreateEvent/page'
import { formatCurrency } from '@/functions/functions'
import { eventIdAtom } from '../atoms/EventIdAtom'
import { insertMaterialProps, MaterialType } from '../CreateEvent/utils'
import { toast } from 'sonner'
import { intl } from '@/i18n'

type EditEventProps = {
  eventId: string
}

type Mats = {
  materialId: string
  quantity: number
}

const EditEvent: React.FC<EditEventProps> = () => {
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [selectedMaterialId, setSelectedMaterialId] = useState('')
  const [selectedMaterialIndex, setSelectedMaterialIndex] = useState(0)
  const [selectedMaterialPrice, setSelectedMaterialPrice] = useState(0)
  const [materialQnt, setMaterialQnt] = useState('')
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [startTime, setStartTime] = useState<Dayjs | null>(null)
  const [endTime, setEndTime] = useState<Dayjs | null>(null)
  const [zipCode, setZipCode] = useState('')
  const [addressName, setAddressName] = useState('')
  const [addressNumber, setAddressNumber] = useState('')
  const [addressComplement, setAddressComplement] = useState('')
  const [district, setDistrict] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [estimatedAudience, setEstimatedAudience] = useState('')
  const [clientId, setClientId] = useState('')
  const [clientName, setClientName] = useState('')
  const [totalAmount, setTotalAmount] = useState<Number>()
  const [eventId, setEventId] = useState('')
  const [clients, setClients] = useAtom(clientsAtom)
  const [sMaterials, setSMaterials] = useState<MaterialType[]>([])
  const [sendMaterial, setSendMaterial] = useState<Mats[]>([])
  const [NameError, setNameError] = useState('')
  const [zipCodeError, setZipCodeError] = useState('')
  const [addressNameError, setAddressNameError] = useState('')
  const [addressNumberError, setAddressNumberError] = useState('')
  const [districtError, setDistrictError] = useState('')
  const [cityError, setCityError] = useState('')
  const [stateError, setStateError] = useState('')
  const [estimatedAudienceError, setEstimatedAudienceError] = useState('')
  const [startDateError, setStartDateError] = useState('')
  const [endDateError, setEndDateError] = useState('')
  const [startTimeError, setStartTimeError] = useState('')
  const [endTimeError, setEndTimeError] = useState('')
  const [type, setType] = useState('')
  const [isStartDateTouched, setIsStartDateTouched] = useState(false)
  const [isEndDateTouched, setIsEndDateTouched] = useState(false)
  const [isStartTimeTouched, setIsStartTimeTouched] = useState(false)
  const [isEndTimeTouched, setIsEndTimeTouched] = useState(false)
  const [isTouched, setIsTouched] = useState(false)

  const router = useRouter()

  const [materials, setMaterials] = useState<
    {
      materialId: string
      materialName: string
      quantity: number
      materialPrice: number
    }[]
  >([])

  const [eventAtom, setEventAtom] = useAtom(eventIdAtom)
  const [insertedMaterial, setInsertedMaterial] = useState<
    insertMaterialProps[]
  >([])
  const [materialIdAndQuantity, setMaterialIdAndQuantity] = useState<Mats[]>([])

  const getClientValues = (name: string, id: string) => {
    setClientId(id)
    setClientName(name)
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

  const MaterialCategory = [
    { name: 'Comida', index: 0 },
    { name: 'Decoração', index: 1 },
    { name: 'Utensilios', index: 2 },
    { name: 'Mobilia', index: 3 },
    { name: 'Recursos humanos', index: 4 },
    { name: 'Aluguel', index: 5 },
    { name: 'Entretenimento', index: 6 },
    { name: 'Marketing', index: 7 },
  ]

  const MaterialColumns = [
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
          onClick={() => removeMaterial(index)}
          className="h-5 w-5 inline-block text-primary ml-2 cursor-pointer"
        />
      ),
    },
  ]

  function applyMask(value: string, type: 'zip'): string {
    return value.replace(/(\d{5})(\d{3})/, '$1-$2')
  }

  const removeMask = (value: string): string => {
    return value.replace(/\D/g, '')
  }
  const formatZipCode = (value: string) => {
    return value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})$/, '$1-$2')
  }

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatZipCode(e.target.value)
    setZipCode(formattedValue)
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

  const handleMaterialQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value

    if (!isNaN(Number(value)) || value === '') {
      setMaterialQnt(value)
    }
  }

  const handleStartTimeChange = (
    time: Dayjs | null,
    setTime: React.Dispatch<React.SetStateAction<Dayjs | null>>,
  ) => {
    if (time && time.isValid()) {
      setTime(time)
      setStartTimeError('')
    } else {
      setTime(null)
      setStartTimeError(`${intl.formatMessage({
        id: 'required.field.error.message',
      })}`)
    }
  }

  useEffect(() => {
    if (isStartTimeTouched) {
      if (!startTime) {
        setStartTimeError(`${intl.formatMessage({
        id: 'required.field.error.message',
      })}`)
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
      setEndTimeError(`${intl.formatMessage({
        id: 'required.field.error.message',
      })}`)
    }
  }

  useEffect(() => {
    if (isEndTimeTouched) {
      if (!endTime) {
        setEndTimeError(`${intl.formatMessage({
        id: 'required.field.error.message',
      })}`)
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
      setStartDateError(`${intl.formatMessage({
        id: 'required.field.error.message',
      })}`)
    }
  }

  useEffect(() => {
    if (isStartDateTouched) {
      if (!startDate) {
        setStartDateError(`${intl.formatMessage({
        id: 'required.field.error.message',
      })}`)
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
      setEndDateError(`${intl.formatMessage({
        id: 'required.field.error.message',
      })}`)
    }
  }

  useEffect(() => {
    if (isEndDateTouched) {
      if (!endDate) {
        setEndDateError(`${intl.formatMessage({
        id: 'required.field.error.message',
      })}`)
      } else {
        setEndDateError('')
      }
    }
  }, [endDate, isEndDateTouched])

  const removeMaterial = (index: number) => {
    const newInsertedMaterial = [...materials]
    newInsertedMaterial.splice(index, 1)
    setMaterials(newInsertedMaterial)
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

    if (!materialName || !materialId || quantity <= 0 || isNaN(quantity)) {
      toast.error('Preencha todos os campos corretamente antes de adicionar o material.')
      return;
  }
    const newMaterialInsert = {
      materialName: materialName,
      quantity: quantity,
      materialId: materialId,
      materialPrice: price,
    }
    const newMaterialSend = {
      materialId: materialId,
      quantity: quantity,
    }
    console.log(newMaterialInsert)
    setMaterials(prevMaterials => [...prevMaterials, newMaterialInsert])
    console.log(newMaterialInsert)
    setSendMaterial([...materials, newMaterialSend])
  }

  useEffect(() => {
    const fetchEventAndClient = async () => {
      try {
        if (eventAtom) {
          const eventResponse = await axios.get(
            `http://localhost:5196/api/Event/id/${eventAtom}`,
          )
          const event = eventResponse.data

          setName(event.name)
          setClientId(event.clientId)
          setStartDate(event.startDate ? dayjs(event.startDate) : null)
          setEndDate(event.endDate ? dayjs(event.endDate) : null)
          setStartTime(
            event.startTime ? dayjs(event.startTime, 'HH:mm:ss') : null,
          )
          setEndTime(event.endTime ? dayjs(event.endTime, 'HH:mm:ss') : null)
          setZipCode(applyMask(event.zipCode || '', 'zip'))
          setAddressName(event.addressName || '')
          setAddressNumber(event.addressNumber || '')
          setAddressComplement(event.addressComplement || '')
          setDistrict(event.district || '')
          setState(event.state || '')
          setCity(event.city || '')
          setType(event.type)
          setEstimatedAudience(event.estimatedAudience || 0)
          setTotalAmount(event.totalAmount)

          if (event.clientId) {
            const clientResponse = await axios.get(
              `http://localhost:5196/api/Client/id/${event.clientId}`,
            )
            const client = clientResponse.data
            setClientId(client.id)
            setClientName(client.fullName)
          }

          if (event.id) {
            const materialsResponse = await axios.get(
              `http://localhost:5196/api/EventMaterial/eventId/${event.id}`,
            )
            const materials = materialsResponse.data
            setMaterials(materials)
          }
        }
      } catch (error) {
        console.error('Error fetching event or client details:', error)
      }
    }

    fetchEventAndClient()
  }, [eventAtom])

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

  useEffect(() => {
    const newTotalAmount = materials.reduce(
      (sum, material) => sum + material.materialPrice * material.quantity,
      0,
    )
    setTotalAmount(newTotalAmount)
  }, [materials])

  const handleUpdate = async () => {
    const fieldsToValidate = [
      { value: name, errorSetter: setNameError },
      { value: estimatedAudience, errorSetter: setEstimatedAudienceError },
      // { value: clientDocument, errorSetter: setclientDocumentError },
      // { value: clientName, errorSetter: setClientNameError },
      { value: zipCode, errorSetter: setZipCodeError },
      { value: addressName, errorSetter: setAddressNameError },
      { value: addressNumber, errorSetter: setAddressNumberError },
      { value: district, errorSetter: setDistrictError },
      { value: city, errorSetter: setCityError },
      { value: state, errorSetter: setStateError },
      // { value: startDate, errorSetter: setStartDateError },
      // { value: startTime, errorSetter: setStartTimeError },
      // { value: endDate, errorSetter: setEndDateError },
      // { value: endTime, errorSetter: setEndTimeError },
    ]

    let isValid = true

    fieldsToValidate.forEach(({ value, errorSetter }) => {
      if (!value) {
        errorSetter(`${intl.formatMessage({
        id: 'required.field.error.message',
      })}`)
        isValid = false
      } else {
        errorSetter('')
      }
    })

    // if (eventType === null) {
    //   setIsTouched(true)
    //   isValid = false
    // }

    if (!isValid) return

    try {
      const body = {
        name,
        clientId,
        startDate: startDate ? startDate.format('YYYY-MM-DD') : '',
        endDate: endDate ? endDate.format('YYYY-MM-DD') : '',
        startTime: startTime ? startTime.format('HH:mm:ss') : '',
        endTime: endTime ? endTime.format('HH:mm:ss') : '',
        zipCode: removeMask(zipCode),
        addressName,
        addressNumber,
        addressComplement,
        district,
        state,
        city,
        estimatedAudience,
        materials: sendMaterial,
        totalAmount: totalAmount,
        type,
        status: 0,
      }
      console.log(body)

      await axios.put(`http://localhost:5196/api/Event/${eventAtom}`, body)
      message.success('Atualização feita com sucesso')
    } catch (error) {
      console.error('Error updating event:', error)
      message.error('Erro ao atualizar evento')
    } finally {
      router.push('/Events')
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
      setSMaterials(materials)
      setSelectedCategory(categoryName)
    } catch (error) {
      console.error('Error fetching materials:', error)
    }
  }

  const totalAmountConverted = formatCurrency(Number(totalAmount))

  const handleBlur = (fieldName: keyof typeof fieldErrorMap) => {
    const fieldErrorMap = {
      name: {
        value: name,
        setError: setNameError,
      },
      estimatedAudience: {
        value: estimatedAudience,
        setError: setEstimatedAudienceError,
      },
      // clientDocument: {
      //   value: clientDocument,
      //   setError: setclientDocumentError,
      // },
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
      // startDate: {
      //   value: startDate,
      //   setError: setStartDateError,
      // },
    }

    const field = fieldErrorMap[fieldName]

    if (!field.value) {
      field.setError(`${intl.formatMessage({
        id: 'required.field.error.message',
      })}`)
    } else {
      field.setError('')
    }
  }

  return (
    <div>
      <UserSideMenu />
      <div className="ml-56 p-3 rounded-xl bg-gray-300 border-2 border-gray-200 mr-10 my-10">
        <h1 className="text-3xl font-bold">Editar evento {name}</h1>
        <div className="my-4">
          <div className="relative">
            <h1 className="font-bold text-2xl mb-2">Título</h1>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              onBlur={() => handleBlur('name')}
              placeholder="Nome do Evento"
              className={`p-2 mb-4 bg-white text-gray-600 border  w-[800px] border-gray-300 h-[40px]   ${NameError ? 'border-red-500' : 'border-slate-300'}`}
              required
            />
            {NameError && (
              <div
                style={{
                  color: 'red',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: -15,
                }}
              >
                {NameError}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl my-3 font-bold">Cliente</h1>
            <div className="flex">
              <div className="">
                <DropdownMenu>
                  <DropdownMenuTrigger className="border border-gray-300 h-[40px] w-full sm:w-[300px] md:w-[400px] bg-white rounded-xl flex items-center justify-between px-4 font-bold">
                    <span>{clientName || 'Selecione um Cliente'}</span>
                    <ChevronDown className="h-6 w-6" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl w-full max-h-48 overflow-y-auto">
                    {clients.length > 0 ? (
                      clients.map((client, index) => (
                        <div key={index}>
                          <DropdownMenuItem
                            onClick={() =>
                              getClientValues(client.name, client.id)
                            }
                          >
                            {client.name}
                          </DropdownMenuItem>
                          <hr className="my-1 border-gray-300" />
                        </div>
                      ))
                    ) : (
                      <div className="p-4">Nenhum cliente disponível</div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <h1 className="font-bold text-2xl mt-10 mb-2">Endereço</h1>

          <div className="flex sm:flex-col md:flex-col xl:flex-row w-full">
            <div className="xl:flex flex-col justify-around mb-8 mr-10">
              <div className="flex items-center w-72">
                <div className="relative flex flex-col mb-6 sm:w-[300px] md:w-[500px]">
                  <label className="font-bold block mb-2">CEP</label>
                  <Input
                    value={zipCode}
                    onChange={handleZipCodeChange}
                    onBlur={() => handleBlur('zipCode')}
                    maxLength={9}
                    placeholder="Digite o CEP"
                    className={`p-2 mb-4 border rounded w-full ${addressNameError ? 'border-red-500' : 'border-slate-300'}`}
                    required
                  />
                  {zipCodeError && (
                    <div
                      style={{
                        color: 'red',
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                      }}
                    >
                      {zipCodeError}
                    </div>
                  )}
                </div>
                <SearchIcon
                  className="h-12 w-12 cursor-pointer "
                  onClick={handleSearchClick}
                />
              </div>
              <div className="flex flex-col mb-8 mr-4 relative">
                <label className="font-bold block mb-2">Endereço</label>
                <Input
                  value={addressName}
                  onChange={e => setAddressName(e.target.value)}
                  placeholder="Digite a Rua"
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
              <div className="relative flex flex-col mr-10 mb-8">
                <label className="font-bold block mb-2">Número</label>
                <Input
                  value={addressNumber}
                  onChange={e => setAddressNumber(e.target.value)}
                  onBlur={() => handleBlur('addressNumber')}
                  placeholder="Número"
                  className={`p-2 mb-4 border rounded w-full ${addressNameError ? 'border-red-500' : 'border-slate-300'}`}
                />
                {addressNumberError && (
                  <div
                    style={{
                      color: 'red',
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                    }}
                  >
                    {addressNumberError}
                  </div>
                )}
              </div>
              <div className="flex flex-col ">
                <label className="font-bold block mb-2">Complemento</label>
                <Input
                  value={addressComplement}
                  onChange={e => setAddressComplement(e.target.value)}
                  placeholder="Digite o complemento"
                  className={`p-2 mb-4 border rounded w-full ${addressNameError ? 'border-red-500' : 'border-slate-300'}`}
                />
              </div>
            </div>

            <div className="flex flex-col ">
              <div className="flex flex-col relative mb-8">
                <label className="font-bold block mb-2">Bairro</label>
                <Input
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  placeholder="Digite o bairro"
                  className={`p-2 mb-4 border rounded w-full ${addressNameError ? 'border-red-500' : 'border-slate-300'}`}
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
                    }}
                  >
                    {districtError}
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-grow relative">
                <label className="font-bold block mb-2">Cidade</label>
                <Input
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="Digite a Cidade"
                  className={`p-2 mb-4 border rounded w-full ${addressNameError ? 'border-red-500' : 'border-slate-300'}`}
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
                    }}
                  >
                    {cityError}
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-grow relative">
                <label className="font-bold block mb-2">Estado</label>
                <Input
                  value={state}
                  onChange={e => setState(e.target.value)}
                  placeholder="Digite o Estado"
                  className={`p-2 mb-4 border rounded w-full ${addressNameError ? 'border-red-500' : 'border-slate-300'}`}
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
          </div>

          <div className="flex flex-col mt-6 relative mb-8">
            <label className="font-bold mb-2 text-2xl ">Público estimado</label>
            <Input
              value={estimatedAudience}
              onChange={handleEstimatedAudienceChange}
              onBlur={() => handleBlur('estimatedAudience')}
              placeholder="Público estimado"
              className={`bg-white text-gray-600 border border-gray-300  h-[40px] w-full sm:w-[300px] md:w-[420px] ${estimatedAudienceError ? 'border-red-500' : 'border-slate-300'}`}
            />
            {estimatedAudienceError && (
              <div
                style={{
                  color: 'red',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                }}
              >
                {estimatedAudienceError}
              </div>
            )}
          </div>

          <h1 className="font-bold text-2xl mt-4">Data</h1>
          <div className="relative my-4 flex justify-between">
            <div className="relative mb-6 flex flex-col w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[225px] xl:mr-8 2xl:w-[250px] 2xl:mr-10">
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
                    setStartDateError(`${intl.formatMessage({
        id: 'required.field.error.message',
      })}`)
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
                placeholder="Selecione uma data"
                className={`xl:w-[250px] xl:h-[40px] ${startDateError ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
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
            <div className="relative mb-6 flex flex-col w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[225px] xl:mr-8 2xl:w-[250px] 2xl:mr-10">
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
                    setEndDateError(`${intl.formatMessage({
        id: 'required.field.error.message',
      })}`)
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
                placeholder="Selecione uma data"
                className={`xl:w-[250px] xl:h-[40px] ${endDateError ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
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
            <div className="relative mb-6 flex flex-col w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[225px] xl:mr-8 2xl:w-[250px] 2xl:mr-10">
              <label className="font-bold">Horário inicial</label>
              <TimePicker
                onChange={time => {
                  const formattedTime = time ? dayjs(time) : null
                  handleStartTimeChange(formattedTime, setStartTime)
                  if (formattedTime && formattedTime.isValid()) {
                    setStartTimeError('')
                  } else {
                    setStartTimeError(`${intl.formatMessage({
        id: 'required.field.error.message',
      })}`)
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
                placeholder="Selecione um horário"
                className={`xl:w-[250px] xl:h-[40px] bg-white text-gray-600 border ${startTimeError ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
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
            <div className="relative mb-6 flex flex-col w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[225px] xl:mr-8 2xl:w-[250px] 2xl:mr-10">
              <label className="font-bold">Horário final</label>
              <TimePicker
                onChange={time => {
                  const formattedTime = time ? dayjs(time) : null
                  handleEndTimeChange(formattedTime, setEndTime)
                  if (formattedTime && formattedTime.isValid()) {
                    setEndTimeError('')
                  } else {
                    setEndTimeError(`${intl.formatMessage({
        id: 'required.field.error.message',
      })}`)
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
                placeholder="Selecione um horário"
                className={`xl:w-[250px] xl:h-[40px] bg-white text-gray-600 border ${endTimeError ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
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
                      <span>
                        {selectedCategory || 'Selecione uma Categoria'}
                      </span>
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
                    value={materialQnt}
                    onChange={handleMaterialQuantityChange}
                    placeholder="Quantidade"
                    className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px]  w-32"
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
                columns={MaterialColumns}
                pagination={false}
                rowKey="key"
              />
              <div className="bg-tertiary p-4  mt-4 rounded-xl flex justify-between">
                <span className="font-bold">Valor final</span>
                <span className="font-bold">{totalAmountConverted}</span>
              </div>
            </div>

            <div className="flex mt-4">
              <Button onClick={handleUpdate}>Atualizar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditEvent
