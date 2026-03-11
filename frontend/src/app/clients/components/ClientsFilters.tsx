'use client'

import { Input } from '@/components/ui/input'

type ClientsFiltersProps = {
  table: any
}

export default function ClientsFilters({ table }: ClientsFiltersProps) {
  return (
    <div className="flex gap-24 w-full">
      <Input
        placeholder="Filtrar por nome"
        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        onChange={(e) =>
          table.getColumn('name')?.setFilterValue(e.target.value)
        }
        className="max-w-sm my-10 border-primary text-center font-bold mx-auto"
      />

      <Input
        placeholder="Filtrar por documento"
        value={(table.getColumn('documentId')?.getFilterValue() as string) ?? ''}
        onChange={(e) =>
          table.getColumn('documentId')?.setFilterValue(e.target.value)
        }
        className="max-w-sm my-10 border-primary text-center font-bold mx-auto"
      />
    </div>
  )
}