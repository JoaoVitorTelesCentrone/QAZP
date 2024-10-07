import React from 'react'
import { FaArrowDown } from 'react-icons/fa'

const WhatWeDo = () => {
  return (
    <div className="px-20 pt-24 pb-10  flex justify-between bg-primary">
      <div className="flex flex-col text-center space-y-8">
        <h1 className="mx-auto text-cyan-500 xl:text-5xl text-4xl uppercase font-bold font-montserrat">
          o que fazemos ?
        </h1>
        <h1 className="mx-auto text-secondary text-7xl uppercase font-bold font-montserrat my-4">
          levamos vida a eventos mágicos
        </h1>
        <p className="mx-auto max-w-[800px] text-secondary text-md font-light text-center font-montserrat mt-10 text-xl">
          Na nossa empresa, levamos vida a eventos mágicos, transformando cada
          ocasião em uma experiência encantadora e memorável. Com criatividade,
          dedicação e atenção aos detalhes, criamos momentos únicos que cativam
          e surpreendem, tornando cada celebração verdadeiramente especial.
        </p>
      </div>
      <div className="flex mx-auto">
        <div className="mx-14">
          <div className="mb-2 border-2 bg-white text-primary p-2 rounded-xl">
            <h1 className="font-montserrat font-extrabold text-3xl  uppercase text-center">
              Nossa missão
            </h1>
            <p className="font-montserrat  my-2 text-center">
              Levar vida a eventos extraordinários. Nosso objetivo é criar
              atmosferas encantadoras que reflitam a personalidade e o estilo de
              cada cliente.
            </p>
          </div>
          <FaArrowDown className="mx-auto mb-2 text-white w-12 h-12" />

          <div className="bg-secondary rounded-xl p-3 mb-2">
            <h1 className="font-montserrat font-extrabold text-3xl text-primary uppercase text-center">
              Como trabalhamos
            </h1>
            <p className="font-montserrat  my-2 text-primary text-center">
              Damos vida a eventos mágicos. Combinamos criatividade, expertise e
              atenção a cada detalhe para transformar suas ideias em momentos
              inesquecíveis.
            </p>
          </div>
          <FaArrowDown className="mx-auto mb-2 text-white w-12 h-12" />
          <div className="bg-secondary rounded-xl p-3 mb-2">
            <h1 className="font-montserrat font-extrabold text-3xl text-primary uppercase text-center">
              Resultados que entregamos
            </h1>
            <p className="font-montserrat  my-2 text-primary text-center">
              Entregamos experiências que ficam na memória. Cada evento
              planejado por nós é uma jornada repleta de emoções, cuidadosamente
              elaborada para superar expectativas.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatWeDo
