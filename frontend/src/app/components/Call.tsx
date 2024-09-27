import { Button } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import foto from '../../assets/foto-1.png'
import { redirect } from 'next/navigation'

import React from 'react'

const redirectTo = () => {
  redirect('/orcamento')
}

const Call = () => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col xl:py-40 py-24 xl:w-[65%] w-[50%] px-12 bg-primary">
        <h1 className="font-montserrat xl:text-8xl text-7xl max-w-[1200px] text-center text-secondary mx-auto uppercase font-bold">
          O lugar certo para seu evento
        </h1>
        <p className="max-w-[800px] text-center py-6 font-montserrat text-2xl text-secondary mx-auto lowercase font-medium">
          nossa empresa de eventos oferece experiências únicas e diversificadas
          para todos os gostos, conectando pessoas e celebrando momentos
          especiais.
        </p>
        <Link href="/orcamento" className="mx-auto">
          <Button>Solicite um orçamento</Button>
        </Link>
      </div>
      <div className="bg-primary xl:w-[35%] w-[50%]">
        <Image className="xl:mt-12 mt-24" alt="foto" src={foto} />
      </div>
    </div>
  )
}

export default Call
