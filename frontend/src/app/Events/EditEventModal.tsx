// components/EditEventModal.tsx
import React, { useEffect, useState } from 'react'
import { Modal, Input, DatePicker, TimePicker } from 'antd'
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
      // Fetch event details when the modal is visible
      axios
        .get(`http://localhost:5196/api/Event/${eventId}`)
        .then(response => {
          const event = response.data
          setName(event.name)
          setStartAt(event.startAt ? dayjs(event.startAt) : null)
          setEndAt(event.endAt ? dayjs(event.endAt) : null)
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
  }, [])

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
      title="Edit Event"
      visible={visible}
      onCancel={onClose}
      onOk={handleUpdate}
      okText="Update"
      cancelText="Cancel"
    >
      <div>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Event Name"
        />
        <DatePicker
          value={startAt}
          onChange={date => setStartAt(date ?? null)}
          format="YYYY-MM-DD"
          placeholder="Start Date"
        />
        <TimePicker
          value={startAt}
          onChange={time =>
            setStartAt(
              time
                ? dayjs(startAt).hour(time.hour()).minute(time.minute())
                : null,
            )
          }
          format="HH:mm"
          placeholder="Start Time"
        />
        <DatePicker
          value={endAt}
          onChange={date => setEndAt(date ?? null)}
          format="YYYY-MM-DD"
          placeholder="End Date"
        />
        <TimePicker
          value={endAt}
          onChange={time =>
            setEndAt(
              time
                ? dayjs(endAt).hour(time.hour()).minute(time.minute())
                : null,
            )
          }
          format="HH:mm"
          placeholder="End Time"
        />
        <Input
          value={zipCode}
          onChange={e => setZipCode(e.target.value)}
          placeholder="Zip Code"
        />
        <Input
          value={addressName}
          onChange={e => setAddressName(e.target.value)}
          placeholder="Address Name"
        />
        <Input
          value={addressNumber}
          onChange={e => setAddressNumber(e.target.value)}
          placeholder="Address Number"
        />
        <Input
          value={addressComplement}
          onChange={e => setAddressComplement(e.target.value)}
          placeholder="Address Complement"
        />
        <Input
          value={district}
          onChange={e => setDistrict(e.target.value)}
          placeholder="District"
        />
        <Input
          value={state}
          onChange={e => setState(e.target.value)}
          placeholder="State"
        />
        <Input
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="City"
        />
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
