'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { userColumns, type Users } from './columns'
import { UsersTable } from './UsersTable'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'
import UserSideMenu from '../components/UserHeader'
import { FaUser, FaUserPlus } from 'react-icons/fa'
import { Button } from 'antd'
import { userChangeAtom } from '../atoms/changeUserAtom'
import { useAtom } from 'jotai'
import CreateUserModal from './createUserModal'
import withAuth from '../hoc/withAuth'

const Users = () => {
  console.log('Users renderizado')
  const [userData, setUserData] = useState<Users[]>([])
  const [loading, setLoading] = useState(true)
  const [change] = useAtom(userChangeAtom)
  const [openModal, setOpenModal] = useState(false)

  const isFetching = useRef(false)

  const fetchUserData = useCallback(async () => {
    if (isFetching.current) return
    isFetching.current = true

    setLoading(true)
    try {
      const response = await axios.get(
        'http://localhost:5196/api/User/activeUsers',
      )

      const filteredData = response.data
        .filter((user: any) => !user.isDeleted)
        .map((user: any) => ({
          name: user.name,
          userName: user.userName,
        }))

      setUserData(filteredData)
      console.log(filteredData)
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
    } finally {
      setTimeout(() => {
        setLoading(false)
        isFetching.current = false
      }, 100)
    }
  }, [])

  useEffect(() => {
    fetchUserData()
  }, [change, fetchUserData])

  const columns = useMemo(() => userColumns(), [])

  return (
    <div>
      {openModal && (
        <CreateUserModal
          isVisible={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={'#123abc'} loading={loading} />
        </div>
      ) : (
        <>
          <UserSideMenu />
          <div className="bg-tertiary h-screen">
            <div className="p-10">
              <div className="flex mt-4 justify-between w-full">
                <div className="flex ml-64">
                  <FaUser className="w-16 h-16 p-1 rounded-full my-5 text-primary border-2 border-primary" />
                  <h1 className="font-monospace font-semibold text-7xl my-3 mx-4 text-secondary-foreground">
                    Usuários
                  </h1>
                </div>
                <Button
                  icon={<FaUserPlus className="w-5 h-5" />}
                  type="primary"
                  className="mt-8"
                  size="large"
                  onClick={() => setOpenModal(true)}
                >
                  Criar usuário
                </Button>
              </div>
            </div>
            <div className="bg-tertiary">
              <div className="ml-56 mr-10">
                <UsersTable columns={columns} data={userData} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default withAuth(Users)
