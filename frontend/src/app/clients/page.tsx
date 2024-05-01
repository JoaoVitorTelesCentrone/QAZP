"use client"

import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Client, clientColumns } from './columns'
import { ClientTable } from './ClientTable'
import axios from 'axios'

const Clients = () => {
  const [isLogged, setIsLogged] = useAtom(authAtom)
  const [clients, setClients] = useState([])

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get('http://localhost:5196/api/Client');

        setClients(response.data)

      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        throw error
      }
    }
    fetchUserData()
  }, [])

  if (!isLogged) {
    redirect('/login')
  }
  return (
    <div>
      <UserHeader />
      <div className='p-20 justify-between flex'>
        <h1 className='uppercase text-4xl font-bold text-secondary-foreground'>Clientes</h1>
        <Link className='flex bg-secondary-foreground p-4 rounded-xl text-white' href='/CreateClient'>Criar cliente<Plus className='h-4 w-4 mt-1 ml-2' /> </Link>
      </div>
      <div className='mx-20 my-10'>
        <ClientTable columns={clientColumns} data={clients} />
      </div>
    </div>
  )
}

export default Clients