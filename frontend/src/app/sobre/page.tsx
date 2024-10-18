import React from 'react'
import Header from '../components/Header'
import Image from 'next/image'
import centrone from '../../assets/centrone.png'
import Gustavo from '../../assets/Gustavo.png'
import Uendeus from '../../assets/Uendeus.png'
import Footer from '../components/Footer'
import { ArrowRight } from 'lucide-react'
import { FaArrowDown } from 'react-icons/fa'
import { intl } from '@/i18n'

const Page = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="bg-primary h-full">
        <h1 className="my-10 font-bold text-5xl mx-auto font-montserrat text-center text-cyan-500">
          {intl.formatMessage({
            id: 'showroom.page.about.us.title',
          })}
        </h1>
        <div className="justify-around flex xl:mx-20 mx-12 mt-2 mb-12">
          <div className="">
            <h1 className="mt-12  font-bold text-3xl font-montserrat text-center text-secondary ">
              {intl.formatMessage({
                id: 'showroom.page.about.us.uendell',
              })}
            </h1>
            <Image
              className="my-2 w-52 h-52 rounded-xl xl:h-72 xl:w-72"
              src={Uendeus}
              alt="a"
            />
          </div>
          <a href="https://github.com/JoaoVitorTelesCentrone">
            <div className="ml-4">
              <h1 className="mt-12 font-bold text-3xl font-montserrat text-center text-secondary">
                {intl.formatMessage({
                  id: 'showroom.page.about.us.joao',
                })}
              </h1>
              <Image
                className="my-2 ml-4 rounded-xl w-52 h-52 xl:h-72 xl:w-72"
                src={centrone}
                alt="a"
              />
            </div>
          </a>
          <div className="">
            <h1 className="mt-12 font-bold text-3xl font-montserrat text-center text-secondary ">
              {intl.formatMessage({
                id: 'showroom.page.about.us.gustavo',
              })}
            </h1>
            <Image
              className="my-2 rounded-xl w-52 h-52 xl:h-72 xl:w-72"
              src={Gustavo}
              alt="a"
            />
          </div>
        </div>
        <h1 className="my-10 font-bold text-5xl mx-auto font-montserrat text-center text-cyan-500">
          {intl.formatMessage({
            id: 'showroom.page.about.us.sub.title',
          })}
        </h1>
        <div className="flex my-10 bg-primary bg-opacity-90 mx-12 xl:mx-24 justify-between">
          <div className="max-w-[350px] xl:max-w-[600px]">
            <h1 className="mt-12 font-bold text-4xl xl:text-5xl font-montserrat uppercase text-center text-tertiary ">
              {intl.formatMessage({
                id: 'showroom.page.about.us.begin.title',
              })}
            </h1>
            <p className="mt-2 font-medium text-2xl font-montserrat text-secondary text-center">
              {intl.formatMessage({
                id: 'showroom.page.about.us.begin.sub.title',
              })}
            </p>
          </div>
          <ArrowRight className="text-white h-20 w-20 mt-32" />
          <div className="max-w-[350px] xl:max-w-[600px]">
            <h1 className="mt-12 font-bold text-4xl xl:text-5xl font-montserrat uppercase text-center text-tertiary">
              {intl.formatMessage({
                id: 'showroom.page.about.us.develpoment.title',
              })}
            </h1>
            <p className="mt-2 font-medium text-2xl font-montserrat text-secondary text-center">
              {intl.formatMessage({
                id: 'showroom.page.about.us.develpoment.sub.title',
              })}
            </p>
          </div>
        </div>
        <FaArrowDown className="flex mx-auto my-6 font-bold text-white w-24 h-24" />
        <div className="flex m-10">
          <div className="mx-14">
            <h1 className="mt-12 font-bold text-5xl font-montserrat uppercase text-center text-tertiary ">
              {intl.formatMessage({
                id: 'showroom.page.about.us.goals.title',
              })}
            </h1>
            <p className="mt-2 font-medium text-2xl font-montserrat text-secondary text-center mb-10">
              {intl.formatMessage({
                id: 'showroom.page.about.us.goals.sub.title',
              })}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Page
