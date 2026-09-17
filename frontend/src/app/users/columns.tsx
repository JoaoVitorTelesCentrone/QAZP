'use client'
import { SortableHeader } from '@/components/ui/SortableHeader'
import { ColumnDef } from '@tanstack/react-table'
import { UsersTable } from './types/usersTypes'

export const userColumns = (): ColumnDef<UsersTable>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column} title="Nome" />
  },
  {
    accessorKey: 'username',
    header: ({ column }) => <SortableHeader column={column} title="Usuário" />
  },
]
