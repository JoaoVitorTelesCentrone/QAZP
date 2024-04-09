'use client'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import UserHeader from '../components/UserHeader'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Info, Search } from 'lucide-react'

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
        
        <form className='mt-5 flex-col flex mx-auto border-2 rounded-xl border-secondary-foreground shadow-lg shadow-black border-slate-200 bg-slate-600 bg-opacity-10 p-10 max-w-[800px]  '>
            <h1 className='text-4xl font-bold uppercase text-primary mb-6 mx-auto mt-2 '>Criar Cliente</h1>
            <div className='flex my-2 justify-around'> 
                <div className='flex flex-col '>
                    <p>Nome</p>
                    <Input onChange={(e) => console.log() } required placeholder='Digite o nome' className='mx-auto my-2 border-black' />
                </div>

                <div className='flex flex-col '>
                    <p>Sobrenome</p>
                    <Input onChange={(e) => console.log() } required placeholder='Digite o sobrenome' className='mx-auto my-2 border-black' />
                </div>

                <div className='flex flex-col  '>
                    <p>CPF</p>
                    <Input onChange={(e) => console.log() } required placeholder='Digite o CPF' className='mx-auto my-2 border-black' />
                </div>
            </div>

            <div className='flex my-2 justify-around'> 
                <div className='flex flex-col w-[33%] mx-3'>
                    <p>CEP</p>
                    <div className='flex'>
                        <Input onChange={(e) => console.log() } required placeholder='Digite o nome' className='mx-1 my-2 border-black' />
                        <button><Search className=' ' /></button>
                    </div>
                </div>

                <div className='flex flex-col w-[33%] mx-3'>
                    <p>Rua</p>
                    <Input disabled={true} onChange={(e) => console.log() } required placeholder='Digite o sobrenome' className='mx-auto my-2 border-black' />
                </div>

                <div className='flex flex-col w-[33%] mx-3 '>
                    <p>Número</p>
                    <Input disabled={true} onChange={(e) => console.log() } required placeholder='Digite o CPF' className='mx-auto my-2 border-black' />
                </div>
            </div>

            
                
            

            <div className='flex flex-col max-w-[600px] mx-10 my-3 w-[100%]  '>
                    <p>Email</p>
                    <Input onChange={(e) => console.log() } required placeholder='Digite o email' className='mx-auto my-2 border-black' />
            </div>
            
            <Button variant='default' >Criar Cliente</Button>
        </form>


    </div>
  )
}

export default CreateClientForm
