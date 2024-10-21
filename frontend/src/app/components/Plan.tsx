import { intl } from '@/i18n'
import React from 'react'
import { FaCalendarCheck, FaRunning } from 'react-icons/fa'
import { MdDesignServices } from 'react-icons/md'

const Plan = () => {
  return (
    <div className="flex xl:py-24 py-10  justify-around bg-primary bg-opacity-90 w-full">
      <div className="mx-4 justify-around">
        <h1 className="flex font-montserrat font-bold text-3xl text-tertiary uppercase">
          {intl.formatMessage({
            id: 'showroom.page.design.title',
          })} <MdDesignServices className="mt-1 mx-6" />
        </h1>
        <p className="font-montserrat max-w-[350px] my-4 text-secondary">
          {intl.formatMessage({
            id: 'showroom.page.design.subtitle',
          })}
        </p>
      </div>
      <div className="mr-4 xl:mr-0">
        <h1 className="font-montserrat flex font-bold text-3xl text-tertiary uppercase">
          {intl.formatMessage({
            id: 'showroom.page.plan.title',
          })} <FaCalendarCheck className="mt-1 xl:mx-6 mx-2" />
        </h1>
        <p className="font-montserrat max-w-[350px] my-4 text-secondary">
          {intl.formatMessage({
            id: 'showroom.page.plan.subtitle',
          })}
        </p>
      </div>
      <div>
        <h1 className="font-montserrat flex font-bold text-3xl text-tertiary uppercase">
          {intl.formatMessage({
            id: 'showroom.page.execution.title',
          })} <FaRunning className="mt-1 mx-6 " />
        </h1>
        <p className="font-montserrat max-w-[350px] my-4 text-secondary">
          {intl.formatMessage({
            id: 'showroom.page.execution.subtitle',
          })}
        </p>
      </div>
    </div>
  )
}

export default Plan