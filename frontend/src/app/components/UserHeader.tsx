'use client'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React from 'react'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'

const UserSideMenu = () => {
    const[loggedIn, setIsLogged] = useAtom(authAtom)
    const [user, setUser] = useAtom(userInfoAtom)

    if(!loggedIn) {
        redirect('/login')
    }
  
    return (
    <div className=' flex h-full p-8 bg-primary justify-around'>
        <ul className='flex  justify-around mx-auto'>
            <Link href='/dashboard' className='mx-6 text-secondary font-montserrat font-medium hover:transition delay-100 hover:scale-125'>Dashboard</Link>
            <Link href='/clients' className='mx-6 text-secondary font-montserrat font-medium hover:transition delay-100 hover:scale-125'>Clientes</Link>
            <Link href='/Events' className='mx-6 text-secondary font-montserrat font-medium hover:transition delay-100 hover:scale-125'>Eventos</Link>
            <Link href='/quote' className='mx-6 text-secondary font-montserrat font-medium hover:transition delay-100 hover:scale-125'>Orçamentos</Link>
            <Link href='/Users' className='mx-6 text-secondary font-montserrat font-medium hover:transition delay-100 hover:scale-125'>Usuários</Link>
            <h1 className='mx-6 text-secondary font-montserrat font-medium'>{user.username}</h1>
            <button className='bg-white px-4 py-1 rounded-xl mx-4 hover:transition delay-100 hover:scale-125' onClick={() => setIsLogged(false)}>Logout</button>
        </ul>
    </div>
  )
}

export default UserSideMenu