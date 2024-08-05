'use client'
import React, { useEffect, useState } from 'react'
import UserSideMenu from '../components/UserHeader'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ClipLoader from 'react-spinners/ClipLoader'
import UserHeader from '../components/UserHeader'
import { Plus } from 'lucide-react'

const Page = () => {
  const [auth, isAuth] = useAtom(authAtom)
  const [loading, setLoading] = useState(false)

  if (!auth) {
    redirect('/login')
  }

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      setLoading(false)
    }
    fetch()
  }, [])
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
            <h1 className="ml-48 uppercase text-4xl font-bold text-secondary-foreground ">
              Eventos
            </h1>
            <Link
              className="bg-quartenary flex p-4 rounded-xl text-white"
              href="/CreateClient"
            >
              Criar evento
              <Plus className="h-4 w-4 mt-1 ml-2" />{' '}
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Page
