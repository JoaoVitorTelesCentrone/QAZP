'use client'

import { BsFillPersonVcardFill } from 'react-icons/bs'

import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, Calendar, Handshake } from 'lucide-react'
import { clientColumns } from './columns'
import { ClientTable } from './ClientTable'
import axios from 'axios'
import { intl } from '../../i18n'
import ClipLoader from 'react-spinners/ClipLoader'
import { clientChangeAtom } from '../atoms/clientChangeAtom'
import { FaUserPlus } from 'react-icons/fa'
import { Tooltip } from 'antd'

const Clients = () => {
  const [isLogged, setIsLogged] = useAtom(authAtom)
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(false)
  const [clientChange, setClientChange] = useAtom(clientChangeAtom)

  useEffect(() => {
    fetchUserData()
  }, [clientChange])

  async function fetchUserData() {
    try {
      const response = await axios.get('http://localhost:5196/api/Client')
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
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={'#123abc'} loading={loading} />
        </div>
      ) : (
        <>
          <UserHeader />
          <div className="bg-tertiary h-screen">
            <div className="p-10 ">
              <div className="flex mt-4 justify-between w-full">
                <div className="flex">
                  <h1 className=" text-7xl my-12 font-bold ml-72 text-secondary-foreground">
                    {intl.formatMessage({ id: 'client.page.title' })}
                  </h1>
                  <Tooltip title={'Criar cliente'}>
                    <Link href="/CreateClient">
                      <FaUserPlus className="bg-primary w-16 h-16 p-4 rounded-full m-14 text-white" />
                    </Link>
                  </Tooltip>
                </div>
                <BsFillPersonVcardFill className="w-48 h-48 mr-8 text-cyan-900" />
              </div>
            </div>
            <div className="ml-72 mr-10">
              <ClientTable columns={clientColumns} data={clients} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Clients
