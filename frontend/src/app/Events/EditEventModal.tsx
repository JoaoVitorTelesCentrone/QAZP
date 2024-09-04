import React, { useEffect, useState } from 'react'
import { Modal, Input } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import axios from 'axios'

type EditEventModalProps = {
  visible: boolean
  onClose: () => void
  eventId: string
  onUpdate: () => void
}

const EditEventModal: React.FC<EditEventModalProps> = ({
  visible,
  onClose,
  eventId,
  onUpdate,
}) => {
  const [name, setName] = useState('')
  const [startAt, setStartAt] = useState<Dayjs | null>(null)
  const [endAt, setEndAt] = useState<Dayjs | null>(null)
  const [zipCode, setZipCode] = useState('')
  const [addressName, setAddressName] = useState('')
  const [addressNumber, setAddressNumber] = useState('')
  const [addressComplement, setAddressComplement] = useState('')
  const [district, setDistrict] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [estimatedAudience, setEstimatedAudience] = useState(0)

  useEffect(() => {
    if (visible) {
      axios
        .get(`http://localhost:5196/api/Event/id/${eventId}`)
        .then(response => {
          const event = response.data
          setName(event.name)
          setStartAt(event.startDate ? dayjs(event.startDate) : null)
          setEndAt(event.endAt ? dayjs(event.endAt) : null)
          setZipCode(event.zipCode || '')
          setAddressName(event.addressName || '')
          setAddressNumber(event.addressNumber || '')
          setAddressComplement(event.addressComplement || '')
          setDistrict(event.district || '')
          setState(event.state || '')
          setCity(event.city || '')
          setEstimatedAudience(event.estimatedAudience || 0)
          console.log(response.data)
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
        startAt: startAt ? startAt.format('YYYY-MM-DD HH:mm') : '',
        endAt: endAt ? endAt.format('YYYY-MM-DD HH:mm') : '',
        zipCode,
        addressName,
        addressNumber,
        addressComplement,
        district,
        state,
        city,
        estimatedAudience,
      }
      await axios.patch(`http://localhost:5196/api/Event/${eventId}`, body)
      onUpdate()
      onClose()
    } catch (error) {
      console.error('Error updating event:', error)
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
        <div className="my-2">
          <h1>
            {startAt ? startAt.format('YYYY-MM-DD HH:mm') : 'No start date set'}
          </h1>
          <h1>
            {endAt ? endAt.format('YYYY-MM-DD HH:mm') : 'No end date set'}
          </h1>
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
