'use client'
import React, { useEffect, useState } from 'react'
import UserSideMenu from '../components/UserHeader'
import { useAtom, useSetAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ClipLoader from 'react-spinners/ClipLoader'
import { EventTable } from './EventTable'
import axios from 'axios'
import { Users } from 'lucide-react'
import { Events, eventsColumns } from './columns'
import { eventChangeAtom } from '../atoms/eventChangeAtom'

const Page = () => {
  const [auth, isAuth] = useAtom(authAtom)
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState<Events[]>([])
  const [eventChange] = useAtom(eventChangeAtom)

  if (!auth) {
    redirect('/login')
  }

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
          <UserHeader />
          <div className="p-20 justify-between flex">
            <h1 className="ml-48 uppercase text-4xl font-bold text-secondary-foreground ">
              Eventos
            </h1>
            <Link
              className="bg-primary flex p-4 rounded-xl text-white"
              href="/CreateEvent"
            >
              Criar evento
              <Plus className="h-4 w-4 mt-1 ml-2" />{' '}
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Page
