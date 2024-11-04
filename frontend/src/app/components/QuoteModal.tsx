'use client'

import { useRouter } from 'next/navigation'
import { Dropdown, Input, Menu, MenuProps, Space, Button, Modal } from 'antd'
import axios from 'axios'
import { Toaster, toast } from 'sonner'
import ClipLoader from 'react-spinners/ClipLoader'
import { useState } from 'react'
import { intl } from '@/i18n'
import { ChevronDown } from 'lucide-react'

const API_URL = 'http://localhost:5196/api/Quote'

const QuoteModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [eventType, setEventType] = useState('')
  const [estimatedAudience, setEstimatedAudience] = useState(0)

  const items: MenuProps['items'] = [
    { key: 'Festival', label: 'Festival' },
    { key: 'Festa', label: 'Festa' },
    { key: 'Formatura', label: 'Formatura' },
    { key: 'Workshop', label: 'Workshop' },
    { key: 'Casamento', label: 'Casamento' },
    { key: 'Campeonato', label: 'Campeonato' },
    { key: 'Seminário', label: 'Seminário' },
    { key: 'Convenção', label: 'Convenção' },
    { key: 'Baile', label: 'Baile' },
    { key: 'Cerimônia', label: 'Cerimônia' },
  ]

  const resetForm = () => {
    setFullName('')
    setEmail('')
    setPhoneNumber('')
    setEventType('')
    setEstimatedAudience(0)
  }

  const handleMenuClick: MenuProps['onClick'] = e => {
    setEventType(e.key)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const quote = {
      fullName,
      email,
      phoneNumber,
      eventType,
      estimatedAudience,
    }

    try {
      const response = await axios.post(API_URL, quote, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 201) {
        handleModalClose()
        toast.success('Cotações enviadas com sucesso!') // Show success toast
      }
    } catch (error) {
      console.error('Erro ao enviar a cotação:', error)
      toast.error('Erro ao enviar a cotação. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleModalClose = () => {
    resetForm()
    onClose()
  }

  return (
    <>
      <Toaster richColors />
      <Modal
        open={isVisible}
        onCancel={handleModalClose}
        footer={null}
        title={intl.formatMessage({ id: 'create.quote.page.title' })}
        centered
      >
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <ClipLoader size={50} color={'#123abc'} loading={loading} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col p-6">
            <label className="text-lg font-bold">Nome completo</label>
            <Input
              value={fullName}
              placeholder={intl.formatMessage({
                id: 'create.quote.page.name.placeholder',
              })}
              onChange={e => setFullName(e.target.value)}
              className="mb-4"
              required
            />
            <label className="text-lg font-bold">Email</label>
            <Input
              value={email}
              placeholder={intl.formatMessage({
                id: 'create.quote.page.email.placeholder',
              })}
              onChange={e => setEmail(e.target.value)}
              className="mb-4"
              type="email"
              required
            />
            <label className="text-lg font-bold">Celular</label>
            <Input
              value={phoneNumber}
              placeholder={intl.formatMessage({
                id: 'create.quote.page.phone.placeholder',
              })}
              onChange={e => setPhoneNumber(e.target.value)}
              className="mb-4"
              required
            />
            <label className="text-lg font-bold">Tipo</label>
            <Dropdown
              overlay={<Menu items={items} onClick={handleMenuClick} />}
              trigger={['click']}
            >
              <a onClick={e => e.preventDefault()}>
                <Space className="p-2 border-2 border-gray-200 rounded-xl">
                  {eventType || 'Selecione o tipo do evento'}
                  <ChevronDown />
                </Space>
              </a>
            </Dropdown>
            <label className="text-lg font-bold">Público</label>
            <Input
              value={estimatedAudience}
              type="number"
              placeholder={intl.formatMessage({
                id: 'create.quote.page.estimated.audience.placeholder',
              })}
              onChange={e => setEstimatedAudience(parseInt(e.target.value))}
              className="mb-4"
              required
            />
            <Button
              className="bg-primary text-secondary w-full"
              type="primary"
              htmlType="submit"
            >
              {intl.formatMessage({ id: 'request.quote.button' })}
            </Button>
          </form>
        )}
      </Modal>
    </>
  )
}

export default QuoteModal
