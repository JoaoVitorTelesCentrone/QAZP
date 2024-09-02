'use client'

import React, { useState } from 'react'
import Header from '../components/Header'
import { Input } from '../../components/ui/input'
import axios from 'axios'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { Toaster, toast } from 'sonner'

type Quote = {
  fullName: string
  email: string
  phoneNumber: string
  eventType: string
  estimatedAudience: number
}

const Page = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [eventType, setType] = useState('')
  const [estimatedAudience, setAudience] = useState(0)

  async function handleSubmit() {
    const quote = {
      fullName,
      email,
      phoneNumber,
      eventType,
      estimatedAudience,
    }

    const response = await axios
      .post('http://localhost:5196/api/Quote', quote, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('Resposta:', response.data)
        toast.success('Orçamento enviado')
      })
      .catch(error => {
        console.error('Erro:', error)
        console.log(quote)
        toast.error('Evento não foi criado')
      })
  }
  return (
    <div>
      <Header />
      <Toaster richColors />
      <div className="p-20 bg-quintenary">
        <h1 className="text-6xl mx-auto font-montserrat font-bold uppercase text-center text-primary ">
          Solicite um orçamento
        </h1>
        <div className="my-10 bg-primary shadow-md shadow-slate-500 mx-auto  max-w-[500px] justify-between py-10 flex flex-col border-2 rounded-2xl">
          <div className="shadow-black flex flex-col mx-10 py-4 rounded-xl">
            <h1 className="text-2xl text-quintenary font-bold ">
              Informações pessoais
            </h1>
            <Input
              className="my-2 bg-white border-slate-400"
              onChange={e => setFullName(e.target.value)}
              placeholder="Digite o nome completo"
            />
            <Input
              className="my-2 bg-white px-2 border-slate-400"
              type="email"
              onChange={e => setEmail(e.target.value)}
              placeholder="Digite o email"
            />
            <Input
              className="my-2 bg-white border-slate-400"
              onChange={e => setPhoneNumber(e.target.value)}
              placeholder="Digite o telefone"
            />
          </div>

          <div className="py-4 mx-10  border-2shadow-slate-400 rounded-xl flex flex-col">
            <h1 className="text-2xl text-secondary font-bold">
              Informações do evento
            </h1>
            <Input
              className="my-2 bg-white border-slate-400 text-slate-400"
              type="number"
              onChange={e => setAudience(parseInt(e.target.value))}
              placeholder="Digite a Audiência estimada"
            />
            <DropdownMenu>
              <DropdownMenuTrigger className="border-slate-400 my-2 bg-white flex h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 justify-between focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                {eventType ? eventType : 'Selecione o Tipo do evento'}{' '}
                <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white mb-24 ml-96">
                <DropdownMenuItem onClick={() => setType('Casamento')}>
                  Casamento
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setType('Velorio')}>
                  Velório
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setType('Formatura')}>
                  Formatura
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setType('Festa')}>
                  Festa
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setType('Outros')}>
                  Outros
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="my-10 text-center justify-center flex">
          <button
            onClick={handleSubmit}
            className="bg-primary border-[0.5px] border-white text-quintenary p-4 rounded-xl font-bold uppercase mx-10 shadow-lg"
          >
            Enviar solicitação
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
