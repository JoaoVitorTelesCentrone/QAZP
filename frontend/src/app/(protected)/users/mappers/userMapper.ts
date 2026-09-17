export interface UserApi {
  id: string
  name: string
  username: string
  password?: string
  role?: number
  createdDate?: string
}

export interface UserFormData {
  id?: string
  name: string
  username: string
  password: string
  role?: number
}

export const mapApiToForm = (apiData: UserApi): UserFormData => ({
  id: apiData.id,
  name: apiData.name,
  username: apiData.username,
  password: apiData.password || '',
  role: apiData.role,
})

export const mapFormToApi = (formData: UserFormData): UserApi => ({
  id: formData.id!,
  name: formData.name,
  username: formData.username,
  password: formData.password,
  role: formData.role,
})