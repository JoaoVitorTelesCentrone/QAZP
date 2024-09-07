'use client'

import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { clientColumns } from './columns'
import { ClientTable } from './ClientTable'
import axios from 'axios'
import { intl } from '../../i18n'
import ClipLoader from 'react-spinners/ClipLoader'
import { clientChangeAtom } from '../atoms/clientChangeAtom'
import { IoPeopleOutline } from 'react-icons/io5'
import { Button, Tooltip } from 'antd'
import UserSideMenu from '../components/UserHeader'
import { FaUserPlus } from 'react-icons/fa'

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
        <UserSideMenu />
        <div className="bg-tertiary h-screen">
          <div className="p-10 ">
            <div className="flex mt-4 justify-between w-full">
              <div className="flex ml-72">
                <IoPeopleOutline className=" w-16 h-16 p-1 rounded-full my-5 text-primary border-2 border-primary" />

                <h1 className=" text-7xl my-4 font-bold mx-4 text-secondary-foreground">
                  Clientes
                </h1>
              </div>
              <Button
                icon={<FaUserPlus className="w-5 h-5 " />}
                type="primary"
                className="mt-8"
                size="large"
              >
                <Link href="/CreateClient" className="text-lg">
                  Criar novo cliente
                </Link>
              </Button>
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
