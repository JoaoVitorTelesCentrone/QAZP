'use client'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React from 'react'
import { authAtom } from '../atoms/authAtom'
import { userInfoAtom } from '../atoms/userInfoAtom'
import UserHeader from './UserHeader'
import { intl } from '@/i18n'

const Header = () => {
  const [isLogged, setIsLogged] = useAtom(authAtom)
  const [user, setUser] = useAtom(userInfoAtom)

  return (
    <div className=" flex p-8 bg-quartenary text-secondary justify-around">
      <Link
        href="/"
        className="text-2xl text-secondary font-extrabold font-montserrat"
      >
        {intl.formatMessage({
          id: 'header.title',
        })}
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
              {intl.formatMessage({
                id: 'header.home.option',
              })}
            </Link>
            <Link
              href="/sobre"
              className="mx-6 text-secondary font-montserrat font-medium"
            >
              {intl.formatMessage({
                id: 'header.about.us.option',
              })}
            </Link>
            <Link
              href="/orcamento"
              className="mx-6 text-secondary font-montserrat font-medium"
            >
              {intl.formatMessage({
                id: 'header.quote.option',
              })}
            </Link>
          </ul>
          <Link
            href="/login"
            className="mx-6 text-secondary font-montserrat font-medium"
          >
            {intl.formatMessage({
              id: 'header.login.button.label',
            })}
          </Link>
        </>
      )}
    </div>
  )
}

export default Header
