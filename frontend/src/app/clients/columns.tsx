'use client'
import { ColumnDef } from '@tanstack/react-table'
import { intl } from '../../i18n'
import EditClient from './EditClient'
import DeleteClient from './DeleteClient'
import { SortableHeader } from '@/components/ui/SortableHeader'

export type Client = {
  id: string
  fullName: string
  documentId: string
  email: string
  phoneNumber: string
}

export const clientColumns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column} title={intl.formatMessage({ id: 'client.page.datagrid.fullName.label' })} />
  },
  {
    accessorKey: 'documentId',
    header: ({ column }) => <SortableHeader column={column} title={intl.formatMessage({ id: 'client.page.datagrid.document.label' })} />
  },

  {
    accessorKey: 'email',
    header: ({ column }) => <SortableHeader column={column} title={intl.formatMessage({ id: 'client.page.datagrid.email.label' })} />
  },

  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => <SortableHeader column={column} title={intl.formatMessage({ id: 'client.page.datagrid.phoneNumber.label' })} />
  },
  {
    id: 'edit',
    cell: ({ row }) => <EditClient userId={row.original.id} />,
  },
  {
    id: 'delete',
    cell: ({ row }) => <DeleteClient userId={row.original.id} />,
  },
]