'use client'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import UserHeader from '../components/UserHeader'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  

const CreateUserForm = () => {
    const[isLogged, setIsLogged] = useAtom(authAtom)
    const[userInfo, setUserInfo] = useAtom(userInfoAtom)

    if(!isLogged){
        redirect('/login')
    }

    const handleSubmit = () => { 
        setUserInfo({name, username, password})
        alert('clicou')
    }

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  return (
    <div>
      <UserHeader />
      <div className='flex m-32 flex-col'> 
        <h1 className='text-4xl font-bold uppercase mx-auto text-primary mb-6'>Criar usuário</h1>
        <form className='flex-col flex'>
            <div className='flex flex-col mx-auto mb-3'>
                <p>Nome</p>
                <Input onChange={(e) => setName(e.target.value) } required placeholder='Digite o nome completo' className='mx-auto my-2' />
            </div>

            <div className='flex flex-col mx-auto my-3 '>
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
                <Input onChange={(e) => setUsername(e.target.value) } required placeholder='Digite o nome do usuário' className='mx-auto my-2' />
            </div>

            <div className='flex flex-col mx-auto my-3 '>
                <p>Senha</p>
                <Input onChange={(e) => setPassword(e.target.value) } required placeholder='Digite a senha' className='mx-auto my-2' />
            </div>
            
            <Button variant='link' onClick={handleSubmit}>Criar usuário</Button>
        </form>
      </div>

    </div>
  )
}

export default CreateUserForm
