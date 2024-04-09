"use client"
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUp, ArrowDown, ArrowUpDown, ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import { useState } from 'react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Client =  {
    firstName: string
    lastName: string
    cpf: string
    email: string
    phoneNumber: string
}

export const clientColumns: ColumnDef<Client>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value:any) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value:any) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
        return (
            
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Primeiro Nome

            {column.getIsSorted() === 'asc' ? <ArrowDown className="ml-2 h-4 w-4" /> : column.getIsSorted() === 'desc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowUpDown className="ml-2 h-4 w-4" />}          </Button>
        )
      },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ultimo nome
            {column.getIsSorted() === 'asc' ? <ArrowDown className="ml-2 h-4 w-4" /> : column.getIsSorted() === 'desc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowUpDown className="ml-2 h-4 w-4" />}          
            
          </Button>
        )
      },
  },
  {
    accessorKey: "cpf",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            CPF
            {column.getIsSorted() === 'asc' ? <ArrowDown className="ml-2 h-4 w-4" /> : column.getIsSorted() === 'desc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowUpDown className="ml-2 h-4 w-4" />}          
            
          </Button>
        )
      },
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            {column.getIsSorted() === 'asc' ? <ArrowDown className="ml-2 h-4 w-4" /> : column.getIsSorted() === 'desc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowUpDown className="ml-2 h-4 w-4" />}          
            
          </Button>
        )
      },
  },

  {
    accessorKey: "phoneNumber",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Telefone
            {column.getIsSorted() === 'asc' ? <ArrowDown className="ml-2 h-4 w-4" /> : column.getIsSorted() === 'desc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowUpDown className="ml-2 h-4 w-4" />}          
            
          </Button>
        )
      },
  },

  
 

]
