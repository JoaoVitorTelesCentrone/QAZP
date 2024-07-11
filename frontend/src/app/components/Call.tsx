import Link from 'next/link'
import React from 'react'

const Call = () => {
  return (
    <div className="flex flex-col py-40 px-12 bg-primary">
      <h1 className="font-montserrat text-8xl max-w-[1200px] text-center text-secondary mx-auto uppercase font-bold">
        O lugar certo para seu evento
      </h1>
      <p className="max-w-[800px] text-center py-6 font-montserrat text-2xl text-secondary mx-auto lowercase font-medium">
        nossa empresa de eventos oferece experiências únicas e diversificadas
        para todos os gostos, conectando pessoas e celebrando momentos
        especiais.
      </p>
      <Link
        href="/orcamento"
        className="bg-tertiary mx-auto p-4 shadow-md shadow-blue-300 max-w-[230px] rounded-2xl text-primary"
      >
        Solicite um orçamento
      </Link>
    </div>
  )
}

export default Call
