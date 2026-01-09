'use client'

import { ColumnDef } from '@tanstack/react-table'
import { SortableHeader } from '@/components/ui/SortableHeader'

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
    header: ({ column }) => <SortableHeader column={column} title="Nome" />
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <SortableHeader column={column} title="Tipo" />
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => <SortableHeader column={column} title="Início" />
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => <SortableHeader column={column} title="Fim" />
  },
  {
    accessorKey: 'estimatedAudience',
    header: ({ column }) => <SortableHeader column={column} title="Púlico Estimado" />
  },
  {
    accessorKey: 'totalAmount',
    header: ({ column }) => <SortableHeader column={column} title="Total (R$)" />
  },
]
