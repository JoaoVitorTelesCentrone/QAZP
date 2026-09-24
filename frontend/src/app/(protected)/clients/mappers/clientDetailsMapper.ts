type MaskType = 'document' | 'zip' | 'phone'

function applyMask(value: string, type: MaskType): string {
  if (!value) return value

  if (type === 'document') {
    return value.length === 11
      ? value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
      : value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
  }

  if (type === 'zip') {
    return value.replace(/(\d{5})(\d{3})/, "$1-$2")
  }

  if (type === 'phone') {
    return value.length === 10
      ? value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
      : value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  return value
}

export const clientDetailsMapper = (data: any) => ({
  ...data,
  documentId: applyMask(data.documentId, 'document'),
  phoneNumber: applyMask(data.phoneNumber, 'phone'),
  zipCode: applyMask(data.zipCode, 'zip')
})