import { useAtom } from 'jotai'
import { quoteChangeAtom } from '../../atoms/changeQuoteAtom'
import { DeleteAction } from '../../components/DeleteAction'
import { deleteQuote } from '../services/quoteService'

type DeleteQuoteProps = {
  quoteId: string
}

const DeleteQuote: React.FC<DeleteQuoteProps> = ({ quoteId }) => {
  const [, setQuoteChange] = useAtom(quoteChangeAtom)

  const handleDelete = async () => {
    await deleteQuote(quoteId)
    setQuoteChange(prev => prev + 1)
  }

  return (
    <div>
      <DeleteAction
        title="Deletar Orçamento"
        description="Você tem certeza que deseja deletar este orçamento?"
        onDelete={handleDelete}
        iconSize="md"
      />
    </div>
  )
}

export default DeleteQuote
