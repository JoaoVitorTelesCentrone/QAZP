'use client'

import Link from 'next/link';
import React, { useState, createContext, useContext } from 'react';
import Header from '../components/Header';


import { authAtom } from '../atoms/authAtom';
import { useAtom } from 'jotai';
import { userInfoAtom } from '../atoms/userInfoAtom';
import { redirect } from 'next/navigation';

const mockedUser = 'Admin'
const mockedPassword = '12345'


const LoginPage = () => {

  const [userAuth, setUserAuth] = useAtom(authAtom)
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if(username === mockedUser && password === mockedPassword){
      setError(false)
      setUserAuth(true)
      setUserInfo({ username, password})
    } else (
      setError(true)
    )

  } 
  return (
    <>
      <Header />
      <div className='flex flex-col mx-auto py-14'>
        <h1 className='mx-auto text-3xl text-custom-secondary my-8 font-bold uppercase'>Faça seu login</h1>
        <form className='flex flex-col mx-auto'>
          <label htmlFor="email">Usuário</label>
          <input onChange={(e) => setUsername(e.target.value)} className='p-2 rounded-xl border-2 border-custom-secondary mb-8' type="text" id="email" />

          <label htmlFor="password">Senha</label>
          <input onChange={(e) => setPassword(e.target.value)} className='p-2 rounded-xl border-2 border-custom-secondary mb-8' type="password" id="password" />
          {error && (
            <h1 className='text-xl mx-auto text-red-700 my-3 '>Usuário ou senha inseridos é incorreto</h1>
          )}
        </form>
        <div className='flex flex-col'>
          <button  data-testid='login-button' className='bg-custom-secondary rounded-xl px-6 py-3 text-white max-w-[150px] mx-auto' onClick={handleSubmit} type="submit">Login</button>
          <Link className='mx-auto my-8 bg-custom-primary rounded-xl border-2 border-custom-secondary px-6 py-2' href='/'>Voltar pra Home</Link>
        </div>

      </div>
    </>
  );
};

export default LoginPage;
