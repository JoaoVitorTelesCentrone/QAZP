'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { useAtom } from 'jotai'
import Link from 'next/link'
import ClipLoader from 'react-spinners/ClipLoader'
import { EventTable } from './EventTable'
import axios from 'axios'
import { Events, eventsColumns } from './columns'
import { eventChangeAtom } from '../atoms/eventChangeAtom'
import { TbCalendarPlus } from 'react-icons/tb'
import { Button } from 'antd'
import { GiGlassCelebration } from 'react-icons/gi'
import UserSideMenu from '../components/UserHeader'
import {
  eventTypeNameConverter,
  formatCurrency,
  formatDate,
} from '@/functions/functions'
import withAuth from '../hoc/withAuth'
const Page = () => {
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState<Events[]>([])
  const [eventChange] = useAtom(eventChangeAtom)

  const fetchEvents = useCallback(async () => {
    try {
      const eventsResponse = await axios.get(
        'http://localhost:5196/api/Event/active-events',
      )

      const events = eventsResponse.data.map((event: any) => ({
        id: event.id,
        name: event.name,
        type: eventTypeNameConverter(event.type),
        startDate: event.startDate
          ? formatDate(event.startDate)
          : 'Data não disponível',
        endDate: event.endDate
          ? formatDate(event.endDate)
          : 'Data não disponível',
        estimatedAudience: event.estimatedAudience,
        totalAmount: formatCurrency(event.totalAmount),
        clientName: event.clientFullName,
      }))

      setEvents(events)
      console.log(events)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 100)
    }
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents, eventChange])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={'#123abc'} loading={loading} />
      </div>
    )
  }

  return (
    <div>
      <UserSideMenu />
      <div className="bg-tertiary h-screen">
        <div className="p-10">
          <div className="flex mt-4 justify-between w-full">
            <div className="flex ml-48">
              <GiGlassCelebration className="w-16 h-16 p-1 rounded-full my-4 text-primary border-2 border-primary" />
              <h1 className="font-monospace font-semibold text-7xl my-3 mx-4 text-secondary-foreground">
                Eventos
              </h1>
            </div>
            <Button
              data-testid='create-event-events-btn'
              icon={<TbCalendarPlus className="w-5 h-5" />}
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
        <div className="bg-tertiary">
          <div className="ml-56 mr-10">
            <EventTable 
              data-testid={`event-table-${eventsColumns}-${events}`}
              columns={eventsColumns} 
              data={events} 
             />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(Page) // Encapsulando com withAuth
