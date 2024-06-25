'use client'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React from 'react'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import { LogOut, TreePalm } from 'lucide-react'

const UserSideMenu = () => {
    const[loggedIn, setIsLogged] = useAtom(authAtom)
    const [user, setUser] = useAtom(userInfoAtom)

    console.log(user)

    if(!loggedIn) {
        redirect('/login')
    }
  
    return (
    <div className=' flex h-full p-8 bg-primary justify-between '>
        <div className='flex justify-between'>
            <h1 className='text-secondary mr-10'><TreePalm /></h1>
            <h1 className='text-secondary font-bold'>{` Bem vindo, ${user.username}`}</h1>
        </div>
        <ul className='flex justify-around mx-auto'>
            <Link href='/dashboard' className='mx-6 text-secondary font-montserrat font-medium hover:transition delay-100 hover:scale-125'>Dashboard</Link>
            <Link href='/clients' className='mx-6 text-secondary font-montserrat font-medium hover:transition delay-100 hover:scale-125'>Clientes</Link>
            <Link href='/Events' className='mx-6 text-secondary font-montserrat font-medium hover:transition delay-100 hover:scale-125'>Eventos</Link>
            <Link href='/Materials' className='mx-6 text-secondary font-montserrat font-medium hover:transition delay-100 hover:scale-125'>Materiais</Link>
            <Link href='/quote' className='mx-6 text-secondary font-montserrat font-medium hover:transition delay-100 hover:scale-125'>Orçamentos</Link>
            <Link href='/Users' className='mx-6 text-secondary font-montserrat font-medium hover:transition delay-100 hover:scale-125'>Usuários</Link>
        </ul>
        <button className='text-white px-4 py-1 rounded-xl mx-4 hover:transition delay-100 hover:scale-125' onClick={() => setIsLogged(false)}><LogOut /></button>
    </div>
  )
}

export default UserSideMenu