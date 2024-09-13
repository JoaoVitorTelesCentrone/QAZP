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
  const [eventId, setEventId] = useState('')
  const [clients, setClients] = useAtom(clientsAtom)
  const [materials, setMaterials] = useState()

  const [eventAtom, setEventAtom] = useAtom(eventIdAtom)

  useEffect(() => {
    const fetchEventAndClient = async () => {
      try {
        if (eventAtom) {
          const eventResponse = await axios.get(
            `http://localhost:5196/api/Event/id/${eventAtom}`,
          )
          const event = eventResponse.data

          setName(event.name)
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

          if (event.clientId) {
            const clientResponse = await axios.get(
              `http://localhost:5196/api/Client/id/${event.clientId}`,
            )
            const client = clientResponse.data
            setClientId(client.id)
            setClientName(client.fullName)
          }

          if (event.id) {
            const materialsResponse = await axios.get(
              `http://localhost:5196/api/Client/id/${event.id}`,
            )
            const materials = materialsResponse.data
            setMaterials(event.id)
          }
        }
      } catch (error) {
        console.error('Error fetching event or client details:', error)
      }
    }

    fetchEventAndClient()
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
  }, [])

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
        <h1 className="text-3xl font-bold">Editar evento {name}</h1>
        <div className="my-4">
          <h1 className="font-bold text-2xl mb-2">Nome</h1>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nome do Evento"
          />

          <div>
            <h1 className="text-2xl my-3 font-bold">Cliente</h1>
            <div className="flex justify-ar">
              <h1 className="mr-10 font-bold">{clientName}</h1>
              <div className="">
                <h1 className="mb-2">Editar cliente</h1>
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
          </div>

          <h1 className="font-bold text-2xl mt-4">Data</h1>
          <div className="my-4 flex justify-between">
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

          <h1 className="font-bold text-2xl mt-10 mb-2">Endereço</h1>

          <div className="flex w-full flex-col md:flex-row">
            <div className="flex justify-around mb-6">
              <div className="flex flex-col flex-grow mr-4">
                <label className="font-bold block mb-2">CEP</label>
                <Input
                  value={zipCode}
                  onChange={e => setZipCode(e.target.value)}
                  placeholder="Digite o CEP"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[420px] md:w-[210px]"
                />
              </div>
              <div className="flex flex-col  mr-4">
                <label className="font-bold block mb-2">Endereço</label>
                <Input
                  value={addressName}
                  onChange={e => setAddressName(e.target.value)}
                  placeholder="Digite a Rua"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[420px] md:w-[340px]"
                />
              </div>
              <div className="flex flex-col mr-10">
                <label className="font-bold block mb-2">Número</label>
                <Input
                  value={addressNumber}
                  onChange={e => setAddressNumber(e.target.value)}
                  placeholder="Número"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-64 md:w-[100px]"
                />
              </div>
              <div className="flex flex-col ">
                <label className="font-bold block mb-2">Complemento</label>
                <Input
                  value={addressComplement}
                  onChange={e => setAddressComplement(e.target.value)}
                  placeholder="Digite o complemento"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[420px] md:w-[350px]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex flex-col flex-grow">
                <label className="font-bold block mb-2">Bairro</label>
                <Input
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  placeholder="Digite o bairro"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[420px] md:w-[315px]"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label className="font-bold block mb-2">Cidade</label>
                <Input
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="Digite a Cidade"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[420px] md:w-[315px]"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label className="font-bold block mb-2">Estado</label>
                <Input
                  value={state}
                  onChange={e => setState(e.target.value)}
                  placeholder="Digite o Estado"
                  className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[420px] md:w-[220px]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-6">
            <label className="font-bold mb-2 text-2xl ">Público estimado</label>
            <Input
              type="number"
              value={estimatedAudience}
              onChange={e => setEstimatedAudience(Number(e.target.value))}
              placeholder="Público estimado"
              className="bg-white text-gray-600 border border-gray-300 rounded-xl h-[50px] w-full sm:w-[300px] md:w-[420px] md:w-[150px]"
            />
          </div>

          <div>
            <h1 className="w-full p-4 mt-6 rounded-xl bg-cyan-900 text-white text-2xl font-bold text-center">
              Materiais
            </h1>

            <h1>materiais {materials}</h1>
          </div>

          <div className="flex mt-4">
            <button onClick={handleUpdate}>Atualizar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditEvent
