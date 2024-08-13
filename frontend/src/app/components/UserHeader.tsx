'use client'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useState } from 'react'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import { LogOut, MenuIcon, TreePalm, XIcon } from 'lucide-react'

const UserSideMenu = () => {
  const [loggedIn, setIsLogged] = useAtom(authAtom)
  const [user, setUser] = useAtom(userInfoAtom)
  console.log(user)

  if (!loggedIn) {
    redirect('/login')
  }

  return (
    <div>
      <div
        className={`fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64 p-4 flex flex-col`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-secondary">
            <TreePalm />
          </h1>
        </div>
        <nav className="flex-grow">
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
    </div>
  )
}

export default UserSideMenu
