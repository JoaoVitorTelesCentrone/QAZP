'use client'
import { Button } from '@/components/ui/button'
import { Edit3Icon } from 'lucide-react'
import React, { useState } from 'react'
import UserForm from './UserForm'


const EditUser = () => {
    const [editModal, setEditModal] = useState(false)
  return (
    <div>
      <Edit3Icon className='cursor-pointer' onClick={() => setEditModal(true)} />
      {editModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white shadow-lg shadow-slate-600 rounded-lg p-8" >
                <UserForm closeModal={() => setEditModal(false)} />
            </div>
        </div>
      )}
    </div>
  )
}

export default EditUser
