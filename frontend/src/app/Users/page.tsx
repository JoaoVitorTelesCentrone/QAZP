'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { UsersTable } from './components/UsersTable'
import { userColumns, type Users } from './columns'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'
import UserSideMenu from '../components/UserHeader'
import { FaUser, FaUserPlus } from 'react-icons/fa'
import { Button } from 'antd'
import { useAtom } from 'jotai'
import { userChangeAtom } from '../atoms/changeUserAtom'
import CreateUserModal from './modals/createUserModal'
import withAuth from '../hoc/withAuth'
import { SortingState, ColumnFiltersState } from '@tanstack/react-table'

const UsersPage: React.FC = () => {
  const [userData, setUserData] = useState<Users[]>([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [change] = useAtom(userChangeAtom)

  const isFetching = useRef(false)

  const fetchUserData = useCallback(async () => {
    if (isFetching.current) return
    isFetching.current = true

    setLoading(true)
    try {
      const response = await axios.get('http://localhost:5196/api/User/activeUsers')

      const filteredData = response.data
        .filter((user: any) => !user.isDeleted)
        .map((user: any) => ({
          id: user.id,
          name: user.name,
          username: user.username,
        }))

      setUserData(filteredData)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    } finally {
      setLoading(false)
      isFetching.current = false
    }
  }, [])

  useEffect(() => {
    fetchUserData()
  }, [change, fetchUserData])

  // Tipos para UsersTable
  const columns = useMemo(() => userColumns(), [])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  return (
    <div className="bg-tertiary min-h-screen">
      {openModal && (
        <CreateUserModal
          isVisible={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color="#123abc" loading={loading} />
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
                onClick={() => setOpenModal(true)}
              >
                Criar usuário
              </Button>
            </div>
          </div>

          <div className="ml-56 mr-10 mb-10">
            <UsersTable
              columns={columns}
              data={userData}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default withAuth(UsersPage)
