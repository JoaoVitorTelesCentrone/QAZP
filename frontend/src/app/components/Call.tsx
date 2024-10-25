import { Button } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import foto from '../../assets/event.png'
import React from 'react'
import { intl } from '@/i18n'

const Call = () => {
  return (
    <div className="bg-primary flex justify-between w-full">
      <div className="flex flex-col xl:py-12 py-24 xl:w-[65%] w-[50%] px-12 bg-primary">
        <h1 className="font-montserrat xl:text-8xl text-7xl max-w-[1200px] text-center text-secondary mx-auto font-bold">
          {intl.formatMessage({
            id: 'showroom.page.title',
          })}
        </h1>
        <p className="max-w-[900px] text-center py-6 font-montserrat text-2xl text-secondary mx-auto font-medium">
          {intl.formatMessage({
            id: 'showroom.page.subtitle',
          })}
        </p>
        <Link href="/orcamento" className="mx-auto">
        <Button type="primary" ghost shape="round" size="large">{intl.formatMessage({
            id: 'showroom.page.request-quote-button-label',
          })}</Button>
        </Link>
      </div>
      <div className="bg-primary mr-10 ml-10 mt-10 m-10 xl:w-[25%]">
        <Image alt="foto" src={foto} />
      </div>
    </div>
  )
}

export default Call