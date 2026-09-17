'use client'

import { toast } from "sonner"
import { useAtom } from "jotai"
import { intl } from "@/i18n"
import { clientChangeAtom } from "../../atoms/clientChangeAtom"
import { DeleteAction } from "../../components/DeleteAction"
import { clientService } from "../services/clientService"
import { DeleteClientProps } from '../types/clientTypes'

export default function DeleteClient({ userId }: DeleteClientProps) {
  const [, setClientChange] = useAtom(clientChangeAtom)

  const deleteData = async () => {
    try {
      await clientService.deleteClient(userId)

      setClientChange(prev => prev + 1)

      toast.success(
        intl.formatMessage({
          id: "delete.client.success.message"
        })
      )
    } catch (error) {
      console.error("Erro ao deletar cliente", error)

      toast.error(
        intl.formatMessage({
          id: "delete.client.error.message"
        })
      )
    }
  }

  return (
    <DeleteAction
      title="Deletar Cliente"
      description="Você tem certeza que deseja deletar este cliente?"
      onDelete={deleteData}
      iconSize="md"
    />
  )
}