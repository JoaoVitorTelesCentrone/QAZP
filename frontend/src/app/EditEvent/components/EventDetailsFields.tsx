'use client'

import { ChevronDown } from 'lucide-react'
import { Input } from 'antd'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ClientProps } from '@/app/atoms/clientsAtom'

type EventDetailsFieldsProps = {
  name: string
  onNameChange: (value: string) => void
  onNameBlur: () => void
  nameError: string
  clientName: string
  clients: ClientProps[]
  onSelectClient: (name: string, id: string) => void
}

export default function EventDetailsFields({
  name,
  onNameChange,
  onNameBlur,
  nameError,
  clientName,
  clients,
  onSelectClient,
}: EventDetailsFieldsProps) {
  return (
    <>
      <div className="relative">
        <h1 className="font-bold text-2xl mb-2">Título</h1>
        <Input
          value={name}
          onChange={e => onNameChange(e.target.value)}
          onBlur={onNameBlur}
          placeholder="Nome do Evento"
          className={`p-2 mb-4 bg-white text-gray-600 border  w-[800px] border-gray-300 h-[40px]   ${nameError ? 'border-red-500' : 'border-slate-300'}`}
          required
        />
        {nameError && (
          <div
            style={{
              color: 'red',
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: -15,
            }}
          >
            {nameError}
          </div>
        )}
      </div>
      <div>
        <h1 className="text-2xl my-3 font-bold">Cliente</h1>
        <div className="flex">
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger className="border border-gray-300 h-[40px] w-full sm:w-[300px] md:w-[400px] bg-white rounded-xl flex items-center justify-between px-4 font-bold">
                <span>{clientName || 'Selecione um Cliente'}</span>
                <ChevronDown className="h-6 w-6" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl w-full max-h-48 overflow-y-auto">
                {clients.length > 0 ? (
                  clients.map((client, index) => (
                    <div key={index}>
                      <DropdownMenuItem
                        onClick={() => onSelectClient(client.name, client.id)}
                      >
                        {client.name}
                      </DropdownMenuItem>
                      <hr className="my-1 border-gray-300" />
                    </div>
                  ))
                ) : (
                  <div className="p-4">Nenhum cliente disponível</div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  )
}
