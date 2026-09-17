import { useAtom } from "jotai"
import { eventChangeAtom } from "../../atoms/eventChangeAtom"
import { DeleteAction } from "../../components/DeleteAction"
import { deleteEvent } from "../services/eventService"

type DeleteEventProps = {
  eventId: string
}

const DeleteEvent: React.FC<DeleteEventProps> = ({ eventId }) => {
  const [, setEventChange] = useAtom(eventChangeAtom)

  const handleDelete = async () => {
    await deleteEvent(eventId)

    setEventChange(prev => prev + 1)
  }

  return (
    <DeleteAction
      title="Deletar Evento"
      description="Você tem certeza que deseja deletar este evento?"
      onDelete={handleDelete}
      iconSize="md"
    />
  )
}

export default DeleteEvent
