import React from 'react'
import Header from '../components/Header'
import foto from '../../assets/foto-2.png'
import Image from 'next/image'

const Page = () => {
  return (
    <div className='flex flex-col'>
      <Header /> 
      <h1 className='mt-12 uppercase font-bold text-6xl mx-auto font-montserrat text-center max-w-[1200px]'>Estamos aqui para fazer o seu evento se tornar algo simples</h1>
      <Image className='mt-12 mb-40 mx-auto' src={foto} alt='foto' />
      <h1 className='my-14 font-bold text-5xl mx-auto font-montserrat uppercase text-center max-w-[1200px]'>Nossa história</h1>
      <div className='justify-around flex mx-20'>
        <div className='mx-10'>
          <h1 className='mt-12 font-bold text-3xl font-montserrat uppercase text-center '>O Começo</h1>
          <p className='mt-2 font-medium text-lg font-montserrat  text-center' >Com dedicação, a empresa ganhou reconhecimento pela qualidade de seus eventos, tornando-se líder regional.</p>
        </div>
        <div className='mx-10'>
          <h1 className='mt-12 font-bold text-3xl font-montserrat uppercase text-center '>O Começo</h1>
          <p className='mt-2 font-medium text-lg font-montserrat  text-center' >Com dedicação, a empresa ganhou reconhecimento pela qualidade de seus eventos, tornando-se líder regional.</p>
        </div>
        <div className='mx-10'>
          <h1 className='mt-12 font-bold text-3xl font-montserrat uppercase text-center '>O Começo</h1>
          <p className='mt-2 font-medium text-lg font-montserrat  text-center' >Com dedicação, a empresa ganhou reconhecimento pela qualidade de seus eventos, tornando-se líder regional.</p>
        </div>
      </div>
    </div>
  )
}

export default Page