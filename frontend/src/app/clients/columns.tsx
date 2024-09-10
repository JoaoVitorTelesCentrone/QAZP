'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'
import { intl } from '../../i18n'
import EditClient from './EditClient'
import DeleteClient from './DeleteClient'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Client = {
  id: string
  fullName: string
  documentId: string
  email: string
  phoneNumber: string
}

export const clientColumns: ColumnDef<Client>[] = [
  {
    accessorKey: 'fullName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {intl.formatMessage({ id: 'client.page.datagrid.fullName.label' })}

          {column.getIsSorted() === 'asc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
  },
  {
    accessorKey: 'documentId',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {intl.formatMessage({ id: 'client.page.datagrid.document.label' })}
          {column.getIsSorted() === 'asc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
  },

  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {intl.formatMessage({ id: 'client.page.datagrid.email.label' })}
          {column.getIsSorted() === 'asc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
  },

  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {intl.formatMessage({ id: 'client.page.datagrid.phoneNumber.label' })}
          {column.getIsSorted() === 'asc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
  },
  {
    id: 'edit',
    cell: ({ row }) => <EditClient userId={row.original.id} />,
  },
  {
    id: 'delete',
    cell: ({ row }) => <DeleteClient userId={row.original.id} />,
  },
]