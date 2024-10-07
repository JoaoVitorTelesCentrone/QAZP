'use client'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from 'lucide-react'

export type Users = {
  id: string
  name: string
  userName: string
}

export const userColumns = (): ColumnDef<Users>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          {column.getIsSorted() === 'asc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}{' '}
        </Button>
      )
    },
  },
  {
    accessorKey: 'userName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Usuário
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
]
