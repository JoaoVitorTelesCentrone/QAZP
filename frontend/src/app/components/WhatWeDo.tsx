import { intl } from '@/i18n'
import React from 'react'
import { FaArrowDown } from 'react-icons/fa'

const WhatWeDo = () => {
  return (
    <div className="px-20 pt-24 pb-10  flex justify-between bg-primary">
      <div className="flex flex-col text-center space-y-8">
        <h1 className="mx-auto text-cyan-500 text-7xl font-bold font-montserrat my-4">
          {intl.formatMessage({
            id: 'showroom.page.what.we.do.title',
          })}
        </h1>
        <p className="mx-auto max-w-[800px] text-secondary text-md font-light text-center font-montserrat mt-10 text-xl">
          {intl.formatMessage({
            id: 'showroom.page.what.we.do.subtitle',
          })}
        </p>
      </div>
      <div className="flex mx-auto">
        <div className="mx-14">
          <div className="mb-2 border-2 bg-white text-primary p-2 rounded-xl">
            <h1 className="font-montserrat font-extrabold text-3xl uppercase text-center">
              {intl.formatMessage({
                id: 'showroom.page.our.mission.title',
              })}
            </h1>
            <p className="font-montserrat my-2 text-center">
              {intl.formatMessage({
                id: 'showroom.page.our.mission.subtitle',
              })}
            </p>
          </div>
          <FaArrowDown className="mx-auto mb-2 text-white w-12 h-12" />

          <div className="bg-secondary rounded-xl p-3 mb-2">
            <h1 className="font-montserrat font-extrabold text-3xl uppercase text-center">
              {intl.formatMessage({
                id: 'showroom.page.how.we.work.title',
              })}
            </h1>
            <p className="font-montserrat  my-2 text-primary text-center">
              {intl.formatMessage({
                id: 'showroom.page.how.we.work.description',
              })}
            </p>
          </div>
          <FaArrowDown className="mx-auto mb-2 text-white w-12 h-12" />
          <div className="bg-secondary rounded-xl p-3 mb-2">
            <h1 className="font-montserrat font-extrabold text-3xl uppercase text-center">
              {intl.formatMessage({
                id: 'showroom.page.results.title',
              })}
            </h1>
            <p className="font-montserrat  my-2 text-primary text-center">
              {intl.formatMessage({
                id: 'showroom.page.results.description',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatWeDo