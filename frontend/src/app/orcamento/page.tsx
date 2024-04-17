'use client'

import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { TextField } from '@mui/material'
import {Input} from '../../components/ui/input'
import { useAtom } from 'jotai'
import { getQuoteAtom } from '../atoms/getQuoteAtom'
import axios from 'axios'
import { v4 as uuidv4 } from "uuid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowDown,  ArrowDownIcon, ChevronDown } from 'lucide-react'

type Quote = {
  "id": string
  "firstName": string, 
  "lastName": string,
  "email": string,
  "phoneNumber": string,
  "eventType": string,
  "estimatedAudience": number
}

const id = uuidv4()
const Page = () => {

  const [quote, setQuote] = useState<Quote>({"id": id, "firstName": "","lastName": "" ,"email": "","phoneNumber": "","type": "","estimatedAudience": 0})
  const[firstName, setFirstname] = useState("")
  const[lastName, setLastname] = useState("")
  const[email, setEmail] = useState("")
  const[phoneNumber, setPhoneNumber] = useState("")
  const[type, setType] = useState("")
  const[estimatedAaudience, setAudience] = useState(0)

  useEffect(() => {
    console.log(quote);
  }, [quote]);

  async function handleSubmit () {
    setQuote({id : id, firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, eventType: type, estimatedAudience: estimatedAaudience}) 
    const response = await axios.post('http://localhost:5196/api/Quote', quote, 
    {headers: {
      'Content-Type': 'application/json'
    }})
    .then((response) => {
      console.log('Resposta:', response.data);
    })
    .catch(error => {
      console.error('Erro:', error);
    });
    fetchQuote()
    console.log('editar')
  } 

    async function fetchQuote() {
      try {
        const response = await axios.get('http://localhost:5196/api/Quote');

        if (response.status === 200) {
          console.log(response.data);
          setQuote(response.data[1])
        } else {
          throw new Error('erro');
        }
      } catch (error) {
        console.error('Erro', error);
      }
    }

  return (
    <div>
      <Header /> 
      <div className='p-20'>
        <h1 className='text-6xl mx-auto font-montserrat font-bold uppercase text-center text-secondary-foreground'>Solicite um orçamento</h1>
        <div className='my-10 bg-slate-500 shadow-md shadow-slate-500 mx-auto bg-opacity-15 max-w-[500px] justify-between py-10 flex flex-col border-2 rounded-2xl'>
          <div className='shadow-black flex flex-col mx-10 py-4 rounded-xl'>
            <h1 className='text-2xl font-bold'>Informações pessoais</h1>
            <Input className='my-2 bg-white border-slate-400' onChange={(e) => setFirstname(e.target.value)} placeholder='Digite o primeiro nome' />
            <Input className='my-2 bg-white border-slate-400' onChange={(e) => setLastname(e.target.value)} placeholder='Digite o segundo nome' />
          </div>

          <div className='mx-10 shadow-slate-400 flex flex-col  py-4 rounded-xl'>
            <h1 className='text-2xl font-bold'>Informações de contato</h1>
            <Input className='my-2 bg-white px-2 border-slate-400' type='email' onChange={(e) => setEmail(e.target.value)}  placeholder='Digite o email' />
            <Input className='my-2 bg-white border-slate-400' onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Digite o telefone'  />
          </div>

          <div className='py-4 mx-10  border-2shadow-slate-400 rounded-xl flex flex-col'>
            <h1 className='text-2xl font-bold'>Informações do evento</h1>
            <Input className='my-2 bg-white border-slate-400 text-slate-400'  onChange={(e) => setAudience(100)} placeholder='Digite a Audiência estimada' />
            <DropdownMenu >
              <DropdownMenuTrigger className="border-slate-400 my-2 bg-white flex h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 justify-between focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                {type ? type : 'Selecione o Tipo do evento'} <ChevronDown/>
                </DropdownMenuTrigger>
              <DropdownMenuContent >
                <DropdownMenuItem onClick={() => setType('Casamento')}>Casamento</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setType('Velorio')}>Velório</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setType('Formatura')}>Formatura</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setType('Festa')}>Festa</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setType('Outros')}>Outros</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className='my-10 text-center justify-center flex'>
          <button onClick={handleSubmit} className='bg-secondary-foreground text-white p-4 rounded-xl font-bold uppercase mx-10'>Enviar solicitação</button>
          <button className='bg-white text-secondary-foreground border-2 border-secondary-foreground p-4 rounded-xl font-bold uppercase'>duvidas ?</button>
        </div>
      </div>
      
    </div>
  )
}

export default Page