import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'

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

export type ClientProps = {
  id: string
  name: string
  documentId: string
  email: string
}

export type MaterialType = {
  category: string
  name: string
  price: number
  quantity: number
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
