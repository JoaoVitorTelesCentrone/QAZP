import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dayjs, { Dayjs } from 'dayjs'
import { message } from 'antd'
import { toast } from 'sonner'
import { useAtom } from 'jotai'
import { intl } from '@/i18n'
import { formatCurrency } from '@/functions/functions'
import { clientsAtom } from '@/app/atoms/clientsAtom'
import { MaterialType } from '../../CreateEvent/types/createEventTypes'
import {
  fetchClientById,
  fetchEventById,
  fetchEventMaterials,
  fetchMaterialsByCategory,
  fetchAddressByZipCode,
  updateEvent,
} from '../services/editEventService'
import {
  formatZipCodeInput,
  mapEventResponseToFormState,
  mapFormStateToUpdatePayload,
} from '../mappers/editEventMapper'
import { EditEventMaterial, EditEventMaterialToSend } from '../types/editEventTypes'

const requiredFieldError = () =>
  `${intl.formatMessage({ id: 'required.field.error.message' })}`

export const useEditEvent = (eventId: string) => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
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
  const [totalAmount, setTotalAmount] = useState<number>()
  const [type, setType] = useState('')
  const [clients] = useAtom(clientsAtom)

  const [selectedCategory, setSelectedCategory] = useState('')
  const [sMaterials, setSMaterials] = useState<MaterialType[]>([])
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [selectedMaterialId, setSelectedMaterialId] = useState('')
  const [selectedMaterialIndex, setSelectedMaterialIndex] = useState(0)
  const [selectedMaterialPrice, setSelectedMaterialPrice] = useState(0)
  const [materialQnt, setMaterialQnt] = useState('')
  const [materials, setMaterials] = useState<EditEventMaterial[]>([])
  const [sendMaterial, setSendMaterial] = useState<EditEventMaterialToSend[]>([])

  const [nameError, setNameError] = useState('')
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
  const [isStartDateTouched, setIsStartDateTouched] = useState(false)
  const [isEndDateTouched, setIsEndDateTouched] = useState(false)
  const [isStartTimeTouched, setIsStartTimeTouched] = useState(false)
  const [isEndTimeTouched, setIsEndTimeTouched] = useState(false)

  const getClientValues = (name: string, id: string) => {
    setClientId(id)
    setClientName(name)
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

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(formatZipCodeInput(e.target.value))
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
      return
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
    setMaterials(prevMaterials => [...prevMaterials, newMaterialInsert])
    setSendMaterial([...materials, newMaterialSend])
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

  useEffect(() => {
    const fetchEventAndClient = async () => {
      try {
        if (eventId) {
          const event = await fetchEventById(eventId)
          const formState = mapEventResponseToFormState(event)

          setName(formState.name)
          setClientId(formState.clientId)
          setStartDate(formState.startDate)
          setEndDate(formState.endDate)
          setStartTime(formState.startTime)
          setEndTime(formState.endTime)
          setZipCode(formState.zipCode)
          setAddressName(formState.addressName)
          setAddressNumber(formState.addressNumber)
          setAddressComplement(formState.addressComplement)
          setDistrict(formState.district)
          setState(formState.state)
          setCity(formState.city)
          setType(formState.type)
          setEstimatedAudience(formState.estimatedAudience)
          setTotalAmount(formState.totalAmount)

          if (event.clientId) {
            const client = await fetchClientById(event.clientId)
            setClientId(client.id)
            setClientName(client.fullName)
          }

          if (event.id) {
            const eventMaterials = await fetchEventMaterials(event.id)
            setMaterials(eventMaterials)
          }
        }
      } catch (error) {
        console.error('Error fetching event or client details:', error)
      }
    }

    fetchEventAndClient()
  }, [eventId])

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
        errorSetter(requiredFieldError())
        isValid = false
      } else {
        errorSetter('')
      }
    })

    if (!isValid) return

    try {
      const body = mapFormStateToUpdatePayload({
        name,
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
        materials: sendMaterial,
        totalAmount,
        type,
      })

      await updateEvent(eventId, body)
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
      const data = await fetchMaterialsByCategory(category)
      const categoryMaterials = data.map((material: any) => ({
        name: material.name,
        id: material.id,
        price: material.price,
      }))
      setSMaterials(categoryMaterials)
      setSelectedCategory(categoryName)
    } catch (error) {
      console.error('Error fetching materials:', error)
    }
  }

  const totalAmountConverted = formatCurrency(Number(totalAmount))

  const handleBlur = (fieldName: keyof typeof fieldErrorMap) => {
    const fieldErrorMap = {
      name: { value: name, setError: setNameError },
      estimatedAudience: { value: estimatedAudience, setError: setEstimatedAudienceError },
      zipCode: { value: zipCode, setError: setZipCodeError },
      addressName: { value: addressName, setError: setAddressNameError },
      addressNumber: { value: addressNumber, setError: setAddressNumberError },
    }

    const field = fieldErrorMap[fieldName]

    if (!field.value) {
      field.setError(requiredFieldError())
    } else {
      field.setError('')
    }
  }

  return {
    name,
    setName,
    nameError,
    clientId,
    clientName,
    clients,
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
    sMaterials,
    getMaterialValues,
    materialQnt,
    handleMaterialQuantityChange,
    handleAddMaterial,

    materials,
    removeMaterial,
    totalAmountConverted,

    handleBlur,
    handleUpdate,
  }
}
