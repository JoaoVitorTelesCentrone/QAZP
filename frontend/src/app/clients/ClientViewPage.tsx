'use client'

import { useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import UserSideMenu from '../components/UserHeader'
import { useClients } from './hooks/useClient'
import ClientsHeader from './components/ClientsHeader'
import ClientsTable from './components/ClientsTable'
import CreateClientModal from './CreateClientModal'

export default function ClientsView() {
  const { clients, loading } = useClients()
  const [openModal, setOpenModal] = useState(false)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#123abc" />
      </div>
    )
  }

  return (
    <>
      <UserSideMenu />

      <div className="bg-tertiary h-screen">

        <ClientsHeader onCreate={() => setOpenModal(true)} />

        <ClientsTable data={clients} />

        {openModal && (
          <CreateClientModal
            isVisible={openModal}
            onClose={() => setOpenModal(false)}
          />
        )}

      </div>
    </>
  )
}