'use client'

import React, { useState } from 'react'
import Header from '../components/Header'
import { Input } from '../../components/ui/input'
import axios from 'axios'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { Button } from 'antd'
import { intl } from '@/i18n'

const Page = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [eventType, setType] = useState('')
  const [estimatedAudience, setAudience] = useState(0)

  async function handleSubmit() {
    const quote = {
      fullName,
      email,
      phoneNumber,
      eventType,
      estimatedAudience,
    }

    await axios
      .post('http://localhost:5196/api/Quote', quote, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        toast.success(
          `${intl.formatMessage({
            id: 'create.quote.success.message',
          })}`,
        )
      })
      .catch(error => {
        console.error('Erro:', error)
        toast.error(
          `${intl.formatMessage({
            id: 'create.quote.error.message',
          })}`,
        )
      })
  }
  return (
    <div>
      <Header />
      <Toaster richColors />
      <div className="p-20 bg-primary h-screen">
        <h1 className="text-6xl mx-auto font-montserrat font-bold uppercase text-center text-cyan-500 ">
          {intl.formatMessage({
            id: 'create.quote.page.title',
          })}
        </h1>
        <div className="my-10 bg-primary mx-auto   justify-between py-10 flex flex-col">
          <div className="shadow-black flex flex-col mx-10 py-4 rounded-xl">
            <div className="flex w-full justify-around">
              <div className="w-[30%]">
                <h1 className="text-white">
                  {intl.formatMessage({
                    id: 'create.quote.page.name.field',
                  })}
                </h1>
                <Input
                  className="my-2 bg-white border-slate-400"
                  onChange={e => setFullName(e.target.value)}
                  placeholder={intl.formatMessage({
                    id: 'create.quote.page.name.placeholder',
                  })}
                />
              </div>
              <div className="w-[30%]">
                <h1 className="text-white">
                  {intl.formatMessage({
                    id: 'create.quote.page.email.field',
                  })}
                </h1>
                <Input
                  className="my-2 bg-white px-2 border-slate-400"
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                  placeholder={intl.formatMessage({
                    id: 'create.quote.page.email.placeholder',
                  })}
                />
              </div>

              <div className="w-[30%]">
                <h1 className="text-white">
                  {intl.formatMessage({
                    id: 'create.quote.page.phone.field',
                  })}
                </h1>
                <Input
                  className="my-2 bg-white border-slate-400"
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder={intl.formatMessage({
                    id: 'create.quote.page.phone.placeholder',
                  })}
                />
              </div>
            </div>
          </div>

          <div className="py-4 mx-10  border-2shadow-slate-400 rounded-xl flex flex-col">
            <div className="flex w-full justify-center">
              <div className="w-[50%] mx-20">
                <h1 className="text-white">
                  {intl.formatMessage({
                    id: 'create.quote.page.estimated.audience.field',
                  })}
                </h1>
                <Input
                  className="my-2 bg-white border-slate-400 text-slate-400"
                  type="number"
                  onChange={e => setAudience(parseInt(e.target.value))}
                  placeholder={intl.formatMessage({
                    id: 'create.quote.page.estimated.audience.placeholder',
                  })}
                />
              </div>
              <div className="w-[50%] mx-20">
                <h1 className="text-white">
                  {intl.formatMessage({
                    id: 'create.quote.page.event.type.field',
                  })}
                </h1>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border-slate-400 my-2 bg-white flex h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 justify-between focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                    {eventType
                      ? eventType
                      : `${intl.formatMessage({
                        id: 'create.quote.page.event.type.placeholder',
                      })}`}{' '}
                    <ChevronDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white mb-24 ml-96 w-96">
                    <DropdownMenuItem
                      onClick={() =>
                        setType(
                          `${intl.formatMessage({
                            id: 'event.type.wedding',
                          })}`,
                        )
                      }
                    >
                      {intl.formatMessage({
                        id: 'event.type.wedding',
                      })}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setType(
                          `${intl.formatMessage({
                            id: 'event.type.tradeShow',
                          })}`,
                        )
                      }
                    >
                      {intl.formatMessage({
                        id: 'event.type.tradeShow',
                      })}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setType(
                          `${intl.formatMessage({
                            id: 'event.type.party',
                          })}`,
                        )
                      }
                    >
                      {intl.formatMessage({
                        id: 'event.type.party',
                      })}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setType(
                          `${intl.formatMessage({
                            id: 'event.type.festival',
                          })}`,
                        )
                      }
                    >
                      {intl.formatMessage({
                        id: 'event.type.festival',
                      })}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setType(
                          `${intl.formatMessage({
                            id: 'event.type.workshop',
                          })}`,
                        )
                      }
                    >
                      {intl.formatMessage({
                        id: 'event.type.workshop',
                      })}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setType(
                          `${intl.formatMessage({
                            id: 'event.type.exhibition',
                          })}`,
                        )
                      }
                    >
                      {intl.formatMessage({
                        id: 'event.type.exhibition',
                      })}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setType(
                          `${intl.formatMessage({
                            id: 'event.type.launch',
                          })}`,
                        )
                      }
                    >
                      {intl.formatMessage({
                        id: 'event.type.launch',
                      })}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setType(
                          `${intl.formatMessage({
                            id: 'event.type.championship',
                          })}`,
                        )
                      }
                    >
                      {intl.formatMessage({
                        id: 'event.type.championship',
                      })}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setType(
                          `${intl.formatMessage({
                            id: 'event.type.convention',
                          })}`,
                        )
                      }
                    >
                      {intl.formatMessage({
                        id: 'event.type.convention',
                      })}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setType(
                          `${intl.formatMessage({
                            id: 'event.type.ball',
                          })}`,
                        )
                      }
                    >
                      {intl.formatMessage({
                        id: 'event.type.ball',
                      })}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setType(
                          `${intl.formatMessage({
                            id: 'event.type.seminar',
                          })}`,
                        )
                      }
                    >
                      {intl.formatMessage({
                        id: 'event.type.seminar',
                      })}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setType(
                          `${intl.formatMessage({
                            id: 'event.type.meeting',
                          })}`,
                        )
                      }
                    >
                      {intl.formatMessage({
                        id: 'event.type.meeting',
                      })}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setType(
                          `${intl.formatMessage({
                            id: 'event.type.campaign',
                          })}`,
                        )
                      }
                    >
                      {intl.formatMessage({
                        id: 'event.type.campaign',
                      })}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setType(
                          `${intl.formatMessage({
                            id: 'event.type.ceremony',
                          })}`,
                        )
                      }
                    >
                      {intl.formatMessage({
                        id: 'event.type.ceremony',
                      })}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setType(
                          `${intl.formatMessage({
                            id: 'event.type.symposium',
                          })}`,
                        )
                      }
                    >
                      {intl.formatMessage({
                        id: 'event.type.symposium',
                      })}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
        <div className="my-10 text-center justify-center flex">
          <Button
            onClick={handleSubmit}
            className="bg-primary border-[0.5px] border-white text-tertiary p-4 rounded-xl font-bold uppercase mx-10 shadow-lg"
          >
            {intl.formatMessage({
              id: 'request.quote.button',
            })}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
