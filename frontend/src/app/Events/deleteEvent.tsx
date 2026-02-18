import axios from "axios"
import { useAtom } from "jotai"
import { eventChangeAtom } from "../atoms/eventChangeAtom"
import { DeleteAction } from "../components/DeleteAction"

type DeleteEventProps = {
  eventId: string
}

const DeleteEvent: React.FC<DeleteEventProps> = ({ eventId }) => {
  const [, setEventChange] = useAtom(eventChangeAtom)

  const handleDelete = async () => {
    await axios.patch(`http://localhost:5196/api/Event/${eventId}`, {
      isActive: false,
    })

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
