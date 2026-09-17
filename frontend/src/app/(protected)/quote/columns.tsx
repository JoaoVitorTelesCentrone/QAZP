'use client'

import { ColumnDef } from '@tanstack/react-table'
import DeleteQuote from './components/DeleteQuote'
import { SortableHeader } from '@/components/ui/SortableHeader'
import { Quote } from './types/quoteTypes'

export const quoteColumns: ColumnDef<Quote>[] = [
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
