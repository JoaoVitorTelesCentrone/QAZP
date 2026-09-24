import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { clientChangeAtom } from "../../atoms/clientChangeAtom"
import { clientService } from "../services/clientService"
import { clientMapper } from "../mappers/clientMapper"

export const useClients = () => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [clientChange] = useAtom(clientChangeAtom)

  useEffect(() => {
    fetchClients()
  }, [clientChange])

  const fetchClients = async () => {
    try {
      const data = await clientService.getActiveClients()
      setClients(data.map(clientMapper))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    clients,
    loading
  }
}