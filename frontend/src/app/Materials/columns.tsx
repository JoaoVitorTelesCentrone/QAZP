'use client'
import { ColumnDef } from '@tanstack/react-table'
import { MaterialProps } from './types/material'
import DeleteMaterial from './components/DeleteMaterial'
import { SortableHeader } from '@/components/ui/SortableHeader'

export type Materiais = {
  id: string
  name: string
  price: string
  category: string
}

export const materialColumns = (): ColumnDef<MaterialProps>[] => [
  {
    accessorKey: 'name',
      header: ({ column }) => <SortableHeader column={column} title="Nome do Material" />
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <SortableHeader column={column} title="Categoria" />
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <SortableHeader column={column} title="Preço" />
  },
  {
    id: 'delete',
    cell: ({ row }) => <DeleteMaterial materialId={row.original.id} />,
  },
]
