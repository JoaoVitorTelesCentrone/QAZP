'use client'

import GenericTable from '../../components/GenericTable'
import { clientColumns } from '../columns'
import ClientsFilters from './ClientsFilters'
import { ClientsTableProps } from '../types/clientTypes'

export default function ClientsTable({ data }: ClientsTableProps) {
  return (
    <div className="bg-tertiary">
      <div className="ml-56 mr-10">
        <GenericTable columns={clientColumns} data={data}>
          {(table) => <ClientsFilters table={table} />}
        </GenericTable>
      </div>
    </div>
  )
}