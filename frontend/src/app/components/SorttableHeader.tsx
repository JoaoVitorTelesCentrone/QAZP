'use client'

import { Button } from '@/components/ui/button'
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'

export function SortableHeader({
  column,
  label,
}: {
  column: any
  label: string
}) {
  const sorted = column.getIsSorted()

  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(sorted === 'asc')}
    >
      {label}
      {sorted === 'asc' ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : sorted === 'desc' ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  )
}
