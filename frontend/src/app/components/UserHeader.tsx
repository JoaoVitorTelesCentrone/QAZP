'use client'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { authAtom } from '../atoms/authAtom'
import { useRouter, usePathname } from 'next/navigation'
import ClipLoader from 'react-spinners/ClipLoader'
import { LogOut } from 'lucide-react'
import AvatarUser from './Avatar'
import withAuth from '../hoc/withAuth'
import { TbCircleLetterZ } from 'react-icons/tb'
import { intl } from '@/i18n'

const UserSideMenu = () => {
  const router = useRouter()
  const [loggedIn, setIsLogged] = useAtom(authAtom)
  const [user] = useAtom(userInfoAtom)

  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLogged(false)
      router.push('/')
    } else {
      setIsLogged(true)
    }
    setLoading(false)
  }, [router, setIsLogged])

  const handleNavigation = (href: string) => {
    const token = localStorage.getItem('token')

    if (!token) {
      setIsLogged(false)
      router.push('/')
    } else {
      setLoading(true)

      if (pathname === href) {
        router.replace(href)
      } else {
        router.push(href)
      }

      setTimeout(() => {
        setLoading(false)
      }, 4500)
    }
  }

  const handleLogout = () => {
    setLoading(true)

    localStorage.removeItem('token')
    setIsLogged(false)

    router.push('/')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader size={50} color={'#123abc'} loading={loading} />
      </div>
    )
  }

  if (!loggedIn) return null

  return (
    <div className="flex h-full">
      <div className="fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out bg-gray-800 text-white w-48 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <TbCircleLetterZ />
          <ul>
            <li>{intl.formatMessage({
              id: 'side.nav.title',
            })}
            </li>
          </ul>
        </div>
        <nav className="flex-1">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                href="/dashboard"
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                {intl.formatMessage({
                  id: 'side.nav.dashboard.option.label',
                })}
              </Link>
            </li>
            <li>
              <Link
                data-testid='nav-orcamento-page'
                href="/quote"
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                {intl.formatMessage({
                  id: 'side.nav.quotes.option.label',
                })}
              </Link>
            </li>
            <li>
              <Link
                href="/clients"
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                {intl.formatMessage({
                  id: 'side.nav.clients.option.label',
                })}
              </Link>
            </li>
            <li>
              <Link
                href="/Materials"
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                {intl.formatMessage({
                  id: 'side.nav.materials.option.label',
                })}
              </Link>
            </li>
            <li>
              <Link
                href="/Events"
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                {intl.formatMessage({
                  id: 'side.nav.events.option.label',
                })}
              </Link>
            </li>
            <li>
              <Link
                href="/Users"
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                {intl.formatMessage({
                  id: 'side.nav.users.option.label',
                })}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-6 mb-4 flex justify-center">
          <AvatarUser name={`${user.username}`} />
        </div>
        <hr className="border-gray-600 my-4" />
        <button
          className="text-white  items-center space-x-2 flex justify-center"
          onClick={handleLogout}
        >
          <LogOut />
          <span>{intl.formatMessage({
            id: 'side.nav.logout.button.label',
          })}
          </span>
        </button>
      </div>
    </div>
  )
}

export default withAuth(UserSideMenu)
