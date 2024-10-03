import { EventType, MaterialCategory } from '@/enuns/enuns'
import { intl } from '@/i18n'

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function materialCategoryNameConverter(
  materialCategory: MaterialCategory,
) {
  let convertedMaterialCategory

  switch (materialCategory) {
    case (materialCategory = MaterialCategory.Food):
      convertedMaterialCategory = `${intl.formatMessage({
        id: 'material.category.food',
      })}`
      break
    case (materialCategory = MaterialCategory.Decoration):
      convertedMaterialCategory = `${intl.formatMessage({
        id: 'material.category.decoration',
      })}`
      break
    case (materialCategory = MaterialCategory.Utensils):
      convertedMaterialCategory = `${intl.formatMessage({
        id: 'material.category.utensils',
      })}`
      break
    case (materialCategory = MaterialCategory.Furniture):
      convertedMaterialCategory = `${intl.formatMessage({
        id: 'material.category.furniture',
      })}`
      break
    case (materialCategory = MaterialCategory.HumanResources):
      convertedMaterialCategory = `${intl.formatMessage({
        id: 'material.category.humanResources',
      })}`
      break
    case (materialCategory = MaterialCategory.RealEstate):
      convertedMaterialCategory = `${intl.formatMessage({
        id: 'material.category.realEstate',
      })}`
      break
    case (materialCategory = MaterialCategory.Entertainment):
      convertedMaterialCategory = `${intl.formatMessage({
        id: 'material.category.entertainment',
      })}`
      break
    case (materialCategory = MaterialCategory.Marketing):
      convertedMaterialCategory = `${intl.formatMessage({
        id: 'material.category.marketing',
      })}`
      break
  }
  return convertedMaterialCategory
}

export function eventTypeNameConverter(eventType: EventType) {
  let convertedEventType

  switch (eventType) {
    case (eventType = EventType.Wedding):
      convertedEventType = `${intl.formatMessage({
        id: 'event.type.wedding',
      })}`
      break
    case (eventType = EventType.TradeShow):
      convertedEventType = `${intl.formatMessage({
        id: 'event.type.tradeShow',
      })}`
      break
    case (eventType = EventType.Party):
      convertedEventType = `${intl.formatMessage({
        id: 'event.type.party',
      })}`
      break
    case (eventType = EventType.Festival):
      convertedEventType = `${intl.formatMessage({
        id: 'event.type.festival',
      })}`
      break
    case (eventType = EventType.Workshop):
      convertedEventType = `${intl.formatMessage({
        id: 'event.type.workshop',
      })}`
      break
    case (eventType = EventType.Exhibition):
      convertedEventType = `${intl.formatMessage({
        id: 'event.type.exhibition',
      })}`
      break
    case (eventType = EventType.Launch):
      convertedEventType = `${intl.formatMessage({
        id: 'event.type.launch',
      })}`
      break
    case (eventType = EventType.Championship):
      convertedEventType = `${intl.formatMessage({
        id: 'event.type.championship',
      })}`
      break
    case (eventType = EventType.Convention):
      convertedEventType = `${intl.formatMessage({
        id: 'event.type.convention',
      })}`
      break
    case (eventType = EventType.Ball):
      convertedEventType = `${intl.formatMessage({
        id: 'event.type.ball',
      })}`
      break
    case (eventType = EventType.Seminar):
      convertedEventType = `${intl.formatMessage({
        id: 'event.type.seminar',
      })}`
      break
    case (eventType = EventType.Meeting):
      convertedEventType = `${intl.formatMessage({
        id: 'event.type.meeting',
      })}`
      break
    case (eventType = EventType.Campaign):
      convertedEventType = `${intl.formatMessage({
        id: 'event.type.campaign',
      })}`
      break
    case (eventType = EventType.Ceremony):
      convertedEventType = `${intl.formatMessage({
        id: 'event.type.ceremony',
      })}`
      break
    case (eventType = EventType.Symposium):
      convertedEventType = `${intl.formatMessage({
        id: 'event.type.symposium',
      })}`
      break
  }
  return convertedEventType
}

export function documentIdConverter(documentId: string) {
  let formatedDocumentId

  if (documentId.length == 11) {
    const documentPart1 = documentId.substring(0, 3)
    const documentPart2 = documentId.substring(3, 6)
    const documentPart3 = documentId.substring(6, 9)
    const documentPart4 = documentId.substring(9, 11)

    return formatedDocumentId = `${documentPart1}.${documentPart2}.${documentPart3}-${documentPart4}`
  } else if (documentId.length == 14) {
    const documentPart1 = documentId.substring(0, 2)
    const documentPart2 = documentId.substring(2, 5)
    const documentPart3 = documentId.substring(5, 8)
    const documentPart4 = documentId.substring(8, 12)
    const documentPart5 = documentId.substring(12, 14)

    return formatedDocumentId = `${documentPart1}.${documentPart2}.${documentPart3}/${documentPart4}-${documentPart5}`
  } else if (documentId == null) {
    return
  } else {
    return documentId
  }
}

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

export function formatPhoneNumber(phoneNumber: string) {
  if (phoneNumber.length == 11) {
    const DDD = phoneNumber.substring(0, 2)
    const phoneNumberPart1 = phoneNumber.substring(2, 7)
    const phoneNumberPart2 = phoneNumber.substring(7, 11)

    return `(${DDD}) ${phoneNumberPart1}-${phoneNumberPart2}`
  } else if (phoneNumber.length == 10) {
    const DDD = phoneNumber.substring(0, 2)
    const phoneNumberPart1 = phoneNumber.substring(2, 6)
    const phoneNumberPart2 = phoneNumber.substring(6, 10)

    return `(${DDD}) ${phoneNumberPart1}-${phoneNumberPart2}`
  } else {
    return phoneNumber
  }
}
