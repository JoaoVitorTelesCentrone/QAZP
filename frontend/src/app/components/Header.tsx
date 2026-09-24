'use client'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { authAtom } from '../atoms/authAtom'
import { userInfoAtom } from '../atoms/userInfoAtom'
import UserHeader from './UserHeader'
import { intl } from '@/i18n'
import { Button } from 'antd'
import ClipLoader from 'react-spinners/ClipLoader'
import QuoteModal from './QuoteModal'
import LoginModal from './LoginModal'

const Header = () => {
  const [isLogged, setIsLogged] = useAtom(authAtom)
  const [user] = useAtom(userInfoAtom)
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [openQuoteModal, setOpenQuoteModal] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true) // loading inicial

  const handleOpenLoginModal = () => setOpenLoginModal(true)
  const handleCloseLoginModal = () => setOpenLoginModal(false)
  const handleCancelLoginModal = () => setOpenLoginModal(false)
  const handleOpenQuoteModal = () => setOpenQuoteModal(true)
  const handleCloseQuoteModal = () => setOpenQuoteModal(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLogged(true)
    }
    setCheckingAuth(false)
  }, [setIsLogged])

  // Spinner full screen enquanto verifica token
  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#123abc" loading={true} />
      </div>
    )
  }

  return (
    <div className="flex p-8 bg-quartenary text-secondary justify-around">
      <LoginModal
        isVisible={openLoginModal}
        onClose={handleCloseLoginModal}
        onCancel={handleCancelLoginModal}
      />
      <QuoteModal isVisible={openQuoteModal} onClose={handleCloseQuoteModal} />
      <Link
        href="/"
        className="text-2xl text-secondary font-extrabold font-montserrat"
      >
        {intl.formatMessage({ id: 'header.title' })}
      </Link>
      {isLogged ? (
        <UserHeader />
      ) : (
        <>
          <ul className="flex justify-center mx-auto">
            <Link
              href="/sobre"
              className="mx-6 text-secondary mt-1 font-montserrat font-medium"
            >
              {intl.formatMessage({ id: 'header.about.us.option' })}
            </Link>
          </ul>
          <Button type="primary" ghost shape="round" onClick={handleOpenLoginModal}>
            {intl.formatMessage({ id: 'header.login.button.label' })}
          </Button>
        </>
      )}
    </div>
  )
}

export default Header