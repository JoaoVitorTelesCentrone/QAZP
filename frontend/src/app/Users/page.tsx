import React from 'react'
import UserHeader from '../components/UserHeader'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { columns, type Users } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { UsersTable } from './UsersTable';

const mockData: Users[] = [
    {"name":"John Doe","username":"johndoe123","password":"p@ssw0rd"},
    {"name":"Jane Smith","username":"janesmith456","password":"secure123!"},
    {"name":"Michael Johnson","username":"michaelj","password":"passw0rd!"},
    {"name":"Emily Brown","username":"emilyb","password":"password123"},
    {"name":"David Wilson","username":"davidw","password":"david1234"},
    {"name":"Sarah Thompson","username":"sarah.t","password":"thompson567"},
    {"name":"Christopher Martinez","username":"chrism","password":"password!123"},
    {"name":"Jessica Davis","username":"jessd","password":"davispass"},
    {"name":"Matthew Taylor","username":"mattt","password":"taylor987"},
    {"name":"Jennifer Thomas","username":"jennifer.t","password":"thomas456"},
    {"name":"Daniel Jackson","username":"danielj","password":"djackson!"},
    {"name":"Linda White","username":"lindaw","password":"whitepass"},
    {"name":"Mark Harris","username":"markh","password":"harris567"},
    {"name":"Karen Lee","username":"karenl","password":"leekaren"},
    {"name":"Anthony Anderson","username":"anthonya","password":"anderson123"},
    {"name":"Ashley Scott","username":"ashleys","password":"scottashley"},
    {"name":"Paul Ramirez","username":"paulr","password":"ramirez99"},
    {"name":"Michelle Phillips","username":"michellep","password":"phillips22"},
    {"name":"William Evans","username":"williame","password":"evansw456"},
    {"name":"Amanda Parker","username":"amandap","password":"parkeramanda"}
  ];

const Users = () => {
  return (
    <div className=''>
        <UserHeader />
        <div className='flex my-20 mx-10 justify-between'>
            <h1 className='text-4xl font-bold uppercase text-secondary-foreground'>Usuários</h1>
            <Link className='flex bg-secondary-foreground p-4 rounded-xl text-white' href='/CreateUser'>Criar usuário<Plus className='h-4 w-4 mt-1 ml-2' /> </Link>
        </div>
        <div className='mx-10 mb-40'>
            <UsersTable data={mockData} columns={columns} />
        </div>
    </div>
  )
}

export default Users
