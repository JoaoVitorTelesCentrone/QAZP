'use client'

import UserSideMenu from '../components/UserHeader'
import { QuoteTable } from './QuoteTable'
import { quoteColumns } from './column'
import ClipLoader from 'react-spinners/ClipLoader'
import { GiTakeMyMoney } from 'react-icons/gi'

interface Props {
  loading: boolean
  quotes: any[]
}

export default function QuoteView({ loading, quotes }: Props) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#123abc" />
      </div>
    )
  }

  return (
    <>
      <UserSideMenu />
      <div className="bg-tertiary h-screen">
        <div className="p-10">
          <div className="flex ml-48">
            <GiTakeMyMoney className="w-16 h-16 p-1 rounded-full my-5 text-primary border-2 border-primary" />
            <h1 className="font-monospace font-semibold text-7xl my-3 mx-4 text-secondary-foreground">
              Orçamentos
            </h1>
          </div>
        </div>

        <div className="ml-56 mr-10">
          <QuoteTable columns={quoteColumns} data={quotes} />
        </div>
      </div>
    </>
  )
}
