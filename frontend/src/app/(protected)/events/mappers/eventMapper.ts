import { eventTypeNameConverter, formatCurrency, formatDate } from '@/functions/functions'
import { EventProps } from '../types/eventTypes'

export const mapEventApiToRow = (event: any): EventProps => ({
  id: event.id,
  name: event.name,
  city: event.city,
  state: event.state,
  type: eventTypeNameConverter(event.type),
  startDate: event.startDate ? formatDate(event.startDate) : 'Data não disponível',
  endDate: event.endDate ? formatDate(event.endDate) : 'Data não disponível',
  estimatedAudience: event.estimatedAudience,
  totalAmount: formatCurrency(event.totalAmount),
  clientName: event.clientFullName,
})
