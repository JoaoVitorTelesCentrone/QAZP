'use client'

import { ChevronDown } from 'lucide-react'
import { Input } from 'antd'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { intl } from '@/i18n'
import { ClientProps } from '@/app/atoms/clientsAtom'

type ClientFieldsProps = {
  clients: ClientProps[]
  clientsLoading: boolean
  clientName: string
  clientDocument: string
  clientEmail: string
  clientNameError: string
  isClientTouched: boolean
  setIsClientTouched: (touched: boolean) => void
  setClientNameError: (error: string) => void
  clientDocumentError: string
  onSelectClient: (name: string, id: string, documentId: string, email: string) => void
  onClientDocumentChange: (value: string) => void
}

export default function ClientFields({
  clients,
  clientsLoading,
  clientName,
  clientDocument,
  clientEmail,
  clientNameError,
  isClientTouched,
  setIsClientTouched,
  setClientNameError,
  clientDocumentError,
  onSelectClient,
  onClientDocumentChange,
}: ClientFieldsProps) {
  return (
    <div className="flex flex-col">
      <div className="flex xl:w-full  space-y-4 ">
        <div className="flex flex-col xl:w-[30%] xl:mr-2 mt-4 relative">
          <h1 className="font-bold block mb-2">Cliente</h1>
          <DropdownMenu
            onOpenChange={open => {
              if (!open && !clientName) {
                setIsClientTouched(true)
                setClientNameError(
                  `${intl.formatMessage({ id: 'required.field.error.message' })}`,
                )
              }
            }}
          >
            <DropdownMenuTrigger
              className={`border border-gray-300 h-[40px] text-sm bg-white rounded-xl flex items-center justify-between px-4 ${clientNameError ? 'border-red-500' : 'border-gray-300'
                }`}
              onBlur={() => {
                if (!clientName) {
                  setIsClientTouched(true)
                  setClientNameError(
                    `${intl.formatMessage({ id: 'required.field.error.message' })}`,
                  )
                }
              }}
            >
              <span>{clientsLoading ? 'Carregando clientes...' : clientName || 'Cliente'}</span>
              <ChevronDown className="h-6 w-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl w-96 max-h-72 overflow-y-auto">
              {clients.map((client, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    onClick={() => {
                      onSelectClient(client.name, client.id, client.documentId, client.email)
                      setIsClientTouched(false)
                      setClientNameError('')
                    }}
                  >
                    {client.name}
                  </DropdownMenuItem>
                  <hr className="my-1 border-gray-300" />
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {clientNameError && isClientTouched && (
            <span
              className="text-red-500 text-sm font-bold absolute"
              style={{ top: '100%', marginTop: -15 }}
            >
              {clientNameError}
            </span>
          )}
        </div>
        <div className="relative flex flex-col xl:w-[30%] xl:mx-2 ">
          <label className="font-bold block mb-2">Documento</label>
          <Input
            value={clientDocument}
            onChange={e => onClientDocumentChange(e.target.value)}
            disabled={true}
            className={`p-2 mb-4 border rounded w-full h-[40px] ${clientDocumentError ? 'border-red-500' : 'border-slate-300'}`}
          />
          {clientDocumentError && (
            <div
              style={{
                color: 'red',
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: -15,
              }}
            >
              {clientDocumentError}
            </div>
          )}
        </div>
        <div className="flex flex-col xl:w-[30%] xl:mx-2 ">
          <label className="font-bold block mb-2">Email</label>
          <Input
            value={clientEmail}
            onChange={e => onClientDocumentChange(e.target.value)}
            disabled={true}
            className="bg-white text-gray-600 border border-gray-300  h-[40px] "
          />
        </div>
      </div>
    </div>
  )
}
