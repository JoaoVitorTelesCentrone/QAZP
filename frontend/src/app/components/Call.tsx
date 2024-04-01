import Link from 'next/link'
import React from 'react'

const Call = () => {
  return (
    <div className='flex flex-col py-40 px-12'>
        <h1 className='font-montserrat text-8xl max-w-[1200px] text-center mx-auto uppercase font-bold'>O lugar certo para seu evento</h1>
        <p className='max-w-[800px] text-center py-6 font-montserrat text-lg mx-auto lowercase font-medium'>nossa empresa de eventos oferece experiências únicas e diversificadas para todos os gostos, conectando pessoas e celebrando momentos especiais.</p>
        <Link href='/orcamento' className='bg-custom-secondary mx-auto p-4 shadow-lg shadow-custom-secondary max-w-[230px] rounded-2xl text-custom-primary'>Solicite um orçamento</Link>
    </div>
  )
}

export default Call