import { Button } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import foto from '../../assets/foto-1.png'
import React from 'react'
import { intl } from '@/i18n'

const Call = () => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col xl:py-20 py-24 xl:w-[65%] w-[50%] px-12 bg-primary">
        <h1 className="font-montserrat xl:text-8xl text-7xl max-w-[1200px] text-center text-secondary mx-auto font-bold">
          {intl.formatMessage({
            id: 'showroom.page.title',
          })}
        </h1>
        <p className="max-w-[800px] text-center py-6 font-montserrat text-2xl text-secondary mx-auto font-medium">
          {intl.formatMessage({
            id: 'showroom.page.subtitle',
          })}
        </p>
        <Link href="/orcamento" className="mx-auto">
          <Button>{intl.formatMessage({
            id: 'showroom.page.request-quote-button-label',
          })}</Button>
        </Link>
      </div>
      <div className="bg-primary xl:w-[35%] w-[50%]">
        <Image className="xl:mt-10 mt-24" alt="foto" src={foto} />
      </div>
    </div>
  )
}

export default Call