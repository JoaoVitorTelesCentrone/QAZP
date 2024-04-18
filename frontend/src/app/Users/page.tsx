'use client'
import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { columns, type Users } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { UsersTable } from './UsersTable';
import axios from 'axios';



const Users = () => {
  const [userData, setUserData] = useState([])

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get('http://localhost:5196/api/User');
         
        setUserData(response.data)

      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        throw error
      }
    }
    fetchUserData()
  }, [])
  
  
  return (
    <div className=''>
        <UserHeader />
        <div className='flex my-20 mx-10 justify-between'>
            <h1 className='text-4xl font-bold uppercase text-secondary-foreground'>Usuários</h1>
            <Link className='flex bg-secondary-foreground p-4 rounded-xl text-white' href='/CreateUser'>Criar usuário<Plus className='h-4 w-4 mt-1 ml-2' /> </Link>
        </div>
        <div className='mx-10 mb-40'>
            <UsersTable data={userData} columns={columns} />
        </div>
    </div>
  )
}

export default Users
