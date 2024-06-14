'use client'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useState } from 'react'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import { LogOut, MenuIcon, TreePalm, XIcon } from 'lucide-react'

const UserSideMenu = () => {
  const [open, setOpen] = useState(false)
  const [loggedIn, setIsLogged] = useAtom(authAtom)
  const [user, setUser] = useAtom(userInfoAtom)
  console.log(user)

  if (!loggedIn) {
    redirect('/login')
  }

  const openMenu = () => {
    setOpen(true)
  }

  const closeMenu = () => {
    setOpen(false)
  }

  return (
    <div className={`flex h-full`}>
      <div
        className={`fixed inset-y-0 left-0 transform ${open ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64 p-4`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-secondary">
            <TreePalm />
          </h1>
          <h1 className="text-secondary font-bold my-3">{`Bem vindo, ${user.username}`}</h1>
          <button className="text-white" onClick={() => closeMenu()}>
            {open ? <XIcon /> : 'Open'}
          </button>
        </div>
        <nav>
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                href="/dashboard"
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/clients"
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                Clientes
              </Link>
            </li>
            <li>
              <Link
                href="/Events"
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                Eventos
              </Link>
            </li>
            <li>
              <Link
                href="/Materials"
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                Materiais
              </Link>
            </li>
            <li>
              <Link
                href="/quote"
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                Orçamentos
              </Link>
            </li>
            <li>
              <Link
                href="/Users"
                className="block py-2 px-3 rounded hover:bg-gray-700"
              >
                Usuários
              </Link>
            </li>
          </ul>
        </nav>
        <button
          className="text-white mt-4 flex items-center space-x-2"
          onClick={() => setIsLogged(false)}
        >
          <LogOut />
          <span>Logout</span>
        </button>
      </div>

      <div
        className={`flex-1 p-8 ${open ? 'ml-64' : 'ml-0'} transition-all duration-300`}
      >
        <MenuIcon
          className={
            open ? 'hidden' : 'text-primary h-6 w-6 rounded-md cursor-pointer'
          }
          onClick={() => openMenu()}
        >
          {open ? 'Close Menu' : 'Open Menu'}
        </MenuIcon>
      </div>
    </div>
  )
}

export default UserSideMenu
