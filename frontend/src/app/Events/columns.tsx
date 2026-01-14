'use client'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'
import DeleteEvent from './deleteEvent'
import EditButton from './EditButton'
import { SortableHeader } from '@/components/ui/SortableHeader'

export type Events = {
  id: string
  name: string
  city: string
  state: string
  estimatedAudience: string
  type: string
  clientName: string
  startDate: string
  endDate: string
  totalAmount: string
}

export const eventsColumns: ColumnDef<Events>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column} title="Título" />
  },

  {
    accessorKey: 'type',
    header: ({ column }) => <SortableHeader column={column} title="Tipo" />
  },

  {
    accessorKey: 'clientName',
    header: ({ column }) => <SortableHeader column={column} title="Cliente" />
  },
  
  {
    accessorKey: 'startDate',
    header: ({ column }) => <SortableHeader column={column} title="Inicio" />
  },
  
  {
    accessorKey: 'endDate',
    header: ({ column }) => <SortableHeader column={column} title="Fim" />
  },

  {
    accessorKey: 'estimatedAudience',
    header: ({ column }) => <SortableHeader column={column} title="Público Estimado" />
  },

  {
    accessorKey: 'totalAmount',
    header: ({ column }) => <SortableHeader column={column} title="Total (R$)" />
  },

  {
    id: 'edit',
    cell: ({ row }) => (
      <EditButton eventId={row.original.id} />
    ),
  },
  {
    id: 'delete',
    cell: ({ row }) => <DeleteEvent eventId={row.original.id} />,
  },
]
