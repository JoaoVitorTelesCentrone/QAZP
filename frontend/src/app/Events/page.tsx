'use client'
import React, { useEffect, useState } from 'react'
import UserSideMenu from '../components/UserHeader'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ClipLoader from 'react-spinners/ClipLoader'

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
          <UserSideMenu />
          <div className="m-20">
            <div className="flex justify-between">
              <h1 className="text-4xl ml-56 font-bold uppercase">Eventos</h1>
              <Link
                className="bg-primary rounded-xl p-3 text-white font-bold "
                href="/CreateEvent"
              >
                Criar evento
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Page
