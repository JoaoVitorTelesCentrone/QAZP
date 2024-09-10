import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { LucideTrash2 } from 'lucide-react'

export const MaterialCategory = [
  { name: 'Comida', index: 0 },
  { name: 'Decoração', index: 1 },
  { name: 'Utensilios', index: 2 },
  { name: 'Mobilia', index: 3 },
  { name: 'Recursos humanos', index: 4 },
  { name: 'Aluguel', index: 5 },
  { name: 'Entretenimento', index: 6 },
  { name: 'Marketing', index: 7 },
]

export const EventType = [
  { name: 'Casamento', index: 0 },
  { name: 'Feira', index: 1 },
  { name: 'Festa', index: 2 },
  { name: 'Festival', index: 3 },
  { name: 'Workshop', index: 4 },
  { name: 'Exibição', index: 5 },
  { name: 'Lançamento', index: 6 },
  { name: 'Campeonato', index: 7 },
  { name: 'Convenção', index: 8 },
  { name: 'Baile', index: 9 },
  { name: 'Seminário', index: 10 },
  { name: 'Assembleia', index: 11 },
  { name: 'Campanha', index: 12 },
  { name: 'Cerimônia', index: 13 },
  { name: 'Simpósio', index: 14 },
]

export type ClientProps = {
  id: string
  name: string
  documentId: string
  email: string
}

export type MaterialType = {
  id: string
  category: string
  name: string
  price: number
  quantity: number
  formatedMaterialPrice: string
}

export type insertMaterialProps = {
  name: string
  quantity: number
  key: string
  price: number
}

export const insertedColumns: ColumnDef<insertMaterialProps>[] = [
  {
    accessorKey: 'Name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
        </Button>
      )
    },
  },
  {
    accessorKey: 'Quntidade',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
        </Button>
      )
    },
  },
  {
    accessorKey: 'Preço',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
        </Button>
      )
    },
  },
]
