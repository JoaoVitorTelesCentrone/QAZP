'use client'

import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { clientColumns } from './columns'
import { ClientTable } from './ClientTable'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'
import { clientChangeAtom } from '../atoms/clientChangeAtom'
import { Button } from 'antd'
import UserSideMenu from '../components/UserHeader'
import { FaUserPlus, FaUsers } from 'react-icons/fa'
import CreateClientModal from './CreateClientModal'
import { documentIdConverter, formatPhoneNumber } from '@/functions/functions'
import withAuth from '../hoc/withAuth'; 
const Clients = () => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [clientChange, setClientChange] = useAtom(clientChangeAtom)
  const [openModal, setOpenModal] = useState(false)

  // Busca de dados dos clientes
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5196/api/Client/active')
        const clientsData = response.data.map((client: any) => ({
          fullName: client.fullName,
          documentId: documentIdConverter(client.documentId),
          id: client.id,
          email: client.email,
          phoneNumber: formatPhoneNumber(client.phoneNumber),
        }))
        setClients(clientsData)
      } catch (error) {
        console.error('Error fetching client data:', error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 100)
      }
    }

    fetchUserData()
  }, [clientChange])

  return (
    <div>
      {openModal && (
        <CreateClientModal
          isVisible={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={'#123abc'} loading={loading} />
        </div>
      ) : (
        <>
          <UserSideMenu />
          <div className="bg-tertiary h-screen">
            <div className="p-10">
              <div className="flex mt-4 justify-between w-full">
                <div className="flex ml-48">
                  <FaUsers className=" w-16 h-16 p-1 rounded-full my-5 text-primary border-2 border-primary" />
                  <h1 className="font-monospace font-semibold text-primary text-7xl my-4 mx-4 text-secondary-foreground">
                    Clientes
                  </h1>
                </div>
                <Button
                  icon={<FaUserPlus className="w-5 h-5 " />}
                  type="primary"
                  className="mt-8"
                  size="large"
                  onClick={() => setOpenModal(true)}
                >
                  <h1 className="text-lg">Criar cliente</h1>
                </Button>
              </div>
            </div>
            <div className='bg-tertiary'>
            <div className="ml-56 mr-10">
              <ClientTable columns={clientColumns} data={clients} />
            </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default withAuth(Clients) // Encapsulando a página com withAuth
