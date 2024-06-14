import axios from 'axios'
import { Edit3Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ClientForm from './ClientForm'

type EditClientProps = {
  userId: string
}

type ClientDataProps = {
  fullName: string
  documentId: string
  phoneNumber: string
  email: string
  zipCode: string
  addressName: string
  addressNumber: string
  addressComplement: string
  district: string
  state: string
  city: string
}

const EditClient: React.FC<EditClientProps> = ({ userId }) => {
  const [openModal, setOpenModal] = useState(false)
  const [clientData, setClientData] = useState<ClientDataProps | undefined>(
    undefined,
  )

  useEffect(() => {
    fetchUserData()
  }, [openModal])

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5196/api/Client/id/${userId}`,
      )
      setClientData(response.data)
      console.log(clientData)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  return (
    <div>
      <Edit3Icon
        className="h-4 w-4 cursor-pointer"
        onClick={() => setOpenModal(true)}
      />
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <ClientForm
            clientData={clientData}
            closeModal={() => setOpenModal(false)}
          />
        </div>
      )}
    </div>
  )
}

export default EditClient
