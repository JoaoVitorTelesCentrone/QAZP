import { Input, Button, Modal } from 'antd'
import axios, { AxiosError } from 'axios'
import { Toaster, toast } from 'sonner'
import { useState } from 'react'
import { intl } from '@/i18n'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { EventType } from '../CreateEvent/utils'

const API_URL = 'http://localhost:5196/api/Quote'
interface ErrorResponse {
  message: string;
}

export type QuoteModalProps = {
  isVisible: boolean
  onClose: () => void
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isVisible, onClose }) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [eventType, setEventType] = useState('')
  const [estimatedAudience, setEstimatedAudience] = useState('')
  const [type, setType] = useState('')
  const [category, setCategory] = useState<number | null>(null)
  const [fullNameError, setFullNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState('')
  const [typeError, setTypeError] = useState('')
  const [estimatedAudienceError, setEstimatedAudienceError] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const resetForm = () => {
    setFullName('')
    setEmail('')
    setPhoneNumber('')
    setEventType('')
    setType('')
    setCategory(null)
    setEstimatedAudience('')
    setFullNameError('')
    setEmailError('')
    setPhoneNumberError('')
    setTypeError('')
    setEstimatedAudienceError('')
    setIsTouched(false)
  }

  const quoteModelRequest = async () => {
    const fieldsToValidate = [
      { value: fullName, errorSetter: setFullNameError },
      { value: email, errorSetter: setEmailError },
      { value: phoneNumber, errorSetter: setPhoneNumberError },
      { value: type, errorSetter: setTypeError },
      { value: estimatedAudience, errorSetter: setEstimatedAudienceError },
    ]

    let isValid = true

    fieldsToValidate.forEach(({ value, errorSetter }) => {
      if (!value) {
        errorSetter(`${intl.formatMessage({
          id: 'required.field.error.message',
        })}`)
        isValid = false
      } else {
        errorSetter('')
      }
    })

    if (type === null) {
      setIsTouched(true)
      isValid = false
    }

    if (!isCategoryValid) {
      setIsTouched(true)
      isValid = false
    }

    if (!isValid) return

    const quote = {
      fullName: fullName,
      email: email,
      phoneNumber: removeMask(phoneNumber),
      eventType: type,
      estimatedAudience: estimatedAudience,
    }

    try {
      const response = await axios.post(API_URL, quote);

      if (response.status === 201) {
        toast.success(intl.formatMessage({ id: 'create.quote.success.message' }));
        onClose();
        resetForm();
      }
    } catch (error: unknown) {
      handleSaveQuoteError(error);
    }
    return true;
  }

  const handleBlur = (fieldName: keyof typeof fieldErrorMap) => {
    const fieldErrorMap = {
      fullName: {
        value: fullName,
        setError: setFullNameError,
      },
      email: {
        value: email,
        setError: setEmailError,
      },
      estimatedAudience: {
        value: estimatedAudience,
        setError: setEstimatedAudienceError,
      },
      phoneNumber: {
        value: phoneNumber,
        setError: setPhoneNumberError,
      },
    }

    const field = fieldErrorMap[fieldName]

    if (!field.value) {
      field.setError(`${intl.formatMessage({
        id: 'required.field.error.message',
      })}`)
    } else {
      field.setError('')
    }
  }

  const formatPhoneNumber = (value: string) => {
    const numericValue = value.replace(/\D/g, '')

    if (numericValue.length === 0) return ''

    if (numericValue.length <= 2) {
      return `(${numericValue}`
    } else if (numericValue.length <= 6) {
      return numericValue.replace(/(\d{2})(\d{0,4})/, '($1) $2')
    } else if (numericValue.length <= 10) {
      return numericValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    } else {
      return numericValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
  }

  function removeMask(value: string): string {
    return value.replace(/\D/g, '')
  }

  const getQuoteNameAndIndex = (type: string, categoryIndex: number) => {
    setType(type)
    setCategory(categoryIndex)
  }

  const handleEstimatedAudience = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (!isNaN(Number(value)) || value === '') {
      setEstimatedAudience(value)
      setEstimatedAudienceError('')
    } else {
      setEstimatedAudienceError('Apenas números são permitidos')
    }
  }

  const isCategoryValid = category !== null

  const handleModalClose = () => {
    resetForm()
    onClose()
  }

  function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined
  }

  const handleSaveQuoteError = (error: unknown) => {
    if (!isAxiosError(error)) {
      console.error('Erro inesperado:', error);
      toast.error(intl.formatMessage({ id: 'create.quote.error.message' }));
      return;
    }

    if (error.response) {
      const { data, status } = error.response;

      if (status === 409 && (data as ErrorResponse)?.message === 'There is already a quote in progress') {
        toast.error(intl.formatMessage({ id: 'create.quote.in.progress.message' }));
      } else {
        toast.error(intl.formatMessage({ id: 'create.quote.error.message' }));
      }
    }
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
        <div className="flex flex-col relative mb-4">
          <label className="text-lg font-bold">{intl.formatMessage({
            id: 'create.quote.page.name.field',
          })}
          </label>
          <Input
            data-testid="quote-modal-name"
            value={fullName}
            placeholder={intl.formatMessage({
              id: 'create.quote.page.name.placeholder',
            })}
            onChange={e => setFullName(e.target.value)}
            onBlur={() => handleBlur('fullName')}
            className={`p-2 mb-4 border rounded w-full ${fullNameError ? 'border-red-500' : 'border-slate-300'}`}
            required
          />
          {fullNameError && (
            <div
              style={{
                color: 'red',
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: -15,
              }}
            >
              {fullNameError}
            </div>
          )}
        </div>
        <div className="flex flex-col relative mb-4">
          <label className="text-lg font-bold">{intl.formatMessage({
            id: 'create.quote.page.email.field',
          })}
          </label>
          <Input
            data-testid="quote-modal-email"
            value={email}
            placeholder={intl.formatMessage({
              id: 'create.quote.page.email.placeholder',
            })}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            className={`p-2 mb-4 border rounded w-full ${emailError ? 'border-red-500' : 'border-slate-300'}`}
            type="email"
            required
          />
          {emailError && (
            <div
              style={{
                color: 'red',
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: -15,
              }}
            >
              {emailError}
            </div>
          )}
        </div>
        <div className="flex flex-col relative mb-4">
          <label className="text-lg font-bold">{intl.formatMessage({
            id: 'create.quote.page.phone.field',
          })}</label>
          <Input
            data-testid="quote-modal-phone"
            value={phoneNumber}
            placeholder={intl.formatMessage({
              id: 'create.quote.page.phone.placeholder',
            })}
            onChange={e => setPhoneNumber(formatPhoneNumber(e.target.value))}
            onBlur={() => handleBlur('phoneNumber')}
            maxLength={15}
            className={`p-2 mb-4 border rounded w-full ${phoneNumberError ? 'border-red-500' : 'border-slate-300'}`}
            required
          />
          {phoneNumberError && (
            <div
              style={{
                color: 'red',
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: -15,
              }}
            >
              {phoneNumberError}
            </div>
          )}
        </div>
        <div className="flex flex-col w-full relative mb-6">
          <label className="text-lg font-bold">{intl.formatMessage({
            id: 'create.quote.page.event.type.field',
          })}
          </label>
          <DropdownMenu
            onOpenChange={open => {
              if (!open) {
                if (!isCategoryValid) {
                  setIsTouched(true)
                }
              }
            }}
          >
            <DropdownMenuTrigger
              data-testid="quote-modal-type"
              className={`flex border bg-white justify-between px-2 py-1 rounded h-10 ${!isCategoryValid && isTouched
                ? 'border-red-500'
                : 'border-gray-300'
                }`}
              onBlur={() => setIsTouched(true)}
            >
              <h1 className={`${!type ? 'text-gray-400' : 'text-black'} mt-1`}>
                {type ? type : 'Selecione o tipo do evento'}
              </h1>
              <ChevronDown className="h-4 w-4 mt-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              style={{ zIndex: 1000 }}
              className="border-2 p-2 bg-white my-1 rounded-xl w-96"
            >
              {EventType.map((category, index) => (
                <React.Fragment key={index}>
                  <DropdownMenuItem
                    data-testid="quote-modal-type-dropdown"
                    className="cursor-pointer my-1"
                    onClick={() => {
                      getQuoteNameAndIndex(category.name, category.index)
                      setIsTouched(false)
                    }}
                  >
                    {category.name}
                  </DropdownMenuItem>
                  {index < EventType.length - 1 && (
                    <hr className="bg-primary h-[0.4px]" />
                  )}
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {!isCategoryValid && isTouched && (
            <span
              className="text-red-500 text-sm absolute"
              style={{ top: '100%' }}
            >
              {intl.formatMessage({
                id: 'required.field.error.message',
              })}
            </span>
          )}
        </div>
        <div className="relative mb-4">
          <label className="text-lg font-bold">{intl.formatMessage({
            id: 'create.quote.page.estimated.audience.field',
          })}
          </label>
          <Input
            data-testid="quote-modal-estimated-audience"
            value={estimatedAudience}
            placeholder={intl.formatMessage({
              id: 'create.quote.page.estimated.audience.placeholder',
            })}
            onChange={handleEstimatedAudience}
            onBlur={() => handleBlur('estimatedAudience')}
            className={`p-2 mb-4 border rounded w-full ${estimatedAudienceError ? 'border-red-500' : 'border-slate-300'}`}
            required
          />
          {estimatedAudienceError && (
            <div
              style={{
                color: 'red',
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: -15,
              }}
            >
              {estimatedAudienceError}
            </div>
          )}
        </div>
        <Button
          data-testid="quote-modal-button"
          className="bg-primary text-secondary w-full mt-4"
          type="primary"
          onClick={() => quoteModelRequest()}
        >
          {intl.formatMessage({ id: 'request.quote.button' })}
        </Button>
      </Modal>
    </>
  )
}

export default QuoteModal
function handleSaveQuoteError(error: unknown) {
  throw new Error('Function not implemented.')
}

