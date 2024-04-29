'use client'
import React, { useEffect, useState } from 'react'
import UserSideMenu from '../components/UserHeader'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Quotes, quoteColumns } from './column'
import { QuoteTable } from './QuoteTable'
import axios from 'axios'


const Page = () => {
  const [auth, isAuth] = useAtom(authAtom)
  const [quote, setQuote] = useState([])

  if(!auth) { 
    redirect('/login')
  }

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get('http://localhost:5196/api/Quote');
         
        setQuote(response.data)

      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        throw error
      }
    }
    fetchUserData()
  }, [])
  return (
    <div>
        <UserSideMenu />
        <div className='m-20'>

          <h1 className='my-4 text-4xl font-bold uppercase'>Orçamentos</h1>
          
          <QuoteTable columns={quoteColumns} data={quote} />
        </div>
    </div>
  )
}

export default Page