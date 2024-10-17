'use client'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { authAtom } from '../atoms/authAtom'
import { useRouter, usePathname } from 'next/navigation'
import ClipLoader from 'react-spinners/ClipLoader'
import { LogOut, TreePalm } from 'lucide-react'
import AvatarUser from './Avatar'

const UserSideMenu = () => {
  const [loggedIn, setIsLogged] = useAtom(authAtom)
  const [user] = useAtom(userInfoAtom)
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLogged(false)
      router.push('/login')
    }
  }, [router, setIsLogged])

  const handleNavigation = (href: string) => {
    const token = localStorage.getItem('token')

    if (!token) {
      setIsLogged(false)
      router.push('/login')
    } else {
      setLoading(true)

      if (pathname === href) {
        router.replace(href)
      } else {
        router.push(href)
      }

      setTimeout(() => {
        setLoading(false)
      }, 3500)
    }
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
            {[
              'dashboard',
              'clients',
              'Events',
              'Materials',
              'quote',
              'Users',
            ].map(page => (
              <li key={page}>
                <Link
                  href={`/${page}`}
                  onClick={e => {
                    e.preventDefault()
                    handleNavigation(`/${page}`)
                  }}
                  data-testid={`link-${page}`}
                  className="block py-2 px-3 rounded hover:bg-gray-700 w-full text-left"
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 mb-4 flex justify-center">
          <AvatarUser name={`${user.username}`} />
        </div>
        <hr className="border-gray-600 my-4" />
        <button
          className="text-white items-center space-x-2 flex justify-center"
          onClick={() => {
            localStorage.removeItem('token')
            setIsLogged(false)
            router.push('/login')
          }}
          data-testid="logout-button"
        >
          <LogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default UserSideMenu
