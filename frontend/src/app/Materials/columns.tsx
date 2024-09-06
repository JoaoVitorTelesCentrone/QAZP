'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ArrowBigLeft,
  ArrowBigRight,
  EditIcon,
  Edit2Icon,
  Edit3Icon,
} from 'lucide-react'
import { useState } from 'react'

import { UUID } from 'crypto'
import EditUser from '../Users/EditUser'
import DeleteUser from '../Users/DeleteUser'
import { materialProps } from './page'
import DeleteMaterial from './DeleteMaterial'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Materiais = {
  id: string
  name: string
  price: string
  category: string
}

export const materialColumns = (): ColumnDef<materialProps>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome do material
          {column.getIsSorted() === 'asc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}{' '}
        </Button>
      )
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Categoria
          {column.getIsSorted() === 'asc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Preço
          {column.getIsSorted() === 'asc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
  },
  {
    id: 'delete',
    cell: ({ row }) => <DeleteMaterial materialId={row.original.id} />,
  },
]
