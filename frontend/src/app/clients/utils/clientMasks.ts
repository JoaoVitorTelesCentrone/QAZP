export const removeMask = (value: string) => value.replace(/\D/g, '')

export const formatPhoneNumber = (value: string) => {
  const numericValue = value.replace(/\D/g, '')

  if (numericValue.length === 0) return ''

  if (numericValue.length <= 2) {
    return `(${numericValue}`
  }

  if (numericValue.length <= 6) {
    return numericValue.replace(/(\d{2})(\d{0,4})/, '($1) $2')
  }

  if (numericValue.length <= 10) {
    return numericValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  }

  return numericValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

export const formatZipCode = (value: string) => {
  const numericValue = value.replace(/\D/g, '')

  if (numericValue.length <= 5) return numericValue

  return numericValue.replace(/^(\d{5})(\d{0,3})$/, '$1-$2')
}

export const formatDocumentId = (value: string) => {
  const numericValue = value.replace(/\D/g, '')

  if (numericValue.length <= 3) return numericValue

  if (numericValue.length <= 6) {
    return numericValue.replace(/(\d{3})(\d{0,3})/, '$1.$2')
  }

  if (numericValue.length <= 9) {
    return numericValue.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3')
  }

  if (numericValue.length <= 11) {
    return numericValue.replace(
      /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
      '$1.$2.$3-$4',
    )
  }

  return numericValue.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/,
    '$1.$2.$3/$4-$5',
  )
}