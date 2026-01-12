'use client'
import { SortableHeader } from '@/components/ui/SortableHeader'
import { ColumnDef } from '@tanstack/react-table'


export type Users = {
  id: string
  name: string
  username: string
}

export const userColumns = (): ColumnDef<Users>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column} title="Nome" />
  },
  {
    accessorKey: 'username',
    header: ({ column }) => <SortableHeader column={column} title="Usuário" />
  },
]
