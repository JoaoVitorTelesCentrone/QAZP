'use client'
import React from 'react'
import UserSideMenu from '../components/UserHeader'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import Link from 'next/link'


const Page = () => {
  const [auth, isAuth] = useAtom(authAtom)

  if(!auth) { 
    redirect('/login')
  }
  return (
    <div>
        <UserSideMenu />
        <div className='m-20'>
          <div className='flex justify-between'>
            <h1 className='text-4xl font-bold uppercase'>Eventos</h1>
            <Link className='bg-secondary-foreground rounded-xl p-3 text-white font-bold ' href='/CreateEvent'>Criar evento</Link>
          </div>
        </div>
    </div>
  )
}

export default Page