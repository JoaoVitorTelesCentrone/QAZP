'use client'
import { SortableHeader } from '@/components/ui/SortableHeader'
import { ColumnDef } from '@tanstack/react-table'

export type Inserted = {
  name: string
  quantity: string
  price: string
}
const insertedColumns: ColumnDef<Inserted>[] = [
  {
    accessorKey: 'Name',
    header: ({ column }) => <SortableHeader column={column} title="Nome" />
  },
  {
    accessorKey: 'Preço',
    header: ({ column }) => <SortableHeader column={column} title="Preço" />
  },
  {
    accessorKey: 'Quantidade',
    header: ({ column }) => <SortableHeader column={column} title="Quantidade" />
  },
]
