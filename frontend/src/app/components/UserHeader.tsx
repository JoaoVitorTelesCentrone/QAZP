'use client'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useState } from 'react'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import { LogOut, MenuIcon, TreePalm, XIcon } from 'lucide-react'
import AvatarUser from './Avatar'


const UserSideMenu = () => {
  const [loggedIn, setIsLogged] = useAtom(authAtom)
  const [user, setUser] = useAtom(userInfoAtom)
  console.log(user)

  if (!loggedIn) {
    redirect('/login')
  }

  return (
    <div className="flex h-full">
      <div className="fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64 p-4 flex flex-col">
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
        <div className="mt-6 mb-4 flex justify-center">
          <AvatarUser name={`${user.username}`} />
        </div>
        <hr className="border-gray-600 my-4" />
        <button
          className="text-white flex items-center space-x-2 flex justify-center"
          onClick={() => setIsLogged(false)}
        >
          <LogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );


}

export default UserSideMenu
