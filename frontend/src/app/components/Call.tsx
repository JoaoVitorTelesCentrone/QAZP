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
      <div className="flex flex-col py-40 w-[65%] px-12 bg-primary">
        <h1 className="font-montserrat text-8xl max-w-[1200px] text-center text-secondary mx-auto uppercase font-bold">
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
      <div className="bg-primary w-[35%]">
        <Image className="mt-12" alt="foto" src={foto} />
      </div>
    </div>
  )
}

export default Call
