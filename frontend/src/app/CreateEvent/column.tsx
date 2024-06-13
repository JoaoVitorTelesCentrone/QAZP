"use client"
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Inserted = {
  name: string
  quantity: string
  price: string
}
const insertedColumns: ColumnDef<Inserted>[] = [
    {
      accessorKey: "Name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
          </Button>
        )
      },
    },
    {
      accessorKey: "Quntidade",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Preço
          </Button>
        )
      },
    },
    {
      accessorKey: "Preço",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Quantidade
          </Button>
        )
      },
    },
  ]