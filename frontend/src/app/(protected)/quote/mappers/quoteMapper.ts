import { formatPhoneNumber } from '@/functions/functions'

export function mapQuoteToTable(quote: any) {
  return {
    id: quote.id,
    fullName: quote.fullName,
    email: quote.email,
    phoneNumber: formatPhoneNumber(quote.phoneNumber),
    eventType: quote.eventType,
    estimatedAudience: quote.estimatedAudience,
  }
}
