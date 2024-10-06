import axios from 'axios'
import { Edit3Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type EditMaterialProps = {
  userId: string
}

type MaterialDataProps = {
  id: string | undefined
  fullName: string | undefined
  documentId: string | undefined
  email: string | undefined
  zipCode: string | undefined
  addressName: string | undefined
  addressComplement: string | undefined
  addressNumber: string | undefined
  district: string | undefined
  state: string | undefined
  city: string | undefined
  createdDate: string | undefined
  isActive: boolean | undefined
  phoneNumber: string | undefined
}

const EditMaterial: React.FC<EditMaterialProps> = ({ userId }) => {
  const [openModal, setOpenModal] = useState(false)
  const [MaterialData, setMaterialData] = useState<
    MaterialDataProps | undefined
  >(undefined)

  useEffect(() => {
    fetchUserData()
  }, [openModal])

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5196/api/Material/id/${userId}`,
      )
      setMaterialData(response.data)
      console.log(MaterialData)
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
          <MaterialForm
            MaterialData={MaterialData}
            closeModal={() => setOpenModal(false)}
          />
        </div>
      )}
    </div>
  )
}

export default EditMaterial
