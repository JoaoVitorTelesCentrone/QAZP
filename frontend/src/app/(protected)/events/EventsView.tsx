'use client'

import Link from 'next/link'
import ClipLoader from 'react-spinners/ClipLoader'
import { TbCalendarPlus } from 'react-icons/tb'
import { Button } from 'antd'
import { GiGlassCelebration } from 'react-icons/gi'
import GenericTable from '../../components/GenericTable'
import { Input } from '@/components/ui/input'
import { eventsColumns } from './columns'
import { EventProps } from './types/eventTypes'

interface EventsViewProps {
  loading: boolean
  events: EventProps[]
}

export default function EventsView({ loading, events }: EventsViewProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={'#123abc'} loading={loading} />
      </div>
    )
  }

  return (
    <div>
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
              icon={<TbCalendarPlus className="w-5 h-5" />}
              type="primary"
              className="mt-8"
              size="large"
            >
              <Link href="/create-event" className="text-lg">
                Criar evento
              </Link>
            </Button>
          </div>
        </div>
        <div className="bg-tertiary">
          <div className="ml-56 mr-10">
            <GenericTable columns={eventsColumns} data={events}>
              {(table) => (
                <>
                  <Input
                    placeholder="Filtrar por nome"
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(e) =>
                      table.getColumn('name')?.setFilterValue(e.target.value)
                    }
                    className="max-w-sm my-10 mx-auto border-primary text-center font-bold"
                  />
                </>
              )}
            </GenericTable>
          </div>
        </div>
      </div>
    </div>
  )
}
