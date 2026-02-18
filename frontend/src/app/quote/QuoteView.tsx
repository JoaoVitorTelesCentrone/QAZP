'use client'

import UserSideMenu from '../components/UserHeader'
import { quoteColumns } from './columns'
import ClipLoader from 'react-spinners/ClipLoader'
import { GiTakeMyMoney } from 'react-icons/gi'
import GenericTable from '../components/GenericTable'
import { Input } from '@/components/ui/input'

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
          <GenericTable columns={quoteColumns} data={quotes} >
            {(table) => (
              <>
                <Input
                  placeholder="Filtrar por nome"
                  value={(table.getColumn('fullName')?.getFilterValue() as string) ?? ''}
                  onChange={(e) =>
                    table.getColumn('fullName')?.setFilterValue(e.target.value)
                  }
                  className="max-w-sm my-10 mx-auto border-primary text-center font-bold"
                />
              </>
            )}
          </GenericTable>
        </div>
      </div>
    </>
  )
}
