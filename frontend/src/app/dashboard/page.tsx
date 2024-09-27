'use client'

import React, { useEffect, useState } from 'react'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import { useAtom } from 'jotai'
import axios from 'axios'
import { Events, eventsColumns } from './columns'
import { DashboardTable } from './DashboardTable'
import { LucideLineChart, Calendar } from 'lucide-react'
import { userInfoAtom } from '../atoms/userInfoAtom'
import ClipLoader from 'react-spinners/ClipLoader'
import UserSideMenu from '../components/UserHeader'
import { MdEventAvailable } from 'react-icons/md'

const Dashboard = () => {
  const [isLogged] = useAtom(authAtom)
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
      setNumberOfClients(response.data.length.toString())
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5196/api/User')
      setNumberOfUsers(response.data.length.toString())
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const getEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5196/api/Event')
      setNumberOfEvents(response.data.length.toString())
      setEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await Promise.all([getClients(), getUsers(), getEvents()])
      setLoading(false)
    }

    fetchData()
  }, [])

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
            <div className="flex ml-56">
              <LucideLineChart className="w-16 h-16 p-1 rounded-full my-12 mx-2 text-primary border-2 border-primary" />
              <h1 className="font-monospace font-semibold text-6xl my-12  text-secondary-foreground">
                Dashboards operacionais
              </h1>
            </div>
            <div className="flex xl:mx-24 mx-4">
              <div className="flex my-2 xl:w-[1100px] w-[800px] ml-56">
                <div className="rounded-xl bg-gray-700 bg-opacity-10 border-2 border-secondary p-8">
                  <h1 className="text-3xl text-gray-400 font-bold">
                    Número de Clientes
                  </h1>
                  <h1 className="text-6xl text-gray-400 font-extrabold uppercase">
                    {numberOfClients}
                  </h1>
                </div>
                <div className=" rounded-xl mx-4 border-2 bg-gray-700 bg-opacity-10 border-secondary p-8">
                  <h1 className="text-3xl font-bold text-gray-400">
                    Número de Usuários
                  </h1>
                  <h1 className="text-6xl text-gray-400 font-extrabold uppercase">
                    {numberOfUsers}
                  </h1>
                </div>

                <div className=" rounded-xl border-2 bg-gray-700 bg-opacity-10 border-secondary p-8">
                  <h1 className="text-3xl text-gray-400 font-bold">
                    Número de Eventos
                  </h1>
                  <h1 className="text-6xl text-gray-400 font-extrabold uppercase">
                    {numberOfEvents}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex ml-56">
              <MdEventAvailable className=" w-10 h-10 p-1 rounded-full my-9 mx-2 text-primary border-2 border-primary" />
              <h1 className="font-monospace font-bold text-5xl my-8 text-secondary-foreground">
                Próximos eventos
              </h1>
            </div>
            <div className="ml-56 mr-10">
              <DashboardTable columns={eventsColumns} data={events} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
