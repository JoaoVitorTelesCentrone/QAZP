export type MaterialType = {
  id: string
  category: string
  name: string
  price: number
  quantity: number
  formatedMaterialPrice: string
}

export type insertMaterialProps = {
  name: string
  quantity: number
  key: string
  price: number
}

export type Mats = {
  materialId: string
  quantity: number
}
