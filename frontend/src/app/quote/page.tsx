'use client'
import React, { useEffect, useState, useCallback } from 'react'
import UserSideMenu from '../components/UserHeader'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { quoteColumns } from './column'
import { QuoteTable } from './QuoteTable'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'
import { quoteChangeAtom } from '../atoms/changeQuoteAtom'
import { GiTakeMyMoney } from 'react-icons/gi'
import { formatPhoneNumber } from '@/functions/functions'
import withAuth from '../hoc/withAuth'

const Page = () => {
  const [quote, setQuote] = useState([])
  const [loading, setLoading] = useState(true)
  const [quoteChange] = useAtom(quoteChangeAtom)

  const fetchUserData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        'http://localhost:5196/api/Quote/active-quotes',
      )

      const quotes = response.data.map((quote: any) => ({
        id: quote.id,
        fullName: quote.fullName,
        email: quote.email,
        phoneNumber: formatPhoneNumber(quote.phoneNumber),
        eventType: quote.eventType,
        estimatedAudience: quote.estimatedAudience,
      }))

      setQuote(quotes)
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 100)
    }
  }, [])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData, quoteChange])

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={'#123abc'} loading={loading} />
        </div>
      ) : (
        <>
          <UserSideMenu />
          <div className="bg-tertiary h-screen">
            <div className="p-10">
              <div className="flex mt-4 justify-between w-full">
                <div className="flex ml-48">
                  <GiTakeMyMoney className=" w-16 h-16 p-1 rounded-full my-5 text-primary border-2 border-primary" />
                  <h1 className="font-monospace font-semibold text-7xl my-3 mx-4 text-secondary-foreground text-primary">
                    Orçamentos
                  </h1>
                </div>
              </div>
            </div>
            <div className="bg-tertiary">
              <div className="ml-56 mr-10">
                <QuoteTable columns={quoteColumns} data={quote} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default withAuth(Page)
