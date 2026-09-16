import dayjs, { Dayjs } from 'dayjs'
import { EditEventMaterialToSend, EditEventUpdatePayload } from '../types/editEventTypes'

export const applyZipCodeMask = (value: string): string =>
  value.replace(/(\d{5})(\d{3})/, '$1-$2')

export const removeZipCodeMask = (value: string): string =>
  value.replace(/\D/g, '')

export const formatZipCodeInput = (value: string): string =>
  value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})$/, '$1-$2')

export const mapEventResponseToFormState = (event: any) => ({
  name: event.name,
  clientId: event.clientId,
  startDate: event.startDate ? dayjs(event.startDate) : null,
  endDate: event.endDate ? dayjs(event.endDate) : null,
  startTime: event.startTime ? dayjs(event.startTime, 'HH:mm:ss') : null,
  endTime: event.endTime ? dayjs(event.endTime, 'HH:mm:ss') : null,
  zipCode: applyZipCodeMask(event.zipCode || ''),
  addressName: event.addressName || '',
  addressNumber: event.addressNumber || '',
  addressComplement: event.addressComplement || '',
  district: event.district || '',
  state: event.state || '',
  city: event.city || '',
  type: event.type,
  estimatedAudience: event.estimatedAudience || 0,
  totalAmount: event.totalAmount,
})

type UpdatePayloadInput = {
  name: string
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
  materials: EditEventMaterialToSend[]
  totalAmount: number | undefined
  type: string
}

export const mapFormStateToUpdatePayload = (
  form: UpdatePayloadInput,
): EditEventUpdatePayload => ({
  name: form.name,
  clientId: form.clientId,
  startDate: form.startDate ? form.startDate.format('YYYY-MM-DD') : '',
  endDate: form.endDate ? form.endDate.format('YYYY-MM-DD') : '',
  startTime: form.startTime ? form.startTime.format('HH:mm:ss') : '',
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
  type: form.type,
  status: 0,
})
