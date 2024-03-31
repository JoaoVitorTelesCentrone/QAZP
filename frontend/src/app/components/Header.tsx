import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className=' flex p-8 bg-custom-secondary justify-around'>
        <Link href='/' className='text-2xl text-custom-primary font-extrabold font-montserrat'>Zventos</Link>
        <ul className='flex justify-around'>
            <Link href='/sobre' className='mx-6 text-custom-primary font-montserrat font-medium'>Sobre</Link>
            <Link href='/showroom' className='mx-6 text-custom-primary font-montserrat font-medium'>Showroom</Link>
            <Link href='/orcamento' className='mx-6 text-custom-primary font-montserrat font-medium'>Solicite um orçamento</Link>
        </ul>
        <Link href='/login' className='text-custom-primary'>Login</Link>
    </div>
  )
}

export default Header