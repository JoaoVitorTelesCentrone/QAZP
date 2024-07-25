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

const Users = () => {
  const [userData, setUserData] = useState([])

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get('http://localhost:5196/api/User')

        setUserData(response.data)
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error)
        throw error
      }
    }
    fetchUserData()
  }, [])

  const columns = useMemo(() => userColumns(), [])
  return (
    <div className="flex flex-col">
      <UserHeader />
      <div className="flex my-20 mx-10 justify-between">
        <h1 className="text-4xl ml-72 font-bold uppercase text-secondary-foreground">
          Usuários
        </h1>
        <Link
          className="flex bg-primary hover:transition delay-100 hover:scale-125 p-4 rounded-xl text-white"
          href="/CreateUser"
        >
          Criar usuário
          <Plus className="h-4 w-4 mt-1 ml-2" />{' '}
        </Link>
      </div>
      <div className="mx-auto h-screen">
        <UsersTable data={userData} columns={columns} />
      </div>
    </div>
  )
}

export default Users
