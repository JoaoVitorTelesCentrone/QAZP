'use client'
import React from 'react'
import UserSideMenu from '../components/UserHeader'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Quotes, quoteColumns } from './column'
import { QuoteTable } from './QuoteTable'


export const mockedQuotes:Quotes[] = [
  { name: "João Silva", email: "joao.silva@example.com", phoneNumber: "(11) 1234-5678", eventType: "Conferência", estimatedAudience: "200" },
  { name: "Maria Santos", email: "maria.santos@example.com", phoneNumber: "(21) 9876-5432", eventType: "Workshop", estimatedAudience: "50" },
  { name: "Pedro Oliveira", email: "pedro.oliveira@example.com", phoneNumber: "(31) 2468-1357", eventType: "Seminário", estimatedAudience: "100" },
  { name: "Ana Costa", email: "ana.costa@example.com", phoneNumber: "(11) 5555-5555", eventType: "Palestra", estimatedAudience: "150" },
  { name: "Luiz Ferreira", email: "luiz.ferreira@example.com", phoneNumber: "(21) 2222-2222", eventType: "Oficina", estimatedAudience: "80" },
  { name: "Mariana Martins", email: "mariana.martins@example.com", phoneNumber: "(31) 3333-3333", eventType: "Conferência", estimatedAudience: "300" },
  { name: "Rafael Rodrigues", email: "rafael.rodrigues@example.com", phoneNumber: "(11) 4444-4444", eventType: "Workshop", estimatedAudience: "70" },
  { name: "Fernanda Lima", email: "fernanda.lima@example.com", phoneNumber: "(21) 6666-6666", eventType: "Seminário", estimatedAudience: "120" },
  { name: "Carlos Pereira", email: "carlos.pereira@example.com", phoneNumber: "(31) 7777-7777", eventType: "Palestra", estimatedAudience: "200" },
  { name: "Juliana Almeida", email: "juliana.almeida@example.com", phoneNumber: "(11) 8888-8888", eventType: "Oficina", estimatedAudience: "90" },
  { name: "Gustavo Gomes", email: "gustavo.gomes@example.com", phoneNumber: "(21) 9999-9999", eventType: "Conferência", estimatedAudience: "250" },
  { name: "Amanda Nascimento", email: "amanda.nascimento@example.com", phoneNumber: "(31) 1010-1010", eventType: "Workshop", estimatedAudience: "60" },
  { name: "Diego Carvalho", email: "diego.carvalho@example.com", phoneNumber: "(11) 1212-1212", eventType: "Seminário", estimatedAudience: "130" },
  { name: "Camila Ribeiro", email: "camila.ribeiro@example.com", phoneNumber: "(21) 1313-1313", eventType: "Palestra", estimatedAudience: "180" },
  { name: "Rodrigo Sousa", email: "rodrigo.sousa@example.com", phoneNumber: "(31) 1414-1414", eventType: "Oficina", estimatedAudience: "100" },
  { name: "Patrícia Cruz", email: "patricia.cruz@example.com", phoneNumber: "(11) 1515-1515", eventType: "Conferência", estimatedAudience: "400" },
  { name: "Lucas Mendes", email: "lucas.mendes@example.com", phoneNumber: "(21) 1616-1616", eventType: "Workshop", estimatedAudience: "80" },
  { name: "Fátima Dias", email: "fatima.dias@example.com", phoneNumber: "(31) 1717-1717", eventType: "Seminário", estimatedAudience: "150" },
  { name: "Hugo Barbosa", email: "hugo.barbosa@example.com", phoneNumber: "(11) 1818-1818", eventType: "Palestra", estimatedAudience: "220" },
  { name: "Renata Fernandes", email: "renata.fernandes@example.com", phoneNumber: "(21) 1919-1919", eventType: "Oficina", estimatedAudience: "110" }
];

const Page = () => {
  const [auth, isAuth] = useAtom(authAtom)

  if(!auth) { 
    redirect('/login')
  }
  return (
    <div>
        <UserSideMenu />
        <div className='m-20'>

          <h1 className='my-4 text-4xl font-bold uppercase'>Orçamentos</h1>
          
          <QuoteTable columns={quoteColumns} data={mockedQuotes} />
        </div>
    </div>
  )
}

export default Page