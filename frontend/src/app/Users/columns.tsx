"use client"
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUp, ArrowDown, ArrowUpDown, ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import { useState } from 'react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Users =  {
    name: string
    username: string
    password: string
}

export const columns: ColumnDef<Users>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
            
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome

            {column.getIsSorted() === 'asc' ? <ArrowDown className="ml-2 h-4 w-4" /> : column.getIsSorted() === 'desc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowUpDown className="ml-2 h-4 w-4" />}          </Button>
        )
      },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Usuário
            {column.getIsSorted() === 'asc' ? <ArrowDown className="ml-2 h-4 w-4" /> : column.getIsSorted() === 'desc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowUpDown className="ml-2 h-4 w-4" />}          
            
          </Button>
        )
      },
  },
]
