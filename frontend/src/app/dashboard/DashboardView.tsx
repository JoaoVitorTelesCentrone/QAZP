'use client'

import { LucideLineChart } from 'lucide-react'
import { MdEventAvailable } from 'react-icons/md'
import ClipLoader from 'react-spinners/ClipLoader'
import UserSideMenu from '../components/UserHeader'
import { eventsColumns } from './columns'
import { intl } from '@/i18n'
import GenericTable from '../components/GenericTable'

interface DashboardViewProps {
  loading: boolean
  counts: {
    clients: number
    users: number
    events: number
  }
  events: any[]
}

export default function DashboardView({
  loading,
  counts,
  events,
}: DashboardViewProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#123abc" />
      </div>
    )
  }

  return (
    <div>
      <UserSideMenu />

      <div className="bg-tertiary min-h-screen">
       <div className="flex ml-56">
          <LucideLineChart className="w-12 h-12 xl:w-16 xl:h-16 p-1 rounded-full my-12 mx-2 text-primary border-2 border-primary" />
          <h1 className="font-monospace font-semibold text-6xl my-12 text-secondary-foreground">
            {intl.formatMessage({ id: 'dashboard.page.title' })}
          </h1>
        </div>

        <div className="flex mx-24">
          <div className="flex my-2 xl:w-full xl:max-w-full max-w-[800px] ml-52 mr-10 xl:ml-60">
            <DashboardCard
              title={intl.formatMessage({ id: 'dashboard.page.total.clients' })}
              value={counts.clients}
            />
            <DashboardCard
              title={intl.formatMessage({ id: 'dashboard.page.total.users' })}
              value={counts.users}
            />
            <DashboardCard
              title={intl.formatMessage({ id: 'dashboard.page.total.events' })}
              value={counts.events}
            />
          </div>
        </div>

        <div className="flex ml-56">
          <MdEventAvailable className="w-10 h-10 p-1 rounded-full my-9 mx-2 text-primary border-2 border-primary" />
          <h1 className="font-monospace font-bold text-5xl my-8 text-secondary-foreground">
            {intl.formatMessage({
              id: 'dashboard.page.next.events.datagrid.title',
            })}
          </h1>
        </div>

        <div className="ml-56 mr-10">
          <GenericTable columns={eventsColumns} data={events} />
        </div>
      </div>
    </div>
  )
}
function DashboardCard({
  title,
  value,
}: {
  title: string
  value: number
}) {
  return (
    <div className="rounded-xl bg-gray-700 bg-opacity-10 border-2 border-secondary p-8 mx-2">
      <h1 className="text-3xl text-gray-400 font-bold">{title}</h1>
      <h1 className="text-6xl text-gray-400 font-extrabold uppercase">
        {value}
      </h1>
    </div>
  )
}
