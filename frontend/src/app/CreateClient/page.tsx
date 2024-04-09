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
  

const CreateClientForm = () => {
    const[isLogged, setIsLogged] = useAtom(authAtom)
    const[userInfo, setUserInfo] = useAtom(userInfoAtom)

    if(!isLogged){
        redirect('/login')
    }

  return (
    <div>
      <UserHeader />
        
        <form className='flex-col flex mx-auto max-w-[1200px] '>
            <h1 className='text-4xl font-bold uppercase text-primary mb-6 mx-auto mt-8 '>Criar Cliente</h1>
            <div className='flex my-10'> 
                <div className='flex flex-col justify-center w-[40%] '>
                    <p>Primeiro nome</p>
                    <Input onChange={(e) => console.log() } required placeholder='Digite o nome completo' className='mx-auto my-2' />
                </div>

                <div className='flex flex-col w-[60%] mx-10 '>
                    <p>Sobrenome</p>
                    <Input onChange={(e) => console.log() } required placeholder='Digite o sobrenome' className='mx-auto my-2' />
                </div>
            </div>

            <div className='flex my-10 justify-center max-[1200px]'>
                <div className='flex flex-col mx-auto my-3 w-[50%] '>
                    <p>CPF</p>
                    <Input onChange={(e) => console.log() } required placeholder='Digite o CPF' className='mx-auto my-2' />
                </div>

                <div className='flex flex-col  my-3 w-[50%] mx-10'>
                    <p>Número de celular</p>
                    <Input onChange={(e) => console.log() } required placeholder='Digite o número de celular' className='mx-auto my-2' />
                </div>
            </div>

            <div className='flex flex-col  my-3 w-[100%]  '>
                    <p>Email</p>
                    <Input onChange={(e) => console.log() } required placeholder='Digite o email' className='mx-auto my-2' />
            </div>
            
            <Button variant='link' >Criar Cliente</Button>
        </form>


    </div>
  )
}

export default CreateClientForm
