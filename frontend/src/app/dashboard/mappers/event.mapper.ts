import { eventTypeNameConverter, formatCurrency, formatDate } from '@/functions/functions'

export function mapEventToTable(event: any) {
  return {
    name: event.name,
    type: eventTypeNameConverter(event.type),
    startDate: event.startDate ? formatDate(event.startDate) : 'Data não disponível',
    endDate: event.endDate ? formatDate(event.endDate) : 'Data não disponível',
    estimatedAudience: event.estimatedAudience,
    totalAmount: formatCurrency(event.totalAmount),
  }
}
