"use client"

import React from 'react'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import { useAtom } from 'jotai'
import UserHeader from '../components/UserHeader'
import NextEvents from '../components/user-home/Next-events'
import { ClientTable } from '../clients/ClientTable'
import { mockedClientData } from '../clients/page'
import { clientColumns } from '../clients/columns'


const Dashboard = () => {
    const [isLogged, setIsLogged] = useAtom(authAtom)

    if(!isLogged){
        redirect('/login')
    }
  return (
    <div>
        <UserHeader />
        <NextEvents />
        <div className='m-32'>
          <h1 className='text-4xl uppercase font-bold text-secondary-foreground my-2'>Clientes</h1>
          <ClientTable data={mockedClientData} columns={clientColumns} />
        </div>
        

    </div>
  )
}

export default Dashboard