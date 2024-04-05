"use client"

import React from 'react'
import UserHeader from '../components/UserHeader'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'

const Clients = () => {
    const [isLogged, setIsLogged] = useAtom(authAtom)

    if(!isLogged){
        redirect('/login')
    }
  return (
    <div>
        <UserHeader />
        
    </div>
  )
}

export default Clients