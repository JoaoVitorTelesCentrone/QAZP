import React from 'react'
import UserSideMenu from '../components/UserHeader'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Materials = () => {
  return (
    <div>
      <UserSideMenu />
      <div className="flex justify-between m-10">
        <h1 className='text-4xl font-bold'>Materiais</h1>
        <Link href='/CreateMaterial' className='text-white bg-primary p-3 rounded-xl'>Criar Material</Link>
      </div>
    </div>
  )
}

export default Materials
