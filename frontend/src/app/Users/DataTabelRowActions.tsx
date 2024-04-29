import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'

type DataTabelRowActionsProps<TData> = {
    row: Row<TData>,
    onEdit: (value: TData) => void,
    onDelete: (value: TData) => void,
}


const DataTabelRowActions = <TData,>({row, onEdit, onDelete}: DataTabelRowActionsProps<TData>) => {
  return(
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button variant='ghost'>
                <MoreHorizontal className='h-4 w-4'></MoreHorizontal>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem className='p-2 cursor-pointer hover:bg-slate-50' onClick={() => onEdit(row.original)}>Editar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='p-2 cursor-pointer hover:bg-slate-50' onClick={() => onDelete(row.original)}>Deletar</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DataTabelRowActions
