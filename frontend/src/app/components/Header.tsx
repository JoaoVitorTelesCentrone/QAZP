'use client'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useState } from 'react'
import { authAtom } from '../atoms/authAtom'
import { userInfoAtom } from '../atoms/userInfoAtom'
import UserHeader from './UserHeader'

const Header = () => {
  const [isLogged, setIsLogged] = useAtom(authAtom)
  const [user, setUser] = useAtom(userInfoAtom)
  
  return (
    <div className=" flex p-8 bg-quartenary text-secondary justify-around">
      <Link
        href="/"
        className="text-2xl text-secondary font-extrabold font-montserrat"
      >
        Z-Eventos
      </Link>
      {isLogged ? (
        <UserHeader />
      ) : (
        <>
          <ul className="flex justify-center mx-auto">
            <Link
              href="/"
              className="mx-6 text-secondary font-montserrat font-medium"
            >
              Home
            </Link>
            <Link
              href="/sobre"
              className="mx-6 text-secondary font-montserrat font-medium"
            >
              Sobre
            </Link>
            <Link
              href="/orcamento"
              className="mx-6 text-secondary font-montserrat font-medium"
            >
              Solicite um orçamento
            </Link>
          </ul>
          <Link
              href="/login"
              className="mx-6 text-secondary font-montserrat font-medium"
            >
              Login
            </Link>
        </>
      )}
    </div>
  )
}

export default Header
