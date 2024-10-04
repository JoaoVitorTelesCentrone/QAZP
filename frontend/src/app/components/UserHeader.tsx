'use client'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { authAtom } from '../atoms/authAtom'
import { useRouter } from 'next/navigation'
import { LogOut, TreePalm } from 'lucide-react'
import AvatarUser from './Avatar'
import ClipLoader from 'react-spinners/ClipLoader'

const UserSideMenu = () => {
  const router = useRouter()
  const [loggedIn, setIsLogged] = useAtom(authAtom)
  const [user, setUser] = useAtom(userInfoAtom)
  const [loading, setLoading] = useState(false)

  const setLoadingWithDelay = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000) // 1 second delay
  }

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('authToken')

    // Clear authentication state
    setIsLogged(false)

    // Clear user info state
    setUser({
      name: '',
      username: '',
      password: '',
    })

    // Redirect to login page
    router.push('/login')
  }

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader size={50} color={'#123abc'} loading={loading} />
    </div>
  ) : (
    <div className="flex h-full">
      <div className="fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out bg-gray-800 text-white w-48 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <TreePalm />
          <ul>
            <li>Zventos</li>
          </ul>
        </div>
        <nav className="flex-1">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                href="/dashboard"
                onClick={setLoadingWithDelay}
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/clients"
                onClick={setLoadingWithDelay}
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                Clientes
              </Link>
            </li>
            <li>
              <Link
                href="/Events"
                onClick={setLoadingWithDelay}
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                Eventos
              </Link>
            </li>
            <li>
              <Link
                href="/Materials"
                onClick={setLoadingWithDelay}
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                Materiais
              </Link>
            </li>
            <li>
              <Link
                href="/quote"
                onClick={setLoadingWithDelay}
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                Orçamentos
              </Link>
            </li>
            <li>
              <Link
                href="/Users"
                onClick={setLoadingWithDelay}
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                Usuários
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-6 mb-4 flex justify-center">
          <AvatarUser name={`${user.username}`} />
        </div>
        <hr className="border-gray-600 my-4" />
        <button
          className="text-white items-center space-x-2 flex justify-center"
          onClick={handleLogout} // Call the logout function
        >
          <LogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default UserSideMenu
