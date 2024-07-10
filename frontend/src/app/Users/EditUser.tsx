'use client'
import { Button } from '@/components/ui/button'
import { Edit3Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EditUserForm from './EditUserForm'
import axios from 'axios'
import { stringify } from 'querystring'

type editUserProps = {
  userId: string
}

interface userDataProps {
  id: string
  name: string
  userName: string
  password: string
}

const EditUser: React.FC<editUserProps> = ({ userId }) => {
  const [editModal, setEditModal] = useState(false)
  const [userDataInput, setUserData] = useState<userDataProps | undefined>(
    undefined,
  )

  useEffect(() => {
    if (editModal) {
      fetchUserData()
    }
  }, [editModal])

  const fetchUserData = async () => {
    try {
      const userResponse = await axios.get(
        `http://localhost:5196/api/User/userName/${userId}`,
      )
      const user = userResponse.data

      if (!user || !user.id) {
        console.error('User not found or ID not provided')
        return
      }

      const response = await axios.get(
        `http://localhost:5196/api/User/id/${user.id}`,
      )
      const userData = response.data

      console.log('Fetched user data:', userData)

      setUserData(response.data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  return (
    <div>
      <Edit3Icon
        className="cursor-pointer h-4 w-4"
        onClick={() => setEditModal(true)}
      />
      {editModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white shadow-lg shadow-slate-600 rounded-lg p-8">
            <EditUserForm
              userData={userDataInput}
              closeModal={() => setEditModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default EditUser
