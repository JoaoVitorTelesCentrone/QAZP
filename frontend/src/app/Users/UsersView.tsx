'use client'

import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import UserSideMenu from '../components/UserHeader'
import { FaUser, FaUserPlus } from 'react-icons/fa'
import { Button } from 'antd'
import { UsersTable } from './components/UsersTable'
import CreateUserModal from './modals/createUserModal'

interface UserView {
  id: string
  name: string
  username: string
}

interface UsersViewProps {
  loading: boolean
  users: UserView[]
  columns: any
  isCreateModalOpen: boolean
  onOpenCreateModal: () => void
  onCloseCreateModal: () => void
}

export const UsersView: React.FC<UsersViewProps> = ({
  loading,
  users,
  columns,
  isCreateModalOpen,
  onOpenCreateModal,
  onCloseCreateModal,
}) => {
  return (
    <div className="bg-tertiary min-h-screen">
      {isCreateModalOpen && (
        <CreateUserModal
          isVisible={isCreateModalOpen}
          onClose={onCloseCreateModal}
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color="#123abc" />
        </div>
      ) : (
        <>
          <UserSideMenu />

          <div className="p-10">
            <div className="flex justify-between w-full mt-4">
              <div className="flex ml-64 items-center">
                <FaUser className="w-16 h-16 p-1 rounded-full my-5 text-primary border-2 border-primary" />
                <h1 className="font-monospace font-semibold text-7xl my-3 mx-4 text-secondary-foreground">
                  Usuários
                </h1>
              </div>

              <Button
                icon={<FaUserPlus className="w-5 h-5" />}
                type="primary"
                size="large"
                className="mt-8"
                onClick={onOpenCreateModal}
              >
                Criar usuário
              </Button>
            </div>
          </div>

          <div className="ml-56 mr-10 mb-10">
            <UsersTable columns={columns} data={users} />
          </div>
        </>
      )}
    </div>
  )
}
