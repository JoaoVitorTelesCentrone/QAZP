
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { userInfoAtom } from '../atoms/userInfoAtom'
import Header from '../components/Header'
import { redirect, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'


const mockedUser = 'a'
const mockedPassword = '1'


const LoginPage = () => {
  const router = useRouter()
  const [userAuth, setUserAuth] = useAtom(authAtom)
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (username === mockedUser && password === mockedPassword) {
      setError(false)
      setUserAuth(true)
      router.push('/dashboard')
    } else {
      setError(true)
    }
  }

  return (
    <>
      <Header />
      <div className='flex flex-col mx-auto py-14'>
        <h1 className='mx-auto text-5xl text-secondary-foreground my-8 font-bold uppercase'>Faça seu login</h1>
        <form className='flex flex-col mx-auto rounded-xl bg-slate-400 p-6 bg-opacity-20 shadow-md shadow-slate-500' onSubmit={handleSubmit}>
          <label className='text-lg font-bold '>Usuário</label>
          <Input placeholder='Digite o usuário' onChange={(e) => setUsername(e.target.value)} className='p-2 border-slate-500 bg-white mb-8' type='text' id='email' />

          <label className='text-lg font-bold' htmlFor='password'>Senha</label>
          <Input placeholder='Digite a senha' onChange={(e) => setPassword(e.target.value)} className='p-2 border-slate-500 bg-white mb-8' type='password' id='password' />
          {error && (
            <h1 className='text-xl mx-auto text-red-700 my-3 '>Usuário ou senha inseridos é incorreto</h1>
          )}
          {userAuth && (
            <h1 className='text-xl mx-auto text-green-900 my-3'>Logado</h1>
          )}
          <div className='flex flex-col'>
            <button data-testid='login-button' className='bg-secondary-foreground rounded-xl px-6 py-3 text-white max-w-[150px] mx-auto' type='submit'>Entrar</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginPage
