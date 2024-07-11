'use client'

import React, { useEffect, useState } from 'react'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import { useAtom } from 'jotai'
import UserHeader from '../components/UserHeader'
import NextEvents from '../components/user-home/Next-events'
import { ClientTable } from '../clients/ClientTable'
import { clientColumns } from '../clients/columns'
import { QuoteTable } from '../quote/QuoteTable'
import { quoteColumns } from '../quote/column'
import axios from 'axios'

const Dashboard = () => {
  const [isLogged, setIsLogged] = useAtom(authAtom)
  const [numberOfCLients, setNumberOfClients] = useState('')
  const [numberOfUsers, setNumberOfUsers] = useState('')
  if (!isLogged) {
    redirect('/login')
  }

  const getClients = async () => {
    const response = await axios.get('http://localhost:5196/api/Client')
    console.log('Vai toma no cu' + response.data.$values)
    setNumberOfClients(response.data.length)
    console.log(`Numero de clientes ${numberOfCLients}`)
  }

  const getUsers = async () => {
    const response = await axios.get('http://localhost:5196/api/User')
    setNumberOfUsers(response.data.length)
    console.log(`Numero de usuarios ${numberOfUsers}`)
  }

  useEffect(() => {
    getClients()
    getUsers()
  }, [])

  return (
    <div>
      <UserHeader />
      <h1 className="text-4xl font-bold ml-72  uppercase">Dados</h1>
      <div
        className={
          'flex p-4 mx-auto ml-72 mt-2 rounded-xl bg-primary w-[1000px] border-2 border-black'
        }
      >
        <div className="rounded-xl border-2 border-seconadry p-8">
          <h1 className="text-3xl font-bold text-secondary">
            Número de Clientes
          </h1>
          <h1 className="text-6xl text-secondary font-extrabold uppercase">
            {numberOfCLients}
          </h1>
        </div>

        <div className="rounded-xl mx-4 border-2 border-secondary p-8">
          <h1 className="text-3xl font-bold text-secondary">
            Número de Usuários
          </h1>
          <h1 className="text-6xl text-secondary font-extrabold uppercase">
            {numberOfUsers}
          </h1>
        </div>

        <div className="rounded-xl border-2 border-secondary p-8">
          <h1 className="text-3xl text-secondary font-bold">
            Número de Clientes
          </h1>
          <h1 className="text-6xl text-secondary font-extrabold uppercase">
            {numberOfCLients}
          </h1>
        </div>
      </div>
      <div className="ml-40">
        <NextEvents />
      </div>
    </div>
  )
}

export default Dashboard
