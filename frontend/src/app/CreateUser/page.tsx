'use client'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import UserHeader from '../components/UserHeader'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Eye, Info } from 'lucide-react'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import axios from 'axios'
import Link from 'next/link'
  

const CreateUserForm = () => {
    const[isLogged, setIsLogged] = useAtom(authAtom)
    const[userInfo, setUserInfo] = useAtom(userInfoAtom)

    if(!isLogged){
        redirect('/login')
    }

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmPassword] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
      e.preventDefault()
      const data = {
        name: name,
        username: username,
        password: password,
        role: 0
      };
      
      // Envia o pedido POST usando o Axios
      axios.post('http://localhost:5196/api/User', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        console.log('Resposta da API:', response.data);
      })
      .catch(function (error) {
        console.error('Erro ao enviar pedido:', error);
      });
    }

    
  return (
    <div>
      <UserHeader />
      <div className='flex my-8 m-32 flex-col'> 
        <div className="flex w-full">
          <h1 className='text-4xl font-bold uppercase mx-auto text-primary mb-6'>Criar usuário</h1>
          <Link href='/Users'><ArrowLeft /></Link>
        </div>

        <form className='flex-col flex p-8 rounded-xl bg-slate-400 bg-opacity-30 max-w-[400px] mx-auto shadow-lg shadow-slate-500'>
            <div className='mx-auto mb-1 w-full'>
                <p>Nome</p>
                <Input onChange={(e) => setName(e.target.value) } required placeholder='Digite o nome completo' className='bg-white border-slate-500 mx-auto my-2' />
            </div>

            <div className='mx-auto my-1 w-full '>
                <div className='flex justify-between'>
                    <p>Usuário</p>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger><Info className='h-4 w-4' /></TooltipTrigger>
                            <TooltipContent>
                            <p>Esse será o nome do usuário</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <Input onChange={(e) => setUsername(e.target.value) } required placeholder='Digite o nome do usuário' className='bg-white border-slate-500 mx-auto my-2' />
            </div>

            <div className='mx-auto my-1 w-full '>
                <p>Senha</p>
                <div className='flex'>
                  <Input onChange={(e) => setPassword(e.target.value) } required placeholder='Digite senha' className='bg-white border-slate-500 mx-auto my-2' />
                  <Eye className='mt-3 ml-2 cursor-pointer' />
                </div>
            </div>

            <div className='mx-auto my-1 w-full '>
                <p>Confirme a senha</p>
                <div className='flex'>
                  <Input onChange={(e) => setPassword(e.target.value) } required placeholder='Confirme a senha' className='bg-white border-slate-500 mx-auto my-2' />
                  <Eye className='mt-3 ml-2 cursor-pointer' />
                </div>
            </div>
            
            <Button variant='outline' className='bg-secondary-foreground mt-2 text-white' onClick={() => handleSubmit}>Criar usuário</Button>
        </form>
      </div>

    </div>
  )
}

export default CreateUserForm
