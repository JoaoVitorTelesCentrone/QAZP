'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'
import { Input } from 'antd'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { intl } from '@/i18n'
import { EventType } from '../constants/eventType'

type EventTypeAndTitleFieldsProps = {
  selectedType: string
  isTypeValid: boolean
  isTouched: boolean
  setIsTouched: (touched: boolean) => void
  onSelectEventType: (eventType: number, stringEventType: string) => void

  eventName: string
  onEventNameChange: (value: string) => void
  onEventNameBlur: () => void
  eventNameError: string
}

export default function EventTypeAndTitleFields({
  selectedType,
  isTypeValid,
  isTouched,
  setIsTouched,
  onSelectEventType,
  eventName,
  onEventNameChange,
  onEventNameBlur,
  eventNameError,
}: EventTypeAndTitleFieldsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex space-y-4 sm:space-y-0 sm:space-x-6 mr-7">
        <div className="flex flex-col xl:w-72 relative">
          <label className="font-bold block mb-2">Tipo</label>
          <DropdownMenu
            onOpenChange={open => {
              if (!open) {
                if (!isTypeValid) {
                  setIsTouched(true)
                }
              }
            }}
          >
            <DropdownMenuTrigger
              className={`flex border border-gray-300 h-[40px] bg-white items-center justify-between px-4 py-1 font-bold rounded-xl mr-6 ${!isTypeValid && isTouched
                  ? 'border-red-500'
                  : 'border-gray-300'
                }`}
              onBlur={() => setIsTouched(true)}
            >
              <h1
                className={`${!selectedType ? 'text-gray-400' : 'text-black'} mt-1`}
              >
                {selectedType ? selectedType : 'Selecione um Tipo'}
              </h1>
              <ChevronDown className="h-6 w-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl w-60 max-h-48 overflow-y-auto">
              {EventType.map((eventType, index) => (
                <React.Fragment key={index}>
                  <DropdownMenuItem
                    className="cursor-pointer my-1"
                    onClick={() => {
                      onSelectEventType(eventType.index, eventType.name)
                      setIsTouched(false)
                    }}
                  >
                    {eventType.name}
                  </DropdownMenuItem>
                  {index < EventType.length - 1 && (
                    <hr className="my-1 border-gray-300" />
                  )}
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {!isTypeValid && isTouched && (
            <span
              className="text-red-500 text-sm font-bold absolute"
              style={{ top: '100%', marginTop: -15 }}
            >
              {intl.formatMessage({
                id: 'required.field.error.message',
              })}
            </span>
          )}
        </div>
        <div className="flex flex-col xl:w-[300px] relative">
          <label className="font-bold block mb-2">Título</label>
          <Input
            value={eventName}
            onChange={e => onEventNameChange(e.target.value)}
            onBlur={onEventNameBlur}
            placeholder="Digite o Título do evento"
            className={`p-2 mb-4 bg-white text-gray-600 border rounded w-full border-gray-300 h-[40px] sm:w-[150px] md:w-[250px] lg:w-[500px] xl:w-[600px]  ${eventNameError ? 'border-red-500' : 'border-slate-300'}`}
            required
          />
          {eventNameError && (
            <div
              style={{
                color: 'red',
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: -15,
              }}
            >
              {eventNameError}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
