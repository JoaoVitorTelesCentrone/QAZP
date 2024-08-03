'use client'

import React, { useEffect, useState } from 'react'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import { useAtom } from 'jotai'
import UserHeader from '../components/UserHeader'
import axios from 'axios'
import { Events, eventsColumns } from './columns'
import { DashboardTable } from './DashboardTable'
import { LucideLineChart } from 'lucide-react'
import { userInfoAtom } from '../atoms/userInfoAtom'
import ClipLoader from 'react-spinners/ClipLoader'

const Dashboard = () => {
  const [isLogged, setIsLogged] = useAtom(authAtom)
  const [loading, setLoading] = useState(true)
  const [user] = useAtom(userInfoAtom)
  const [numberOfClients, setNumberOfClients] = useState('')
  const [numberOfUsers, setNumberOfUsers] = useState('')
  const [numberOfEvents, setNumberOfEvents] = useState('')
  const [events, setEvents] = useState<Events[]>([])

  if (!isLogged) {
    redirect('/login')
  }

  const getClients = async () => {
    try {
      const response = await axios.get('http://localhost:5196/api/Client')
      setNumberOfClients(response.data.length)
      console.log(`Numero de clientes ${numberOfClients}`)
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5196/api/User')
      setNumberOfUsers(response.data.length)
      console.log(`Numero de usuarios ${numberOfUsers}`)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const getEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5196/api/Event')
      setNumberOfEvents(response.data.length)
      setEvents(response.data)
      console.log(`Numero de eventos ${numberOfEvents}`)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      await Promise.all([getClients(), getUsers(), getEvents()])
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        {/* Menu lateral */}
      </aside>
      <div className="flex-1 flex flex-col">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader size={50} color={'#123abc'} loading={loading} />
          </div>
        ) : (
          <>
            <UserHeader />
            <h1 className="text-4xl font-bold my-10 flex justify-center">
              Seja bem vindo ao Zventos, {user.username}
            </h1>
            <div className="flex justify-center mx-4">
              <div className="flex p-4 my-6 w-full max-w-screen-xl justify-center">
                <div className="rounded-xl bg-gray-700 bg-opacity-10 border-2 border-secondary p-8">
                  <h1 className="text-3xl text-gray-400 font-bold">
                    Número de Clientes
                  </h1>
                  <h1 className="text-6xl text-gray-400 font-extrabold uppercase">
                    {numberOfClients}
                  </h1>
                </div>

                <div className="rounded-xl mx-4 border-2 bg-gray-700 bg-opacity-10 border-secondary p-8">
                  <h1 className="text-3xl font-bold text-gray-400">
                    Número de Usuários
                  </h1>
                  <h1 className="text-6xl text-gray-400 font-extrabold uppercase">
                    {numberOfUsers}
                  </h1>
                </div>

                <div className="rounded-xl border-2 bg-gray-700 bg-opacity-10 border-secondary p-8">
                  <h1 className="text-3xl text-gray-400 font-bold">
                    Número de Eventos
                  </h1>
                  <h1 className="text-6xl text-gray-400 font-extrabold uppercase">
                    {numberOfEvents}
                  </h1>
                </div>
              </div>
              <LucideLineChart className="w-72 h-72 text-gray-300" />
            </div>
            <h1 className="font-bold mt-16 text-4xl flex justify-center">Próximos eventos</h1>
            <div className="flex justify-center mt-8 w-full">
              <div className="w-full max-w-screen-xl">
                <DashboardTable columns={eventsColumns} data={events} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard
