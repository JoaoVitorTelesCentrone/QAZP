'use client'
import { ColumnDef } from '@tanstack/react-table'
import { intl } from '../../i18n'
import EditClient from './components/EditClient'
import DeleteClient from './components/DeleteClient'
import { SortableHeader } from '@/components/ui/SortableHeader'
import { Client } from './types/clientTypes'

export const clientColumns: ColumnDef<Client>[] = [
  {
    accessorKey: 'fullName',
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