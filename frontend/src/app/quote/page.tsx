'use client'
import React, { useEffect, useState } from 'react'
import UserSideMenu from '../components/UserHeader'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import { quoteColumns } from './column'
import { QuoteTable } from './QuoteTable'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'
import { quoteChangeAtom } from '../atoms/changeQuoteAtom'

const Page = () => {
  const [auth, isAuth] = useAtom(authAtom)
  const [quote, setQuote] = useState([])
  const [loading, setLoading] = useState(false)
  const [quoteChange, setQuoteChange] = useAtom(quoteChangeAtom)

  useEffect(() => {
    fetchUserData()
  }, [quoteChange])

  if (!auth) {
    redirect('/login')
  }
  async function fetchUserData() {
    try {
      const response = await axios.get('http://localhost:5196/api/Quote')

      setQuote(response.data)
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
      throw error
    }
  }

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      await Promise.all([fetchUserData()])
      setLoading(false)
    }
    fetch()
  }, [])
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={'#123abc'} loading={loading} />
        </div>
      ) : (
        <>
          <UserSideMenu />
          <div className="">
            <h1 className="ml-72 my-12 text-4xl font-bold uppercase">
              Orçamentos
            </h1>
            <div className="ml-72 mr-32">
              <QuoteTable columns={quoteColumns} data={quote} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Page
