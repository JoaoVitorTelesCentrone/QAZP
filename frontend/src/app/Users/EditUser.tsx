'use client'
import { Button } from '@/components/ui/button'
import { Edit3Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import UserForm from './UserForm'
import axios from 'axios'
import { stringify } from 'querystring'

type editUserProps = {
  userId: string
}

interface userDataProps {
  name: string
  userName: string
  password: string
}

const EditUser: React.FC<editUserProps> = ({userId}) => {
    const [editModal, setEditModal] = useState(false)
    const [userData, setUserData] = useState<userDataProps | undefined>(undefined)

    useEffect(() => {
      if (editModal) {
        fetchUserData();
        console.log(userData)
      }
    }, [editModal]);

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5196/api/User/userName/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  return (
    <div>
      <Edit3Icon className='cursor-pointer h-4 w-4' onClick={() => setEditModal(true)} />
      {editModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white shadow-lg shadow-slate-600 rounded-lg p-8" >
                <UserForm userData={userData} closeModal={() => setEditModal(false)} />
            </div>
        </div>
      )}
    </div>
  )
}

export default EditUser
