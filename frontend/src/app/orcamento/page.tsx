import React from 'react'
import Header from '../components/Header'
import { TextField } from '@mui/material'
import Input from '../components/Input'

const page = () => {
  return (
    <div>
      <Header /> 
      <div className='flex flex-col m-20'>
        <h1 className='text-6xl mx-auto font-montserrat font-bold uppercase text-center text-custom-secondary'>Solicite um orçamento</h1>
        <div className='my-10'>
          <div className='my-8 justify-evenly flex '>
            <Input value='Nome' />
            <Input value='Sobrenome' />
          </div>

          <div className='my-8 flex justify-evenly'>
            <Input value='Email' />
            <Input value='Telefone' />
          </div>

          <div className='my-8 flex justify-evenly'>
            <Input value='Nome' />
            <Input value='Sobrenome' />
          </div>
        </div>

        <div className='my-10 mx-auto flex justify-around'>
          <button className='bg-custom-secondary text-white p-4 rounded-xl font-bold uppercase mx-10'>Enviar solicitação</button>
          <button className='bg-white text-custom-secondary border-2 border-custom-secondary p-4 rounded-xl font-bold uppercase'>duvidas ?</button>
        </div>
      </div>
    </div>
  )
}

export default page