import { Edit3Icon } from 'lucide-react'
import React from 'react'

type EditClientProps = {
    userId: string
}

const EditClient: React.FC<EditClientProps> = ({userId}) => {
  return (
    <div>
      <Edit3Icon className='h-4 w-4 cursor-pointer' />
    </div>
  )
}

export default EditClient
