export type ClientDataProps = {
  id: string | undefined
  fullName: string | undefined
  documentId: string | undefined
  email: string | undefined
  zipCode: string | undefined
  addressName: string | undefined
  addressComplement: string | undefined
  addressNumber: string | undefined
  district: string | undefined
  state: string | undefined
  city: string | undefined
  createdDate: string | undefined
  isActive: boolean | undefined
  phoneNumber: string | undefined
}

export type EditClientProps = {
  userId: string
}

export type DeleteClientProps = {
  userId: string
}

export type ClientCategoryProps = {
  name: string
  index: number
}

export type CreateClientProps = {
  isVisible: boolean
  onClose: () => void
}

export type Client = {
  id: string
  fullName: string
  documentId: string
  email: string
  phoneNumber: string
}

export type ClientsFiltersProps = {
  table: any
}

export type ClientsHeaderProps = {
  onCreate: () => void
}

export type ClientsTableProps = {
  data: any[]
}