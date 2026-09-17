import { documentIdConverter, formatPhoneNumber } from "@/functions/functions"

export const clientMapper = (client: any) => ({
  id: client.id,
  fullName: client.fullName,
  email: client.email,
  documentId: documentIdConverter(client.documentId),
  phoneNumber: formatPhoneNumber(client.phoneNumber),
})