'use client'

import { ColumnDef } from '@tanstack/react-table'
import { SortableHeader } from './components/SorttableHeader'

export type Events = {
  id: string
  name: string
  city: string
  state: string
  estimatedAudience: string
  type: string
  startDate: string
  endDate: string
  totalAmount: string
}

export const eventsColumns: ColumnDef<Events>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableHeader column={column} label="Título" />
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <SortableHeader column={column} label="Tipo" />      
    ),
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => (
      <SortableHeader column={column} label="Início" />
    ),
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => (
      <SortableHeader column={column} label="Fim" />
    ),
  },
  {
    accessorKey: 'estimatedAudience',
    header: ({ column }) => (
      <SortableHeader column={column} label="Público Estimado" />
    ),
  },
  {
    accessorKey: 'totalAmount',
    header: ({ column }) => (
      <SortableHeader column={column} label="Total (R$)" />
    ),
  },
]
