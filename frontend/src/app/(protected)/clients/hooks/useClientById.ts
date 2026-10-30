import { useState } from "react"
import { clientService } from "../services/clientService"
import { clientDetailsMapper } from "../mappers/clientDetailsMapper"
import { logUnexpectedError } from "@/lib/apiClient"

export function useClientById() {
  const [clientData, setClientData] = useState<any>()

  const fetchClient = async (id: string) => {
    try {
      const data = await clientService.getClientById(id)
      setClientData(clientDetailsMapper(data))
    } catch (error) {
      logUnexpectedError("Error fetching client", error)
    }
  }

  return {
    clientData,
    fetchClient
  }
}