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
import { QuoteTable } from '../quote/QuoteTable'
import { quoteColumns } from '../quote/column'
import { mockedQuotes } from '../quote/page'


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
        <div className='m-32'>
          <h1 className='text-4xl uppercase font-bold text-secondary-foreground my-2'>Orçamentos</h1>
          <QuoteTable data={mockedQuotes} columns={quoteColumns} />
        </div>
    </div>
  )
}

export default Dashboard