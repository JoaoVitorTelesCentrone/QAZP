'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import UserHeader from '../components/UserHeader'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { userColumns, type Users } from './columns'
import { DataTable } from '@/components/ui/data-table'
import { UsersTable } from './UsersTable'
import axios from 'axios'
import { ColumnDef } from '@tanstack/react-table'
import ClipLoader from 'react-spinners/ClipLoader'

const Users = () => {
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)

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
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={'#123abc'} loading={loading} />
        </div>
      ) : (
        <>
          <UserHeader />
          <div className="p-20 justify-between flex">
            <h1 className="text-4xl ml-48 font-bold uppercase text-secondary-foreground">
              Usuários
            </h1>
            <Link
              className="flex bg-quartenary hover:transition delay-100 hover:scale-125 p-4 rounded-xl text-white"
              href="/CreateUser"
            >
              Criar usuário
              <Plus className="h-4 w-4 mt-1 ml-2" />{' '}
            </Link>
          </div>
          <div className="ml-72 mr-10">
            <UsersTable data={userData} columns={columns} />
          </div>
        </>
      )}
    </div>
  )
}

export default Users
