import axios from 'axios'
import { Edit2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EventForm from './EventForm'

type EditEventProps = {
    eventId: string
}

type Mats = {
    materialId: string
    quantity: number
}

type EventDataProps = {
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

const EditEvent: React.FC<EditEventProps> = ({ eventId }) => {
    const [openModal, setOpenModal] = useState(false)
    const [eventData, setEventData] = useState<EventDataProps | undefined>(undefined)

    useEffect(() => {
        if (openModal && !eventData) {
            fetchEventData()
        }
    }, [openModal]) // Tiramos eventData da dependência para evitar loop infinito

    const fetchEventData = async () => {
        try {
            const response = await axios.get(`http://localhost:5196/api/Event/id/${eventId}`)
            setEventData(response.data)
        } catch (error) {
            console.error('Erro ao buscar evento:', error)
        }
    }

    return (
        <div>
            <Edit2Icon className="h-4 w-4 cursor-pointer" onClick={() => setOpenModal(true)} />
            {openModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <EventForm eventData={eventData} closeModal={() => setOpenModal(false)} />
                </div>
            )}
        </div>
    )
}

export default EditEvent
