'use client'

import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useState } from 'react'
import { authAtom } from '../atoms/authAtom'
import { userInfoAtom } from '../atoms/userInfoAtom'
import UserHeader from './UserHeader'
import { intl } from '@/i18n'
import { Button } from 'antd'
import LoginModal from './LoginModal'
import ClipLoader from 'react-spinners/ClipLoader'
import QuoteModal from './QuoteModal'

const Header = () => {
  const [isLogged] = useAtom(authAtom)
  const [user] = useAtom(userInfoAtom)
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [openQuoteModal, setOpenQuoteModal] = useState(false)
  const [loading, setLoading] = useState(false) // Add this if loading state is required

  const handleOpenLoginModal = () => setOpenLoginModal(true)
  const handleCloseLoginModal = () => setOpenLoginModal(false)

  const handleOpenQuoteModal = () => setOpenQuoteModal(true)
  const handleCloseQuoteModal = () => setOpenQuoteModal(false)

  return loading ? (
    <div className="flex justify-center items-center h-40">
      <ClipLoader size={50} color="#123abc" loading={loading} />
    </div>
  ) : (
    <div className="flex p-8 bg-quartenary text-secondary justify-around">
      <LoginModal isVisible={openLoginModal} onClose={handleCloseLoginModal} />
      <QuoteModal isVisible={openQuoteModal} onClose={handleCloseQuoteModal} />
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
              className="mx-6 text-secondary font-montserrat font-medium mt-1"
            >
              {intl.formatMessage({
                id: 'header.home.option',
              })}
            </Link>
            <Link
              href="/sobre"
              className="mx-6 text-secondary mt-1 font-montserrat font-medium"
            >
              {intl.formatMessage({
                id: 'header.about.us.option',
              })}
            </Link>
            <Button
              type="link"
              className="text-white text-lg font-medium "
              onClick={handleOpenQuoteModal}
            >
              Orçamento
            </Button>
          </ul>
          <Button onClick={handleOpenLoginModal}>Login</Button>
        </>
      )}
    </div>
  )
}

export default Header
