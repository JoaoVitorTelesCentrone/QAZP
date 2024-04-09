"use client"

import React from 'react'
import UserHeader from '../components/UserHeader'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Client, clientColumns } from './columns'
import { ClientTable } from './ClientTable'


export const mockedClientData: Client[] = [
  { firstName: 'João', lastName: 'Silva', cpf: '123.456.789-00', email: 'joao.silva@example.com', phoneNumber: '(12) 3456-7890' },
  { firstName: 'Maria', lastName: 'Santos', cpf: '987.654.321-00', email: 'maria.santos@example.com', phoneNumber: '(34) 5678-9012' },
  { firstName: 'Pedro', lastName: 'Ferreira', cpf: '456.789.123-00', email: 'pedro.ferreira@example.com', phoneNumber: '(56) 7890-1234' },
  { firstName: 'Ana', lastName: 'Souza', cpf: '654.321.987-00', email: 'ana.souza@example.com', phoneNumber: '(78) 9012-3456' },
  { firstName: 'Lucas', lastName: 'Oliveira', cpf: '789.123.456-00', email: 'lucas.oliveira@example.com', phoneNumber: '(90) 1234-5678' },
  { firstName: 'Carla', lastName: 'Silveira', cpf: '321.654.987-00', email: 'carla.silveira@example.com', phoneNumber: '(23) 4567-8901' },
  { firstName: 'Marcos', lastName: 'Ramos', cpf: '987.654.321-00', email: 'marcos.ramos@example.com', phoneNumber: '(45) 6789-0123' },
  { firstName: 'Juliana', lastName: 'Almeida', cpf: '654.321.987-00', email: 'juliana.almeida@example.com', phoneNumber: '(67) 8901-2345' },
  { firstName: 'Gustavo', lastName: 'Pereira', cpf: '789.123.456-00', email: 'gustavo.pereira@example.com', phoneNumber: '(89) 0123-4567' },
  { firstName: 'Fernanda', lastName: 'Costa', cpf: '123.456.789-00', email: 'fernanda.costa@example.com', phoneNumber: '(01) 2345-6789' },
  { firstName: 'Rafael', lastName: 'Mendes', cpf: '987.654.321-00', email: 'rafael.mendes@example.com', phoneNumber: '(12) 3456-7890' },
  { firstName: 'Amanda', lastName: 'Carvalho', cpf: '654.321.987-00', email: 'amanda.carvalho@example.com', phoneNumber: '(34) 5678-9012' },
  { firstName: 'Roberto', lastName: 'Barbosa', cpf: '789.123.456-00', email: 'roberto.barbosa@example.com', phoneNumber: '(56) 7890-1234' },
  { firstName: 'Mariana', lastName: 'Sousa', cpf: '123.456.789-00', email: 'mariana.sousa@example.com', phoneNumber: '(78) 9012-3456' },
  { firstName: 'Luiz', lastName: 'Gomes', cpf: '987.654.321-00', email: 'luiz.gomes@example.com', phoneNumber: '(90) 1234-5678' },
  { firstName: 'Camila', lastName: 'Martins', cpf: '654.321.987-00', email: 'camila.martins@example.com', phoneNumber: '(23) 4567-8901' },
  { firstName: 'Diego', lastName: 'Fernandes', cpf: '789.123.456-00', email: 'diego.fernandes@example.com', phoneNumber: '(45) 6789-0123' },
  { firstName: 'Vanessa', lastName: 'Oliveira', cpf: '123.456.789-00', email: 'vanessa.oliveira@example.com', phoneNumber: '(67) 8901-2345' },
  { firstName: 'Paulo', lastName: 'Rocha', cpf: '987.654.321-00', email: 'paulo.rocha@example.com', phoneNumber: '(89) 0123-4567' },
  { firstName: 'Larissa', lastName: 'Santana', cpf: '654.321.987-00', email: 'larissa.santana@example.com', phoneNumber: '(01) 2345-6789' },
];



const Clients = () => {
    const [isLogged, setIsLogged] = useAtom(authAtom)

    if(!isLogged){
        redirect('/login')
    }
  return (
    <div>
        <UserHeader />
        <div className='p-20 justify-between flex'>
          <h1 className='uppercase text-4xl font-bold text-secondary-foreground'>Clientes</h1>
          <Link className='flex bg-secondary-foreground p-4 rounded-xl text-white' href='/CreateClient'>Criar cliente<Plus className='h-4 w-4 mt-1 ml-2' /> </Link>
        </div>
        <div className='mx-20 my-10'>
          <ClientTable columns={clientColumns} data={mockedClientData} />
        </div>
    </div>
  )
}

export default Clients