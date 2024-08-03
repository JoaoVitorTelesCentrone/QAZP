'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { intl } from '../../i18n'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function ClientTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="rounded-md pt-0">
      <div className="flex items-center justify-around mx-0 py-0 ">
        <Input
          placeholder={intl.formatMessage({
            id: 'client.page.filter.by.name.field.placeholder',
          })}
          value={
            (table.getColumn('fullName')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('fullName')?.setFilterValue(event.target.value)
          }
          className="max-w-sm border-primary"
        />
        <Input
          placeholder={intl.formatMessage({
            id: 'client.page.filter.by.document.field.placeholder',
          })}
          value={
            (table.getColumn('documentId')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('documentId')?.setFilterValue(event.target.value)
          }
          className="max-w-sm my-10  border-primary"
        />
      </div>
      <Table className="border-2 border-secondary">
        <TableHeader className="bg-cyan-700 text-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead
                    key={header.id}
                    className=" py-2 text-secondary-foreground text-center"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell className="text-center" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-2xl font-bold"
              >
                {intl.formatMessage({ id: 'datagrid.empty.message' })}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4 mr-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowBigLeft className="ml-2 h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ArrowBigRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
