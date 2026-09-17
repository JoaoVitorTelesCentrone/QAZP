'use client'

import { useMemo, useState } from 'react'
import withAuth from '../hoc/withAuth'
import { useUsers } from './hooks/useUsers'
import { userColumns } from './columns'
import { UsersView } from './UsersView'

function UsersPage() {
  const { users, loading } = useUsers()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const columns = useMemo(() => userColumns(), [])

  return (
    <UsersView
      loading={loading}
      users={users}
      columns={columns}
      isCreateModalOpen={isCreateModalOpen}
      onOpenCreateModal={() => setIsCreateModalOpen(true)}
      onCloseCreateModal={() => setIsCreateModalOpen(false)}
    />
  )
}

export default withAuth(UsersPage)