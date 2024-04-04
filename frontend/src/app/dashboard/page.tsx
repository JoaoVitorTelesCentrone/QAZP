"use client"

import React from 'react'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import { useAtom } from 'jotai'
import UserHeader from '../components/UserHeader'
import NextEvents from '../components/user-home/Next-events'


const Dashboard = () => {
    const [isLogged, setIsLogged] = useAtom(authAtom)

    if(!isLogged){
        redirect('/login')
    }
  return (
    <div>
        <UserHeader />
        <NextEvents />
    </div>
  )
}

export default Dashboard