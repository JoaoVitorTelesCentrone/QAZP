'use client'
import { Input, Button, DatePicker, TimePicker } from 'antd'
import { X } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import dayjs, { Dayjs } from 'dayjs'
import { MaterialType } from '../CreateEvent/utils'
import { Table } from 'antd'
import { LucideTrash2 } from 'lucide-react'
import { eventTypeNameConverter } from '@/functions/functions'

interface EventFormProps {
    eventData?: EventDataProps
    closeModal: () => void
}

interface EventDataProps {
    id: string
    name: string
    type: number
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    estimatedAudience: string
    clientId: string
    clientName: string
    totalAmount: string
    city: string
    state: string
    district: string
    zipcode: string
    addressName: string
    addressNumber: string
    addressComplement: string
}

const EventForm: React.FC<EventFormProps> = ({ eventData, closeModal }) => {
    const [name, setName] = useState(eventData?.name || '')
    const [type, setType] = useState(eventData?.type || '')
    const [clientName, setClientName] = useState('')
    const [clientId, setClientId] = useState('')
    const [startDate, setStartDate] = useState<Dayjs | null>(
        eventData ? dayjs(eventData.startDate) : null
    )

    const [endDate, setEndDate] = useState<Dayjs | null>(
        eventData ? dayjs(eventData.endDate) : null
    )
    const [startTime, setStartTime] = useState<Dayjs | null>(
        eventData ? dayjs(eventData.startTime, 'HH:mm:ss') : null
    )
    const [endTime, setEndTime] = useState<Dayjs | null>(
        eventData ? dayjs(eventData.endTime, 'HH:mm:ss') : null
    )
    const [estimatedAudience, setEstimatedAudience] = useState(eventData?.estimatedAudience || '')
    const [totalAmount, setTotalAmount] = useState(eventData?.totalAmount || '')

    const handleSave = async () => {
        if (!name || !startDate || !endDate) {
            toast.error('Preencha os campos obrigatórios.')
            return
        }

        const payload = {
            name,
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
            startTime: startTime?.format('HH:mm:ss') || '',
            endTime: endTime?.format('HH:mm:ss') || '',
            estimatedAudience,
            totalAmount
        }

        try {
            if (eventData?.id) {
                await axios.put(`http://localhost:5196/api/Event/${eventData.id}`, payload)
                toast.success('Evento atualizado com sucesso!')
            } else {
                await axios.post('http://localhost:5196/api/Event', payload)
                toast.success('Evento criado com sucesso!')
            }
            closeModal()
        } catch (error) {
            console.error('Erro ao salvar evento:', error)
            toast.error('Erro ao salvar evento.')
        }
    }

    useEffect(() => {
        if (eventData) {
            setName(eventData.name || '')
            setType(eventTypeNameConverter(eventData.type) || '')
            setClientId(eventData.clientId || '')
            setStartDate(eventData.startDate ? dayjs(eventData.startDate) : null)
            setEndDate(eventData.endDate ? dayjs(eventData.endDate) : null)
            setStartTime(eventData.startTime ? dayjs(eventData.startTime, 'HH:mm:ss') : null)
            setEndTime(eventData.endTime ? dayjs(eventData.endTime, 'HH:mm:ss') : null)
            setEstimatedAudience(eventData.estimatedAudience || '')
            setTotalAmount(eventData.totalAmount || '')


        }

    }, [eventData])

    const [materials, setMaterials] = useState<MaterialType[]>([])

    useEffect(() => {
        if (eventData?.id) {
            fetchMaterials(eventData.id)
        }
    }, [eventData])

    const fetchMaterials = async (eventId: string) => {
        try {
            const response = await axios.get(
                `http://localhost:5196/api/EventMaterial/eventId/${eventId}`
            )
            setMaterials(response.data)
        } catch (error) {
            console.error('Erro ao buscar materiais:', error)
        }

        const MaterialColumns = [
            {
                title: 'Nome',
                dataIndex: 'materialName',
                key: 'materialName',
            },
            {
                title: 'Quantidade',
                dataIndex: 'quantity',
                key: 'quantity',
            },
            {
                title: 'Preço',
                dataIndex: 'materialPrice',
                key: 'materialPrice',
            },
            {
                title: 'Ações',
                key: 'action',
                render: (_: any, record: any, index: number) => (
                    <LucideTrash2
                        onClick={() => removeMaterial(index)}
                        className="h-5 w-5 text-red-500 cursor-pointer"
                    />
                ),
            },
        ]
        const removeMaterial = (index: number) => {
            setMaterials(prev => prev.filter((_, i) => i !== index))
        }
        const clientResponse = await axios.get(
            `http://localhost:5196/api/Client/id/${eventData?.clientId}`,
        )
        setClientName(clientResponse.data.fullName)

        return (
            <div className="mt-6">
                <h2 className="text-lg font-bold mb-4">Materiais do Evento</h2>
                <Table dataSource={materials} columns={MaterialColumns} pagination={false} rowKey="materialId" />
            </div>
        )
    }

    return (
        <div className="mt-1 mb-2 flex-col flex border-2 rounded-xl border-secondary-foreground shadow-lg shadow-slate-500 border-slate-200 bg-white p-10 max-w-[700px]">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-6">{eventData ? 'Editar Evento' : 'Criar Evento'}</h1>
                <X className="cursor-pointer" onClick={closeModal} />
            </div>
            <div className="space-y-5">
                <div className="flex w-full mb-4">
                    <div className="w-[38%] mr-2 relative">
                        <h1 className="font-bold mr-24">
                            Nome
                        </h1>
                        <Input className="p-2 mb-4 border rounded w-full " placeholder="Nome do Evento" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="w-[38%] mr-2 relative">
                        <h1 className="font-bold mr-24">
                            Tipo
                        </h1>
                        <Input className="p-2 mb-4 border rounded w-full " placeholder="Tipo do Evento" value={type} onChange={e => setType(e.target.value)} />
                    </div>
                    <div className="w-[15%] mr-2 relative">
                        <h1 className="font-bold mr-24">
                            Público
                        </h1>
                        <Input className="p-2 mb-1 border rounded w-full " placeholder="Público estimado" value={estimatedAudience} onChange={e => setEstimatedAudience(e.target.value)} />
                    </div>
                </div>
                <div className="flex w-full mb-4">
                    <div className="w-[38%] mr-2 relative">
                        <h1 className="font-bold mr-24">
                            Cliente
                        </h1>
                        <Input className="p-2 mb-4 border rounded w-full " placeholder="Nome do Cliente" value={clientName} onChange={e => setName(e.target.value)} />
                    </div>
                </div>
                <DatePicker value={startDate} onChange={setStartDate} placeholder="Data de Início" className="w-full" />
                <DatePicker value={endDate} onChange={setEndDate} placeholder="Data de Fim" className="w-full" />
                <TimePicker value={startTime} onChange={setStartTime} placeholder="Hora de Início" className="w-full" />
                <TimePicker value={endTime} onChange={setEndTime} placeholder="Hora de Fim" className="w-full" />
                <Input placeholder="Valor Total (R$)" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} />
            </div>
            <div className="flex justify-between mt-4">
                <Button onClick={closeModal}>Cancelar</Button>
                <Button type="primary" onClick={handleSave}>
                    {eventData ? 'Atualizar' : 'Criar'}
                </Button>
            </div>
        </div>
    )
}

export default EventForm
