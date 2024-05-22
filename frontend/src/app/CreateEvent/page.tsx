'use client'
import React, { useState, useEffect } from 'react'
import UserSideMenu from '../components/UserHeader'
import axios from 'axios'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { Input } from '@/components/ui/input'

type ClientProps = {
  id: string
  name: string
  documentId: string
  email: string
}

const CreateEvent = () => {
  const [clients, setClients] = useState<ClientProps[]>([])
  const [clientEmail, setCLientEmail] = useState('')
  const [clientDocument, setCLientDocument] = useState('')
  const [clientName, setCLientName] = useState('')

  const getClients = async () => {
    try {
      const response = await axios.get('http://localhost:5196/api/Client')
      console.log(response.data)
      const clientNames = response.data.map((client: any) => ({
        name: client.fullName, documentId: client.documentId, id: client.id, email: client.email
      }))

      setClients(clientNames)
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }

  useEffect(() => {
    getClients()
  }, [])


  const getCLienInputValues = (email: string, documentId:string, name:string ) => { 
    setCLientEmail(email)
    setCLientDocument(documentId)
    setCLientName(name)
  }
  return (
    <div>
      <UserSideMenu />
      <div className=''>
        <h1 className='text-4xl font-bold mx-32 my-8'>Criar evento</h1>
        <form action="" className='flex justify-around'>
          <DropdownMenu>
            <DropdownMenuTrigger>Selecione um cliente</DropdownMenuTrigger>
            <DropdownMenuContent>
              {clients.map((client, index) => (
                <DropdownMenuItem onClick={() => getCLienInputValues(client.email, client.documentId, client.name)} key={index}>{client.name}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex flex-col">
            <h1 className='p-2'>Nome</h1>
            <h1  className='p-2 border-2 rounded-xl'>{clientName}</h1>
          </div>

          <div className="flex flex-col">
            <h1 className='p-2'>Email</h1>
            <h1 className='p-2 border-2 rounded-xl'>{clientEmail}</h1>
          </div>

          <div className="flex flex-col">
            <h1 className='p-2'>Documento</h1>
            <h1  className='p-2 border-2 rounded-xl'>{clientDocument}</h1>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent
