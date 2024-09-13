// components/EditEvent.tsx
'use client'
import React, { useEffect, useState } from 'react'
import { ChevronDown, Edit2Icon } from 'lucide-react'
import dayjs, { Dayjs } from 'dayjs'
import axios from 'axios'
import { DatePicker, Input, message, TimePicker } from 'antd'
import { useRouter } from 'next/router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserSideMenu from '@/app/components/UserHeader'
import { useAtom } from 'jotai'
import { clientsAtom } from '@/app/CreateEvent/page'
import { documentIdConverter } from '@/functions/functions'
import { eventIdAtom } from '../atoms/EventIdAtom'

type EditEventProps = {
  eventId: string
}

const EditEvent: React.FC<EditEventProps> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState<Dayjs | null>(null)

  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [startTime, setStartTime] = useState<Dayjs | null>(null)
  const [endTime, setEndTime] = useState<Dayjs | null>(null)
  const [zipCode, setZipCode] = useState('')
  const [addressName, setAddressName] = useState('')
  const [addressNumber, setAddressNumber] = useState('')
  const [addressComplement, setAddressComplement] = useState('')
  const [district, setDistrict] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [estimatedAudience, setEstimatedAudience] = useState(0)
  const [clientId, setClientId] = useState('')
  const [clientName, setClientName] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [clients, setClients] = useAtom(clientsAtom)

  const [eventAtom, setEventId] = useAtom(eventIdAtom)

  useEffect(() => {
    if (eventAtom) {
      axios
        .get(`http://localhost:5196/api/Event/id/${eventAtom}`)
        .then(response => {
          const event = response.data
          setName(event.name)
          console.log(name)
          setClientId(event.clientId)
          setStartDate(event.startDate ? dayjs(event.startDate) : null)
          setEndDate(event.endDate ? dayjs(event.endDate) : null)
          setStartTime(
            event.startTime ? dayjs(event.startTime, 'HH:mm:ss') : null,
          )
          setEndTime(event.endTime ? dayjs(event.endTime, 'HH:mm:ss') : null)
          setZipCode(event.zipCode || '')
          setAddressName(event.addressName || '')
          setAddressNumber(event.addressNumber || '')
          setAddressComplement(event.addressComplement || '')
          setDistrict(event.district || '')
          setState(event.state || '')
          setCity(event.city || '')
          setEstimatedAudience(event.estimatedAudience || 0)
          setTotalAmount(event.totalAmount)
        })
        .catch(error => {
          console.error('Error fetching event details:', error)
        })
    }
  }, [eventAtom])

  const getClients = async () => {
    try {
      const response = await axios.get('http://localhost:5196/api/Client')
      const clientNames = response.data.map((client: any) => ({
        name: client.fullName,
        documentId: documentIdConverter(client.documentId),
        id: client.id,
        email: client.email,
      }))
      setClients(clientNames)
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }

  useEffect(() => {
    getClients()
    console.log(clientId)
    getClientFromTheEvent(clientId)
  }, [])

  const getClientFromTheEvent = async (clientId: string) => {
    if (clientId) {
      axios
        .get(`http://localhost:5196/api/Client/id/${clientId}`)
        .then(response => {
          const client = response.data
          setClientId(client.clientId)
          setClientName(client.fullname)
        })
        .catch(error => {
          console.error('Error fetching event details:', error)
        })
    }
  }
  const getMaterialsFromTheEvent = async (eventId: string) => {}

  const getClientValues = (name: string, id: string) => {
    setClientId(id)
    setClientName(name)
  }

  const handleUpdate = async () => {
    try {
      const body = {
        name,
        clientId,
        type: 0,
        status: 0,
        startDate: startDate ? startDate.format('YYYY-MM-DD') : '',
        endDate: endDate ? endDate.format('YYYY-MM-DD') : '',
        startTime: startTime ? startTime.format('HH:mm:ss') : '',
        endTime: endTime ? endTime.format('HH:mm:ss') : '',
        zipCode,
        addressName,
        addressNumber,
        addressComplement,
        district,
        state,
        city,
        estimatedAudience,
      }
      await axios.put(`http://localhost:5196/api/Event/${eventId}`, body)
      message.success('Atualização feita com sucesso')
    } catch (error) {
      console.error('Error updating event:', error)
      message.error('Erro ao atualizar evento')
    }
  }

  return (
    <div>
      <UserSideMenu />
      <div className="ml-56 mr-10 my-10">
        <h1>Editar evento do {name}</h1>
        <div className="my-4">
          <h1 className="font-bold">Nome</h1>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nome do Evento"
          />

          <div>
            <h1>Cliente</h1>
            <h1>{clientName}</h1>
            <div className="flex">
              <DropdownMenu>
                <DropdownMenuTrigger className="border border-gray-300 h-[50px] w-full sm:w-[300px] md:w-[400px] bg-white rounded-xl flex items-center justify-between px-4 font-bold">
                  <span>{clientName || 'Selecione um Cliente'}</span>
                  <ChevronDown className="h-6 w-6" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white border border-gray-300 rounded-xl w-full max-h-48 overflow-y-auto">
                  {clients.length > 0 ? (
                    clients.map((client, index) => (
                      <div key={index}>
                        <DropdownMenuItem
                          onClick={() =>
                            getClientValues(client.name, client.id)
                          }
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

          <h1 className="font-bold mt-4">Data</h1>
          <div className="my-2 flex justify-between">
            <DatePicker
              value={startDate}
              onChange={date => setStartDate(date)}
              format="YYYY/MM/DD"
            />
            <DatePicker
              value={endDate}
              onChange={date => setEndDate(date)}
              format="YYYY/MM/DD"
            />
          </div>

          <div className="my-2 flex justify-between">
            <TimePicker
              value={startTime}
              onChange={time => setStartTime(time)}
              format="HH:mm:ss"
            />
            <TimePicker
              value={endTime}
              onChange={time => setEndTime(time)}
              format="HH:mm:ss"
            />
          </div>

          <h1 className="font-bold mt-4">Endereço</h1>
          <div className="flex">
            <div>
              <h1>CEP</h1>
              <Input
                value={zipCode}
                onChange={e => setZipCode(e.target.value)}
                placeholder="CEP"
              />
            </div>
            <div>
              <h1>Rua</h1>
              <Input
                value={addressName}
                onChange={e => setAddressName(e.target.value)}
                placeholder="Nome da Rua"
              />
            </div>
            <div>
              <h1>Número</h1>
              <Input
                value={addressNumber}
                onChange={e => setAddressNumber(e.target.value)}
                placeholder="Número"
              />
            </div>
          </div>
          {/* Other form fields */}

          <div className="flex mt-4">
            <button onClick={handleUpdate}>Atualizar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditEvent
