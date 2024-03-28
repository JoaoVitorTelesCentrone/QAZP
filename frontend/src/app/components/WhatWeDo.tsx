import React from 'react'
import Image from 'next/image'
import foto from '../../assets/foto-1.png'

const WhatWeDo = () => {
  return (
    <div className='py-20 flex flex-col'>
        <div className='flex flex-col'>
            <h1 className='mx-auto text-custom-tertiary text-xl uppercase font-bold font-montserrat'>o que fazemos ?</h1>
            <h1 className='mx-auto text-custom-secondary text-5xl uppercase font-bold font-montserrat my-4'>levamos vida a eventos mágicos</h1>
            <p className='mx-auto max-w-[800px] text-custom-secondary text-md font-light text-center font-montserrat my-4'>Na nossa empresa, levamos vida a eventos mágicos, transformando cada ocasião em uma experiência encantadora e memorável. Com criatividade, dedicação e atenção aos detalhes, criamos momentos únicos que cativam e surpreendem, tornando cada celebração verdadeiramente especial.</p>
        </div>
        <div className='py-24 flex mx-auto'>
            <div className='mx-14'>
                <div className='bg-custom-secondary rounded-xl p-3 mb-8'>
                    <h1 className='font-montserrat font-bold text-2xl text-custom-primary uppercase text-center'>Desing</h1>
                    <p className='font-montserrat max-w-[350px] my-2 text-custom-primary text-center'>Criamos experiências únicas e emocionantes para casais apaixonados, cuidando de todos os aspectos do planejamento para que seu dia especial seja perfeito.</p>
                </div>

                <div className='mb-8'>
                    <h1 className='font-montserrat font-bold text-2xl text-custom-secondary uppercase text-center'>Desing</h1>
                    <p className='font-montserrat max-w-[350px] my-2 text-center'>Criamos experiências únicas e emocionantes para casais apaixonados, cuidando de todos os aspectos do planejamento para que seu dia especial seja perfeito.</p>
                </div>

                <div className='mb-8'>
                    <h1 className='font-montserrat font-bold text-2xl text-custom-secondary uppercase text-center'>Desing</h1>
                    <p className='font-montserrat max-w-[350px] my-2 text-center'>Criamos experiências únicas e emocionantes para casais apaixonados, cuidando de todos os aspectos do planejamento para que seu dia especial seja perfeito.</p>
                </div>
            </div>
            <Image alt='foto' src={foto} />
        </div>
    </div>
  )
}

export default WhatWeDo