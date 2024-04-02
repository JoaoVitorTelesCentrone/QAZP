"use client"

import Image from 'next/image'
import React from 'react'
import Header from '../components/Header'
import foto from '../../assets/foto-1.png'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'

const page = () => {
  const [isLogged, setIsLogged] = useAtom(authAtom)

  if(!isLogged) { 
    redirect('/login')
  }

  return (
    <div className=''>
      <Header />
      <div className='flex mx-20 my-40 justify-around'>
        <div className='w-[40%]'>
          <h1 className='text-center text-5xl uppercase font-bold text-custom-secondary my-2'>Lorem Ipsum</h1>
          <p className='font-medium text-center text-custom-secondary mt-10 text-lg '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
        </div>
        <Image className='[w-60%] h-[250px]' src={foto} alt='' />
      </div>
      <div className='flex m-20 justify-around'>
        <Image className='[w-60%] h-[250px]' src={foto} alt='' />
        <div className='w-[40%]'>
          <h1 className='text-center text-5xl uppercase font-bold text-custom-secondary my-2'>Lorem Ipsum</h1>
          <p className='font-medium text-center text-custom-secondary mt-10 text-lg '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
        </div>
      </div>
      <div className='flex mx-20 my-40 justify-around'>
        <div className='w-[40%]'>
          <h1 className='text-center text-5xl uppercase font-bold text-custom-secondary my-2'>Lorem Ipsum</h1>
          <p className='font-medium text-center text-custom-secondary mt-10 text-lg '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
        </div>
        <Image className='[w-60%] h-[250px]' src={foto} alt='' />
      </div>
    </div>
  )
}

export default page