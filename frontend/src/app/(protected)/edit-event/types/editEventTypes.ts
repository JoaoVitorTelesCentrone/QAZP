import { Dayjs } from 'dayjs'

export type EditEventMaterial = {
  materialId: string
  materialName: string
  quantity: number
  materialPrice: number
}

export type EditEventMaterialToSend = {
  materialId: string
  quantity: number
}

export type EditEventFormState = {
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
  type: string
  totalAmount: number | undefined
  materials: EditEventMaterialToSend[]
}

export type EditEventUpdatePayload = {
  name: string
  clientId: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
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
  status: number
}
