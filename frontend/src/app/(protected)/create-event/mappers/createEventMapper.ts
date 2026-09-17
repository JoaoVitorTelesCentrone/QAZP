import { Dayjs } from 'dayjs'
import { documentIdConverter } from '@/functions/functions'
import { ClientProps } from '@/app/atoms/clientsAtom'
import { Mats } from '../types/createEventTypes'

export const mapClientApiToOption = (client: any): ClientProps => ({
  name: client.fullName,
  documentId: documentIdConverter(client.documentId) ?? '',
  id: client.id,
  email: client.email,
})

export const mapMaterialApiToOption = (material: any) => ({
  name: material.name,
  id: material.id,
  price: material.price,
})

export const formatZipCodeInput = (value: string): string => {
  const numericValue = value.replace(/\D/g, '')

  if (numericValue.length <= 5) {
    return numericValue
  }
  return numericValue.replace(/^(\d{5})(\d{0,3})$/, '$1-$2')
}

export const removeZipCodeMask = (value: string): string =>
  value.replace(/\D/g, '')

type CreateEventPayloadInput = {
  eventName: string
  eventType: number
  clientId: string
  startDate: Dayjs | null
  endDate: Dayjs | null
  startTime: Dayjs | null
  endTime: Dayjs | null
  zipCode: string
  addressName: string
  addressNumber: string
  addressComplement: string
  district: string
  state: string
  city: string
  estimatedAudience: string
  materials: Mats[]
  totalAmount: number
}

export const mapFormStateToCreatePayload = (form: CreateEventPayloadInput) => ({
  name: form.eventName,
  type: form.eventType,
  clientId: form.clientId,
  startDate: form.startDate ? form.startDate.format('YYYY-MM-DD') : '',
  startTime: form.startTime ? form.startTime.format('HH:mm:ss') : '',
  endDate: form.endDate ? form.endDate.format('YYYY-MM-DD') : '',
  endTime: form.endTime ? form.endTime.format('HH:mm:ss') : '',
  zipCode: removeZipCodeMask(form.zipCode),
  addressName: form.addressName,
  addressNumber: form.addressNumber,
  addressComplement: form.addressComplement,
  district: form.district,
  state: form.state,
  city: form.city,
  estimatedAudience: form.estimatedAudience,
  materials: form.materials,
  totalAmount: form.totalAmount,
})
