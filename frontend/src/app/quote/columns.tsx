'use client'

import { ColumnDef } from '@tanstack/react-table'
import DeleteQuote from './DeleteQuote'
import { SortableHeader } from '@/components/ui/SortableHeader'

export type Quotes = {
  id: string
  fullName: string
  lastName: string
  email: string
  phoneNumber: string
  eventType: string
  estimatedAudience: string
}

export const quoteColumns: ColumnDef<Quotes>[] = [
  {
    accessorKey: 'fullName',
    header: ({ column }) => <SortableHeader column={column} title="Nome" />
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <SortableHeader column={column} title="Email" />
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => <SortableHeader column={column} title="Celular" />
  },
  {
    accessorKey: 'eventType',
    header: ({ column }) => <SortableHeader column={column} title="Tipo" />
  },
  {
    accessorKey: 'estimatedAudience',
    header: ({ column }) => <SortableHeader column={column} title="Público" />
  },
  {
    id: 'delete',
    cell: ({ row }) => <DeleteQuote quoteId={row.original.id} />,
  },
]
