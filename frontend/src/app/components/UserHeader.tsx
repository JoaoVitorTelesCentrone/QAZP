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
    <div className=' flex p-8 bg-custom-secondary justify-around'>
        <Link href='/' className='text-2xl text-custom-primary font-extrabold font-montserrat'>Zventos</Link>
        <ul className='flex justify-center mx-auto'>
            <Link href='/clients' className='mx-6 text-custom-primary font-montserrat font-medium'>Clientes</Link>
            <Link href='/showroom' className='mx-6 text-custom-primary font-montserrat font-medium'>Eventos</Link>
            <Link href='/orcamento' className='mx-6 text-custom-primary font-montserrat font-medium'>Criar usuário</Link>
            <h1 className='mx-6 text-custom-primary font-montserrat font-medium'>{user.username}</h1>
            <button className='bg-white px-4 py-1 rounded-xl mx-4' onClick={() => setIsLogged(false)}>Logout</button>
        </ul>
        
    </div>
  )
}

export default UserHeader