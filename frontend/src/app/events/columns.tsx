'use client'
import { ColumnDef } from '@tanstack/react-table'
import { EventProps } from './types/eventTypes'
import DeleteEvent from './components/DeleteEvent'
import EditButton from './components/EditButton'
import { SortableHeader } from '@/components/ui/SortableHeader'

export const eventsColumns: ColumnDef<EventProps>[] = [
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
