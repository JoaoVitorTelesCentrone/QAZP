'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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

const Users = () => {
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)
  const [change, setChange] = useAtom(userChangeAtom)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    fetchUserData()
  }, [change])

  async function fetchUserData() {
    try {
      const response = await axios.get('http://localhost:5196/api/User')

      setUserData(response.data)
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
      throw error
    }
  }
  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      await Promise.all([fetchUserData()])
      setLoading(false)
    }
    fetch()
  }, [])

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
            <div className="p-10 ">
              <div className="flex mt-4 justify-between w-full">
                <div className="flex ml-48">
                  <FaUser className=" w-16 h-16 p-1 rounded-full my-5 text-primary border-2 border-primary" />

                  <h1 className="font-monospace font-semibold text-7xl my-3 mx-4 text-secondary-foreground">
                    Usuários
                  </h1>
                </div>
                <Button
                  icon={<FaUserPlus className="w-5 h-5 " />}
                  type="primary"
                  className="mt-8"
                  size="large"
                  onClick={() => setOpenModal(true)}
                >
                  Criar usuário
                </Button>
              </div>
            </div>
            <div className="ml-56 mr-10">
              <UsersTable columns={columns} data={userData} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Users
