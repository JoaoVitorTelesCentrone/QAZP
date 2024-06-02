import { TrashIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Toaster } from 'sonner'
import DeleteModal from '../components/DeleteModal'

type deleteClientProps = {
    userId: string
}

const DeleteClient: React.FC<deleteClientProps> = ({userId}) => {
    const [openClientModal, setClientModal] = useState(false)
    
    const handleRequest = () => {
        console.log('voce é brabo')
    }
    return (
    <div>
      <div>
      <Toaster richColors />
      <TrashIcon className='cursor-pointer h-4 w-4' onClick={() => setClientModal(true)} />
      {openClientModal && (
          <DeleteModal deleteRequest={() => handleRequest}  />
      )}
    </div>
    </div>
  )
}

export default DeleteClient
