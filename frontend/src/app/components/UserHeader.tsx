import { useAtom } from 'jotai'
import Link from 'next/link'
import React from 'react'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'

const UserHeader = () => {
    const[loggedIn, setIsLogged] = useAtom(authAtom)
    const [user, setUser] = useAtom(userInfoAtom)

    if(!loggedIn) {
        redirect('/login')
    }
  
    return (
    <div className=' flex p-8 bg-secondary justify-around'>
        <ul className='flex justify-center mx-auto'>
            <h1 className='mx-6 text-primary font-montserrat font-bold text-2xl uppercase'>ZVENTOS</h1>
            <Link href='/dashboard' className='mx-6 text-primary font-montserrat font-medium'>Dashboard</Link>
            <Link href='/clients' className='mx-6 text-primary font-montserrat font-medium'>Clientes</Link>
            <Link href='/showroom' className='mx-6 text-primary font-montserrat font-medium'>Eventos</Link>
            <Link href='/orcamento' className='mx-6 text-primary font-montserrat font-medium'>Criar usuário</Link>
            <h1 className='mx-6 text-primary font-montserrat font-medium'>{user.username}</h1>
            <button className='bg-white px-4 py-1 rounded-xl mx-4' onClick={() => setIsLogged(false)}>Logout</button>
        </ul>
        
    </div>
  )
}

export default UserHeader