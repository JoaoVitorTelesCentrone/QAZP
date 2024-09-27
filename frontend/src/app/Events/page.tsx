'use client'
import React, { useEffect, useState } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ClipLoader from 'react-spinners/ClipLoader'
import { EventTable } from './EventTable'
import axios from 'axios'
import { Events, eventsColumns } from './columns'
import { eventChangeAtom } from '../atoms/eventChangeAtom'
import { TbCalendarPlus } from 'react-icons/tb'
import { Button, Tooltip } from 'antd'
import { GiGlassCelebration } from 'react-icons/gi'
import UserSideMenu from '../components/UserHeader'
import { documentIdConverter } from '@/functions/functions'
import { clientsAtom } from '../CreateEvent/page'

const Page = () => {
  const [auth, isAuth] = useAtom(authAtom)
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState<Events[]>([])
  const [eventChange] = useAtom(eventChangeAtom)
  const [clients, setClients] = useAtom(clientsAtom)

  if (!auth) {
    redirect('/')
  }

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5196/api/Client')
        const clientNames = response.data.map((client: any) => ({
          name: client.fullName,
          documentId: documentIdConverter(client.documentId),
          id: client.id,
          email: client.email,
        }))
        setClients(clientNames)
      } catch (error) {
        console.error('Error fetching clients:', error)
      }
    }
    fetchClients()
  }, [])

  const getEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5196/api/Event')
      setEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  useEffect(() => {
    getEvents()
  }, [eventChange])

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      getEvents()
      await new Promise(resolve => setTimeout(resolve, 500))
      setLoading(false)
    }
    fetch()
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
            <div className="p-10 ">
              <div className="flex mt-4 justify-between w-full">
                <div className="flex ml-48">
                  <GiGlassCelebration className=" w-16 h-16 p-1 rounded-full my-4 text-primary border-2 border-primary" />

                  <h1 className="font-monospace font-semibold text-7xl my-3 mx-4 text-secondary-foreground">
                    Eventos
                  </h1>
                </div>
                <Button
                  icon={<TbCalendarPlus className="w-5 h-5 " />}
                  type="primary"
                  className="mt-8"
                  size="large"
                >
                  <Link href="/CreateEvent" className="text-lg">
                    Criar evento
                  </Link>
                </Button>
              </div>
            </div>
            <div className="ml-56 mr-10">
              <EventTable columns={eventsColumns} data={events} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Page
