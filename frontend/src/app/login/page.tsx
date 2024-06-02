
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { userInfoAtom } from '../atoms/userInfoAtom'
import Header from '../components/Header'
import { redirect, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Toaster, toast } from 'sonner'
import Footer from '../components/Footer'


const LoginPage = () => {
  const router = useRouter()
  const [userAuth, setUserAuth] = useAtom(authAtom)
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [logged, isLogged] = useState(false)

  async function verifyLogin(username: string, password: string) { 
    try {
      const response = await axios.get(`http://localhost:5196/api/User/${username}&${password}`);
      const userName = response.data.name
      const userData = response.data.username
      const userPassword = response.data.password
      console.log(userData)
      if (response.status === 200) {
        console.log(response.data);
        isLogged(true)
        setError(false)
        // setUserInfo()
      setUserAuth(true)
      toast.success(`Bem vindo ${username}`)
      setUserInfo({name: userName, username: username, password: userPassword})
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      toast.error('Usuário ou senha incorretos')
      setError(true)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await verifyLogin(username, password)
  }

  return (
    <>
      <Header />
      <Toaster richColors />
      <div className='flex flex-col mx-auto py-14 bg-primary h-screen'>
        <h1 className='mx-auto text-5xl text-secondary-foreground my-8 font-bold uppercase text-secondary'>Faça seu login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col mx-auto rounded-xl bg-slate-400 p-6 bg-opacity-20 shadow-md shadow-slate-500'>
          <label className='text-lg font-bold '>Usuário</label>
          <Input placeholder='Digite o usuário' onChange={(e) => setUsername(e.target.value)} className='p-2 bg-white border-slate-500 mb-8' type='text' id='email' />

          <label className='text-lg font-bold' htmlFor='password'>Senha</label>
          <Input placeholder='Digite a senha' onChange={(e) => setPassword(e.target.value)} className='p-2 border-slate-500 bg-white mb-8' type='password' id='password' />
          <div className='flex flex-col'>
            <button data-testid='login-button' className='bg-primary text-secondary rounded-xl px-6 py-3 max-w-[150px] mx-auto' type='submit'>Entrar</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default LoginPage
