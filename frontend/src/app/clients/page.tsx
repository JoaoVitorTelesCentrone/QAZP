'use client'

import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, Calendar } from 'lucide-react'
import { clientColumns } from './columns'
import { ClientTable } from './ClientTable'
import axios from 'axios'
import { intl } from '../../i18n'
import ClipLoader from 'react-spinners/ClipLoader'

const Clients = () => {
  const [isLogged, setIsLogged] = useAtom(authAtom)
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(false)

  async function fetchUserData() {
    try {
      const response = await axios.get('http://localhost:5196/api/Client')
      console.log(response)
      setClients(response.data)
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
      throw error
    }
  }

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      await Promise.all([fetchUserData()])
      setLoading(false)
    }
    fetch()
  }, [])

  if (!isLogged) {
    redirect('/login')
  }
  return (
    <div className='flex h-screen'>
    <div className='flex-1 flex flex-col bg-quintenary'>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={'#123abc'} loading={loading} />
        </div>
      ) : (
        <>
          <UserHeader />
          <div className='bg-quintenary'>
          <div className="p-10 justify-between flex">
            <h1 className="ml-72 text-4xl font-bold text-secondary-foreground">
              {intl.formatMessage({ id: 'client.page.title' })}     
            </h1>
            <Calendar className="w-12 h-12 text-primary" />
            
            <Link
              className="bg-primary flex p-4 rounded-xl text-white"
              href="/CreateClient"
            >
              {intl.formatMessage({
                id: 'client.page.create.client.button.label',
              })}
              <Plus className="h-4 w-4 mt-1 ml-2" />{' '}
            </Link>
          </div>
          <div className="ml-72 mr-10">
            <ClientTable columns={clientColumns} data={clients} />
          </div>
          </div>
        </>
      )}
    </div>
    </div>
  )
}

export default Clients
