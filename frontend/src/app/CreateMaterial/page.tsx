'use client'
import React, { useState } from 'react'
import UserSideMenu from '../components/UserHeader'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CreateMaterial = () => {
    
    const [name , setName] = useState('')
    const [price , setPrice] = useState('')
    const [type , setType] = useState('')
  
    return (
    <div>
      <UserSideMenu />
      <h1 className="font-bold text-5xl text-center my-10">
        Criar material
      </h1>
      <div className='flex flex-col border-2 rounded-xl bg-primary bg-opacity-20 p-8 w-[600px] mx-auto justify-around'>
            <div className="flex flex-col">
                <h1 className='mx-4'>Digite o nome do material</h1>
                <Input onChange={(e) => setName(e.target.value)} placeholder='Nome' className='border-2 border-primary bg-white placeholder:text-primary m-4 w-[90%]' />
            </div>
        <div className="flex w-full">
            <div className="flex flex-col">

                <DropdownMenu >            
                    <DropdownMenuTrigger className='flex border-2 bg-white border-primary justify-between px-8 w-[70%px] py-1 m-4 rounded-xl mr-8'>
                    <h1 className='mt-1 mr-3'>{type ? type : 'Categoria'}</h1>
                    <ArrowDown className='h-4 w-4 mt-2' />
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent className='border-2 p-4 bg-white ml-48 rounded-xl'>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => setType('Festa')}>Festa</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => setType('Velorio')}>Velorio</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => setType('Formatura')}>Formatura</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => setType('Casamento')}>Casamento</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Input onChange={(e) => setPrice(e.target.value)} placeholder='Digite o preco' className='border-2 border-primary bg-white placeholder:text-primary my-4 w-[30%]' />
           

            <Button className='text-white w-[120px] my-4 ml-8 p-2'>Criar material</Button>
        </div>
      </div>
    </div>
  )
}

export default CreateMaterial
