'use client'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { authAtom } from '../atoms/authAtom'
import { userInfoAtom } from '../atoms/userInfoAtom'
import UserHeader from './UserHeader'
import { Button } from 'antd'
import LoginPage from './LoginModal'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()
  const [isLogged, setIsLogged] = useAtom(authAtom)
  const [user, setUser] = useAtom(userInfoAtom)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('authToken')

    if (token) {
      // If the token exists, set the user as logged in and redirect to the dashboard
      setIsLogged(true)
      router.push('/dashboard')
    }
  }, [router, setIsLogged])

  useEffect(() => {
    if (!isLogged) {
      router.push('/login') // Redirect to login if not logged in
    }
  }, [isLogged, router])

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
          {isModalVisible && (
            <LoginPage
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
            />
          )}
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
            login
          </Link>
          {/* <Button onClick={() => setIsModalVisible(true)}>Login</Button> */}
        </>
      )}
    </div>
  )
}

export default Header
