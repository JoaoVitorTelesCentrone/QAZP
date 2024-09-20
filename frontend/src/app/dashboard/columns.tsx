'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ArrowBigLeft,
  ArrowBigRight,
} from 'lucide-react'
import { useState } from 'react'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Events = {
  id: string
  name: string
  estimatedAudience: number
  type: string
  startAt: string
  addressName: string
}

export const eventsColumns: ColumnDef<Events>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Título
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
    accessorKey: 'estimatedAudience',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Público
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
    accessorKey: 'startAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data do evento
          <ArrowUp className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

  {
    accessorKey: 'addressName',
    header: ({ column }) => {
      return <Button variant="ghost">Local</Button>
    },
  },
]
