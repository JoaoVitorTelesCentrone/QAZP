import React, { useEffect, useState } from 'react'
import { Modal, Input, DatePicker, TimePicker, message } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import axios from 'axios'
import { useAtom } from 'jotai'
import { eventChangeAtom } from '../atoms/eventChangeAtom'

type EditEventModalProps = {
  visible: boolean
  onClose: () => void
  eventId: string
  onUpdate: () => void
}

type material = { materialId: string; quantity: string }
const EditEventModal: React.FC<EditEventModalProps> = ({
  visible,
  onClose,
  eventId,
  onUpdate,
}) => {
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
  const [clientId, setClientID] = useState('')
  const [materiais, setMateriais] = useState<material>()
  const [eventChange, setEventChange] = useAtom(eventChangeAtom)

  const getMaterials = async (eventId: string) => {
    if (eventId) {
      try {
        axios
          .get('http://localhost:5196/api/Event/id/', {
            params: { eventId: eventId },
          })
          .then(response => {
            const material = response.data
            setMateriais({
              materialId: material.materialId,
              quantity: material.quantity,
            })
          })
      } catch {
        message.error('Nao deu pra trazer os materiais')
      }
    }
  }

  useEffect(() => {
    if (visible) {
      axios
        .get(`http://localhost:5196/api/Event/id/${eventId}`)
        .then(response => {
          const event = response.data
          setName(event.name)
          setClientID(event.clientId)
          setStartDate(event.startDate ? dayjs(event.startDate) : null)
          setEndDate(event.endDate ? dayjs(event.endDate) : null)
          setStartTime(
            event.startTime ? dayjs(event.startTime, 'HH:mm:ss') : null,
          )
          setEndTime(event.endTime ? dayjs(event.endTime, 'HH:mm:ss') : null) // Add format for time
          setZipCode(event.zipCode || '')
          setAddressName(event.addressName || '')
          setAddressNumber(event.addressNumber || '')
          setAddressComplement(event.addressComplement || '')
          setDistrict(event.district || '')
          setState(event.state || '')
          setCity(event.city || '')
          setEstimatedAudience(event.estimatedAudience || 0)
        })
        .catch(error => {
          console.error('Error fetching event details:', error)
        })
    }
  }, [visible, eventId])

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
      onUpdate()
      onClose()
      message.success('Deu bom')
      setEventChange(prev => prev + 1)
    } catch (error) {
      console.error('Error updating event:', error)
      message.error('Deu ruim')
    }
  }

  return (
    <Modal
      title={`Editar evento do ${name}`}
      visible={visible}
      onCancel={onClose}
      onOk={handleUpdate}
      okText="Update"
      cancelText="Cancel"
    >
      <div className="my-4">
        <h1 className="font-bold">Nome</h1>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Event Name"
        />
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
              placeholder="Zip Code"
            />
          </div>
          <div>
            <h1>Rua</h1>
            <Input
              value={addressName}
              onChange={e => setAddressName(e.target.value)}
              placeholder="Address Name"
            />
          </div>
          <div>
            <h1>Número</h1>
            <Input
              value={addressNumber}
              onChange={e => setAddressNumber(e.target.value)}
              placeholder="Address Number"
            />
          </div>
          <div>
            <h1>Complemento</h1>
            <Input
              value={addressComplement}
              onChange={e => setAddressComplement(e.target.value)}
              placeholder="Address Complement"
            />
          </div>
        </div>

        <div className="flex my-4">
          <div>
            <h1>Bairro</h1>
            <Input
              value={district}
              onChange={e => setDistrict(e.target.value)}
              placeholder="District"
            />
          </div>
          <div>
            <h1>Estado</h1>
            <Input
              value={state}
              onChange={e => setState(e.target.value)}
              placeholder="State"
            />
          </div>
          <div>
            <h1>Cidade</h1>
            <Input
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="City"
            />
          </div>
        </div>
        <h1 className="font-bold mt-4">Audiência Estimada</h1>
        <Input
          value={estimatedAudience}
          onChange={e => setEstimatedAudience(Number(e.target.value))}
          type="number"
          placeholder="Estimated Audience"
        />
      </div>
    </Modal>
  )
}

export default EditEventModal
