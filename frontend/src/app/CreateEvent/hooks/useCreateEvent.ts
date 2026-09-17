import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAtom } from 'jotai'
import dayjs, { Dayjs } from 'dayjs'
import { toast } from 'sonner'
import { intl } from '@/i18n'
import { formatCurrency } from '@/functions/functions'
import { clientsAtom } from '@/app/atoms/clientsAtom'
import {
  createEvent,
  fetchAddressByZipCode,
  fetchClients,
  fetchMaterialsByCategory,
} from '../services/createEventService'
import {
  formatZipCodeInput,
  mapClientApiToOption,
  mapFormStateToCreatePayload,
  mapMaterialApiToOption,
} from '../mappers/createEventMapper'
import { MaterialType, Mats, insertMaterialProps } from '../types/createEventTypes'

const requiredFieldError = () =>
  `${intl.formatMessage({ id: 'required.field.error.message' })}`

export const useCreateEvent = () => {
  const router = useRouter()

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
  const [insertedMaterial, setInsertedMaterial] = useState<insertMaterialProps[]>([])
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
  const [estimatedAudienceError, setEstimatedAudienceError] = useState('')
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

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(formatZipCodeInput(e.target.value))
  }

  const handleSearchClick: React.MouseEventHandler<SVGSVGElement> = async event => {
    try {
      event.preventDefault()
      const cepData = await fetchAddressByZipCode(zipCode)
      setAddressName(cepData.logradouro)
      setDistrict(cepData.bairro)
      setCity(cepData.localidade)
      setState(cepData.uf)
    } catch (error) {
      console.error('Erro ao buscar o CEP:', error)
    }
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

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await fetchClients()
        setClients(data.map(mapClientApiToOption))
      } catch (error) {
        console.error('Error fetching clients:', error)
      }
    }
    loadClients()
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
      setStartTimeError(requiredFieldError())
    }
  }

  useEffect(() => {
    if (isStartTimeTouched) {
      setStartTimeError(startTime ? '' : requiredFieldError())
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
      setEndTimeError(requiredFieldError())
    }
  }

  useEffect(() => {
    if (isEndTimeTouched) {
      setEndTimeError(endTime ? '' : requiredFieldError())
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
      setStartDateError(requiredFieldError())
    }
  }

  useEffect(() => {
    if (isStartDateTouched) {
      setStartDateError(startDate ? '' : requiredFieldError())
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
      setEndDateError(requiredFieldError())
    }
  }

  useEffect(() => {
    if (isEndDateTouched) {
      setEndDateError(endDate ? '' : requiredFieldError())
    }
  }, [endDate, isEndDateTouched])

  const handleStartDateInputChange = (date: Dayjs | null) => {
    const formattedDate = date ? dayjs(date.format('YYYY-MM-DD')) : null
    handleStartDateChange(formattedDate, setStartDate)
    setStartDateError(formattedDate && formattedDate.isValid() ? '' : requiredFieldError())
  }

  const handleEndDateInputChange = (date: Dayjs | null) => {
    const formattedDate = date ? dayjs(date.format('YYYY-MM-DD')) : null
    handleEndDateChange(formattedDate, setEndDate)
    setEndDateError(formattedDate && formattedDate.isValid() ? '' : requiredFieldError())
  }

  const handleStartTimeInputChange = (time: Dayjs | null) => {
    const formattedTime = time ? dayjs(time) : null
    handleStartTimeChange(formattedTime, setStartTime)
    setStartTimeError(formattedTime && formattedTime.isValid() ? '' : requiredFieldError())
  }

  const handleEndTimeInputChange = (time: Dayjs | null) => {
    const formattedTime = time ? dayjs(time) : null
    handleEndTimeChange(formattedTime, setEndTime)
    setEndTimeError(formattedTime && formattedTime.isValid() ? '' : requiredFieldError())
  }

  const getMaterialsByCategory = async (
    categoryName: string,
    category: number,
  ) => {
    try {
      const data = await fetchMaterialsByCategory(category)
      setMaterials(data.map(mapMaterialApiToOption))
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
    newEventType: number,
    stringEventType: string,
  ) => {
    setEventType(newEventType)
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

    if (!materialName || !materialId || quantity <= 0 || isNaN(quantity)) {
      toast.error('Preencha todos os campos corretamente antes de adicionar o material.')
      return
    }
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

  const handleAddMaterial = (event: React.FormEvent) =>
    insertMaterial(
      event,
      selectedMaterial,
      selectedMaterialId,
      Number(materialQnt),
      selectedMaterialIndex,
      selectedMaterialPrice,
    )

  const removeMaterial = (index: number) => {
    const newInsertedMaterial = [...insertedMaterial]
    newInsertedMaterial.splice(index, 1)
    setInsertedMaterial(newInsertedMaterial)
  }

  const totalAmountConverted = formatCurrency(Number(totalAmount.toFixed(2)))

  const postEvent = async (event: React.FormEvent) => {
    event.preventDefault()

    const fieldsToValidate = [
      { value: eventName, errorSetter: setEventNameError },
      { value: estimatedAudience, errorSetter: setEstimatedAudienceError },
      { value: clientDocument, errorSetter: setclientDocumentError },
      { value: clientName, errorSetter: setClientNameError },
      { value: zipCode, errorSetter: setZipCodeError },
      { value: addressName, errorSetter: setAddressNameError },
      { value: addressNumber, errorSetter: setAddressNumberError },
      { value: district, errorSetter: setDistrictError },
      { value: city, errorSetter: setCityError },
      { value: state, errorSetter: setStateError },
      { value: startDate, errorSetter: setStartDateError },
      { value: startTime, errorSetter: setStartTimeError },
      { value: endDate, errorSetter: setEndDateError },
      { value: endTime, errorSetter: setEndTimeError },
    ]

    let isValid = true

    fieldsToValidate.forEach(({ value, errorSetter }) => {
      if (!value) {
        errorSetter(requiredFieldError())
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

    const body = mapFormStateToCreatePayload({
      eventName,
      eventType: eventType as number,
      clientId,
      startDate,
      endDate,
      startTime,
      endTime,
      zipCode,
      addressName,
      addressNumber,
      addressComplement,
      district,
      state,
      city,
      estimatedAudience,
      materials: materialIdAndQuantity,
      totalAmount,
    })

    try {
      await createEvent(body)
      toast.success('Evento criado com sucesso')
      router.push('/Events')
    } catch (error) {
      toast.error('Erro ao criar evento')
      console.error('Error creating event:', error)
    }
  }

  const handleBlur = (fieldName: keyof typeof fieldErrorMap) => {
    const fieldErrorMap = {
      eventName: { value: eventName, setError: setEventNameError },
      estimatedAudience: { value: estimatedAudience, setError: setEstimatedAudienceError },
      clientDocument: { value: clientDocument, setError: setclientDocumentError },
      zipCode: { value: zipCode, setError: setZipCodeError },
      addressName: { value: addressName, setError: setAddressNameError },
      addressNumber: { value: addressNumber, setError: setAddressNumberError },
      startDate: { value: startDate, setError: setStartDateError },
    }

    const field = fieldErrorMap[fieldName]

    if (!field.value) {
      field.setError(requiredFieldError())
    } else {
      field.setError('')
    }
  }

  const isTypeValid = eventType !== null

  return {
    eventName,
    setEventName,
    EventNameError,
    handleBlur,

    selectedType,
    isTypeValid,
    isTouched,
    setIsTouched,
    getEventTypeNameAndIndex,

    clients,
    clientName,
    clientDocument,
    setClientDocument,
    clientEmail,
    clientNameError,
    isClientTouched,
    setIsClientTouched,
    setClientNameError,
    clientDocumentError,
    getClientValues,

    zipCode,
    handleZipCodeChange,
    zipCodeError,
    handleSearchClick,
    addressName,
    setAddressName,
    addressNameError,
    addressNumber,
    setAddressNumber,
    addressNumberError,
    addressComplement,
    setAddressComplement,
    district,
    setDistrict,
    districtError,
    city,
    setCity,
    cityError,
    state,
    setState,
    stateError,
    estimatedAudience,
    handleEstimatedAudienceChange,
    estimatedAudienceError,

    startDate,
    handleStartDateChange: handleStartDateInputChange,
    startDateError,
    isStartDateTouched,
    setIsStartDateTouched,
    endDate,
    handleEndDateChange: handleEndDateInputChange,
    endDateError,
    isEndDateTouched,
    setIsEndDateTouched,
    startTime,
    handleStartTimeChange: handleStartTimeInputChange,
    startTimeError,
    isStartTimeTouched,
    setIsStartTimeTouched,
    endTime,
    handleEndTimeChange: handleEndTimeInputChange,
    endTimeError,
    isEndTimeTouched,
    setIsEndTimeTouched,

    selectedCategory,
    getMaterialsByCategory,
    selectedMaterial,
    materials,
    getMaterialValues,
    materialQnt,
    handleMaterialQuantityChange,
    handleAddMaterial,
    insertedMaterial,
    removeMaterial,
    totalAmountConverted,

    postEvent,
  }
}
