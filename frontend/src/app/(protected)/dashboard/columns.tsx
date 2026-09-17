'use client'

import { ColumnDef } from '@tanstack/react-table'
import { SortableHeader } from '@/components/ui/SortableHeader'
import { Events } from './types/dashboardTypes'

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
