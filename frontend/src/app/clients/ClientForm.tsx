'use client'
import { Input } from 'antd'
import { intl } from '@/i18n'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { authAtom } from '../atoms/authAtom'
import { SearchIcon, X } from 'lucide-react'
import { Button } from 'antd'
import axios, { isAxiosError } from 'axios'
import { toast } from 'sonner'

interface ClientFormProps {
  clientData: ClientDataProps | undefined
  closeModal: () => void
}

interface ClientDataProps {
  id: string | undefined
  fullName: string | undefined
  documentId: string | undefined
  email: string | undefined
  zipCode: string | undefined
  addressName: string | undefined
  addressComplement: string | undefined
  addressNumber: string | undefined
  district: string | undefined
  state: string | undefined
  city: string | undefined
  createdDate: string | undefined
  isActive: boolean | undefined
  phoneNumber: string | undefined
}

const ClientForm: React.FC<ClientFormProps> = ({ clientData, closeModal }) => {
  const [isLogged, setIsLogged] = useAtom(authAtom)
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const [fullName, setFullName] = useState(clientData?.fullName)
  const [documentId, setDocumentId] = useState(clientData?.documentId)
  const [phoneNumber, setPhoneNumber] = useState(clientData?.phoneNumber)
  const [email, setEmail] = useState(clientData?.email)
  const [zipCode, setZipCode] = useState(clientData?.zipCode)
  const [addressName, setAddressName] = useState(clientData?.addressName)
  const [addressNumber, setAddressNumber] = useState(clientData?.addressNumber)
  const [addressComplement, setAddressComplement] = useState(
    clientData?.addressComplement,
  )
  const [district, setDistrict] = useState(clientData?.district)
  const [state, setState] = useState(clientData?.state)
  const [city, setCity] = useState(clientData?.city)
  const [fullNameError, setFullNameError] = useState('')
  const [DocumentIdError, setDocumentIdError] = useState('')
  const [zipCodeError, setZipCodeError] = useState('')
  const [addressNumberError, setAddressNumberError] = useState('')
  const [addressNameError, setAddressNameError] = useState('')
  const [districtError, setDistrictError] = useState('')
  const [cityError, setCityError] = useState('')
  const [stateError, setStateError] = useState('')

  const removeMask = (value: string): string => {
    return value.replace(/\D/g, '')
  }

  const formatPhoneNumber = (value: string) => {
    const numericValue = value.replace(/\D/g, '')

    if (numericValue.length === 0) return ''

    if (numericValue.length <= 2) {
      return `(${numericValue}`
    } else if (numericValue.length <= 6) {
      return numericValue.replace(/(\d{2})(\d{0,4})/, '($1) $2')
    } else if (numericValue.length <= 10) {
      // Padrão de telefone fixo (XX) XXXX-XXXX
      return numericValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    } else {
      // Padrão de celular (XX) XXXXX-XXXX
      return numericValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
  }

  const formatZipCode = (value: string) => {
    const numericValue = value.replace(/\D/g, '')

    if (numericValue.length <= 5) {
      // Adiciona apenas os primeiros dígitos, até 5, sem traço
      return numericValue
    } else {
      // Adiciona o traço após os primeiros 5 dígitos
      return numericValue.replace(/^(\d{5})(\d{0,3})$/, '$1-$2')
    }
  }

  const formatDocumentId = (value: string) => {
    const numericValue = value.replace(/\D/g, '')

    if (numericValue.length <= 3) {
      // Exibe os primeiros 3 dígitos
      return numericValue
    } else if (numericValue.length <= 6) {
      // Adiciona o primeiro ponto
      return numericValue.replace(/(\d{3})(\d{0,3})/, '$1.$2')
    } else if (numericValue.length <= 9) {
      // Adiciona o segundo ponto
      return numericValue.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3')
    } else if (numericValue.length <= 11) {
      // Aplica máscara completa para CPF (XXX.XXX.XXX-XX)
      return numericValue.replace(
        /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
        '$1.$2.$3-$4',
      )
    } else {
      // Aplica máscara completa para CNPJ (XX.XXX.XXX/XXXX-XX)
      return numericValue.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/,
        '$1.$2.$3/$4-$5',
      )
    }
  }

  const handleSearchClick: React.MouseEventHandler<
    SVGSVGElement
  > = async event => {
    try {
      event.preventDefault()
      const response = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json/`,
      )

      const cepData = response.data
      setAddressName(cepData.logradouro)
      setDistrict(cepData.bairro)
      setCity(cepData.localidade)
      setState(cepData.uf)

      if (cepData.logradouro) setAddressNameError('')
      if (cepData.bairro) setDistrictError('')
      if (cepData.localidade) setCityError('')
      if (cepData.uf) setStateError('')
    } catch (error) {
      console.error('Erro ao buscar o CEP:', error)
    }
  }

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value)
    setFullNameError('')
  }

  const handleDocumentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatDocumentId(e.target.value)
    setDocumentId(formattedValue)
  }

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatZipCode(e.target.value)
    setZipCode(formattedValue)
  }

  const handleBlur = (fieldName: keyof typeof fieldErrorMap) => {
    const fieldErrorMap = {
      fullName: {
        value: fullName,
        setError: setFullNameError,
      },
      documentId: {
        value: documentId,
        setError: setDocumentIdError,
      },
      zipCode: {
        value: zipCode,
        setError: setZipCodeError,
      },
      addressNumber: {
        value: addressNumber,
        setError: setAddressNumberError,
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

  const updateClient = async (updatedData: ClientDataProps) => {
    try {
      console.log('Updating client with data:', updatedData)
      const response = await axios.put(
        `http://localhost:5196/api/Client/${clientData?.id}`,
        updatedData,
      )
      console.log('Update response:', response)
      toast.success('Cliente alterado com sucesso')
      closeModal()
    } catch (error) {
      if (isAxiosError(error)) {
        console.error('Error message:', error.message)
        if (error.response) {
          console.error('Response data:', error.response.data)
          console.error('Response status:', error.response.status)
          console.error('Response headers:', error.response.headers)
        }
      } else {
        console.error('Unexpected error:', error)
      }
      toast.error('Falha ao atualizar cliente')
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const fieldsToValidate = [
      { value: addressName, errorSetter: setAddressNameError },
      { value: documentId, errorSetter: setDocumentIdError },
      { value: zipCode, errorSetter: setZipCodeError },
      { value: fullName, errorSetter: setFullNameError },
      { value: addressNumber, errorSetter: setAddressNumberError },
      { value: district, errorSetter: setDistrictError },
      { value: city, errorSetter: setCityError },
      { value: state, errorSetter: setStateError },
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

    if (!isValid) return

    updateClient({
      id: clientData?.id,
      fullName: fullName,
      documentId: removeMask(documentId || ''),
      createdDate: clientData?.createdDate,
      email: email,
      zipCode: removeMask(zipCode || ''),
      addressName: addressName,
      addressComplement: addressComplement,
      addressNumber: addressNumber || '',
      district: district,
      state: state,
      city: city,
      isActive: clientData?.isActive,
      phoneNumber: removeMask(phoneNumber || ''),
    })
  }

  useEffect(() => {
    if (clientData) {
      setFullName(clientData.fullName || '')
      setDocumentId(clientData.documentId || '')
      setPhoneNumber(clientData.phoneNumber || '')
      setEmail(clientData.email || '')
      setZipCode(clientData.zipCode || '')
      setAddressName(clientData.addressName || '')
      setAddressNumber(clientData.addressNumber || '')
      setAddressComplement(clientData.addressComplement || '')
      setDistrict(clientData.district || '')
      setState(clientData.state || '')
      setCity(clientData.city || '')
    }
  }, [clientData])

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mt-1 mb-2 flex-col flex border-2 rounded-xl border-secondary-foreground shadow-lg shadow-slate-500 border-slate-200 bg-white p-10 max-w-[700px]"
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-6">Editar cliente</h1>
          <X className="cursor-pointer" onClick={closeModal} />
        </div>

        <div className="flex w-full mb-4">
          <div className="w-[38%] mr-2 relative">
            <h1 className="font-bold mr-24">
              {intl.formatMessage({
                id: 'create.client.page.fullName.field.label',
              })}
            </h1>
            <Input
              value={fullName}
              onChange={handleFullNameChange}
              onBlur={() => handleBlur('fullName')}
              className={`p-2 mb-4 border rounded w-full ${fullNameError ? 'border-red-500' : 'border-slate-300'}`}
              placeholder={intl.formatMessage({
                id: 'create.client.page.fullName.field.placeholder',
              })}
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

          <div className="mr-2 w-[30%] relative">
            <h1 className="xl:mr-40  font-bold">
              {intl.formatMessage({
                id: 'create.client.page.document.field.label',
              })}
            </h1>
            <Input
              value={documentId}
              onChange={handleDocumentIdChange}
              onBlur={() => handleBlur('documentId')}
              maxLength={18}
              className={`p-2 mb-4 border rounded w-full ${DocumentIdError ? 'border-red-500' : 'border-slate-300'}`}
              placeholder={intl.formatMessage({
                id: 'create.client.page.document.field.placeholder',
              })}
            />
            {DocumentIdError && (
              <div
                style={{
                  color: 'red',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: -15,
                }}
              >
                {DocumentIdError}
              </div>
            )}
          </div>
          <div className="w-[30%]">
            <h1 className="xl:mr-44  font-bold">
              {intl.formatMessage({
                id: 'create.client.page.phoneNumber.field.label',
              })}
            </h1>
            <Input
              value={phoneNumber}
              onChange={e => setPhoneNumber(formatPhoneNumber(e.target.value))}
              className="p-2 mb-4 border rounded w-full "
              maxLength={15}
              placeholder={intl.formatMessage({
                id: 'create.client.page.phoneNumber.field.placeholder',
              })}
            />
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="w-[60%]">
            <h1 className="xl:mr-24  font-bold">
              {intl.formatMessage({
                id: 'create.client.page.email.field.label',
              })}
            </h1>
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="p-2 mb-4 border rounded w-full "
              placeholder={intl.formatMessage({
                id: 'create.client.page.email.field.placeholder',
              })}
            />
          </div>
          <div className="flex flex-col w-[40%] ml-3 relative">
            <h1 className="xl:mr-24  font-bold">
              {intl.formatMessage({
                id: 'create.client.page.zipCode.field.label',
              })}
            </h1>
            <div className="flex">
              <Input
                className={`p-2 mb-4 border rounded w-full ${zipCodeError ? 'border-red-500' : 'border-slate-300'}`}
                placeholder={intl.formatMessage({
                  id: 'create.client.page.zipCode.field.placeholder',
                })}
                value={zipCode}
                onChange={handleZipCodeChange}
                onBlur={() => handleBlur('zipCode')}
                maxLength={9}
              />
              {zipCodeError && (
                <div
                  style={{
                    color: 'red',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: -15,
                  }}
                >
                  {zipCodeError}
                </div>
              )}
              <SearchIcon className="p-2 h-10 w-10 cursor-pointer"
                onClick={handleSearchClick} />
            </div>
          </div>
        </div>

        <div>
          <div className=" flex justify-around mb-4">
            <div className="mx-1 ">
              <h1 className="xl:mr-24  font-bold">
                {intl.formatMessage({
                  id: 'create.client.page.streetName.field.label',
                })}
              </h1>
              <Input
                className={`p-2 mb-4 border rounded w-full ${addressNameError ? 'border-red-500' : 'border-slate-300'}`}
                value={addressName}
                onChange={e => setAddressName(e.target.value)}
                readOnly={true}
                disabled
              />
              {addressNameError && (
                <div
                  style={{
                    color: 'red',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: -15,
                  }}
                >
                  {addressNameError}
                </div>
              )}
            </div>
            <div className="mx-1 relative">
              <h1 className="xl:mr-24  font-bold">
                {intl.formatMessage({
                  id: 'create.client.page.streetNumber.field.label',
                })}
              </h1>
              <Input
                value={addressNumber}
                onChange={e => setAddressNumber(e.target.value)}
                onBlur={() => handleBlur('addressNumber')}
                placeholder={intl.formatMessage({
                  id: 'create.client.page.streetNumber.field.placeholder',
                })}
                className={`p-2 mb-4 border rounded w-full ${addressNumberError ? 'border-red-500' : 'border-slate-300'}`}
                required
              />
              {addressNumberError && (
                <div
                  style={{
                    color: 'red',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: -15,
                  }}
                >
                  {addressNumberError}
                </div>
              )}
            </div>
            <div className="mx-1">
              <h1 className="xl:mr-24  font-bold">
                {intl.formatMessage({
                  id: 'create.client.page.streetComplement.field.label',
                })}
              </h1>
              <Input
                value={addressComplement}
                onChange={e => setAddressComplement(e.target.value)}
                placeholder={intl.formatMessage({
                  id: 'create.client.page.streetComplement.field.placeholder',
                })}
                className="p-2 mb-4 border rounded w-full "
              />
            </div>
          </div>
          <div className="w-full flex justify-around mb-4">
            <div className="mx-1">
              <h1 className="xl:mr-24  font-bold">
                {intl.formatMessage({
                  id: 'create.client.page.district.field.label',
                })}
              </h1>
              <Input
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className={`p-2 mb-4 border rounded w-full ${districtError ? 'border-red-500' : 'border-slate-300'}`}
                readOnly={true}
                disabled
              />
              {districtError && (
                <div
                  style={{
                    color: 'red',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: -15,
                  }}
                >
                  {districtError}
                </div>
              )}
            </div>
            <div className="mx-1">
              <h1 className="xl:mr-24  font-bold">
                {intl.formatMessage({
                  id: 'create.client.page.state.field.label',
                })}
              </h1>
              <Input
                value={state}
                onChange={e => setState(e.target.value)}
                className={`p-2 mb-4 border rounded w-full ${stateError ? 'border-red-500' : 'border-slate-300'}`}
                readOnly={true}
                disabled
              />
              {stateError && (
                <div
                  style={{
                    color: 'red',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: -15,
                  }}
                >
                  {stateError}
                </div>
              )}
            </div>
            <div className="mx-1">
              <h1 className="xl:mr-24  font-bold">
                {intl.formatMessage({
                  id: 'create.client.page.city.field.label',
                })}
              </h1>
              <Input
                value={city}
                onChange={e => setCity(e.target.value)}
                className={`p-2 mb-4 border rounded w-full ${cityError ? 'border-red-500' : 'border-slate-300'}`}
                readOnly={true}
                disabled
              />
              {cityError && (
                <div
                  style={{
                    color: 'red',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: -15,
                  }}
                >
                  {cityError}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button className="" onClick={closeModal} type="default">
            Fechar
          </Button>
          <Button htmlType="submit" type="default">
            {intl.formatMessage({
              id: 'edit.client.page.create.client.button',
            })}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ClientForm
