'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { SortableHeader } from '@/components/ui/SortableHeader'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'

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
