import { Button, Input, Modal } from 'antd'
import axios, { isAxiosError } from 'axios'
import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { useAtom } from 'jotai'
import { intl } from '@/i18n'
import { redirect } from 'next/navigation'
import { authAtom } from '../atoms/authAtom'
import { clientChangeAtom } from '../atoms/clientChangeAtom'

const ClientCategory: ClientCategoryProps[] = [
  { name: 'Comida', index: 1 },
  { name: 'Decoração', index: 2 },
  { name: 'Utensilios', index: 3 },
  { name: 'Móveis', index: 4 },
  { name: 'Recursos humanos', index: 5 },
  { name: 'Aluguel', index: 6 },
  { name: 'Entretenimento', index: 7 },
  { name: 'Marketing', index: 8 },
]

type ClientCategoryProps = {
  name: string
  index: number
}
export type createClientProps = {
  isVisible: boolean
  onClose: () => void
}

const CreateClientModal: React.FC<createClientProps> = ({
  isVisible,
  onClose,
}) => {
  const [isLogged, setIsLogged] = useAtom(authAtom)
  const [fullName, setFullName] = useState('')
  const [documentId, setDocumentId] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [addressName, setAddressName] = useState('')
  const [addressNumber, setAddressNumber] = useState('')
  const [addressComplement, setAddressComplement] = useState('')
  const [district, setDistrict] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [change, setChange] = useAtom(clientChangeAtom)
  const [fullNameError, setFullNameError] = useState('')
  const [DocumentIdError, setDocumentIdError] = useState('')
  const [zipCodeError, setZipCodeError] = useState('')
  const [addressNumberError, setAddressNumberError] = useState('')
  const [addressNameError, setAddressNameError] = useState('')
  const [districtError, setDistrictError] = useState('')
  const [cityError, setCityError] = useState('')
  const [stateError, setStateError] = useState('')

  if (!isLogged) {
    redirect('/')
  }

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value)
    setFullNameError('')
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
    };
  
    const field = fieldErrorMap[fieldName];
  
    if (!field.value) {
      field.setError('Campo obrigatório *');
    } else {
      field.setError('');
    }
  };

  const formatZipCode = (value: string) => {
    return value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})$/, '$1-$2')
  }

  const formatDocumentId = (value: string) => {
    const numericValue = value.replace(/\D/g, '')

    if (numericValue.length <= 11) {
      // CPF mask
      return numericValue.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        '$1.$2.$3-$4',
      )
    } else if (numericValue.length <= 14) {
      // CNPJ mask
      return numericValue.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5',
      )
    }
    return numericValue
  }

  const handleDocumentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatDocumentId(e.target.value)
    setDocumentId(formattedValue)

    if (formattedValue) {
      setDocumentIdError('')
    }
  }

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatZipCode(e.target.value)
    setZipCode(formattedValue)

    if (formattedValue) {
      setZipCodeError('')
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
    } catch (error) {
      console.error('Erro ao buscar o CEP:', error)
    }
  }

  function removeMask(value: string): string {
    return value.replace(/\D/g, '')
  }

  async function createClient() {
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
        errorSetter('Campo obrigatório *')
        isValid = false
      } else {
        errorSetter('')
      }
    })

    if (!isValid) return

    const data = {
      fullName,
      documentId: removeMask(documentId),
      phoneNumber: removeMask(phoneNumber),
      email,
      zipCode: removeMask(zipCode),
      addressName,
      addressNumber,
      addressComplement,
      district,
      state,
      city,
    }
    console.log('Dados do cliente:', data)

    try {
      const response = await axios.post(
        'http://localhost:5196/api/Client',
        data,
      )
      if (response.status === 201) {
        toast.success('Cliente criado')
        onClose()
        setChange(prev => prev + 1)
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error('Erro ao fazer a requisição:', error)
        if (error.response) {
          if (error.response.status === 409) {
            toast.error('Esse cliente já existe!')
          } else if (error.response.status === 400) {
            toast.error('Erro de requisição. Verifique os dados enviados.')
          } else {
            toast.error('Erro desconhecido.')
          }
        }
      }
    }
  }
  return (
    <div>
      <Modal
        title="Criar Cliente"
        visible={isVisible}
        onCancel={onClose}
        footer={[]}
      >
        <form>
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {intl.formatMessage({
                id: 'create.client.page.personal.information.section',
              })}
            </h1>
            <div className="flex w-full justify-between">
              <div className="w-full relative">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.fullName.field.label',
                  })}
                </h1>
                <Input
                  onChange={handleFullNameChange}
                  onBlur={() => handleBlur('fullName')}
                  className={`p-2 mb-4 border rounded w-full ${fullNameError ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder={intl.formatMessage({
                    id: 'create.client.page.fullName.field.placeholder',
                  })}
                  value={fullName}
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
            </div>
            <div className="w-full justify-between flex">
              <div className="mr-2 mt-3 w-56 relative">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.document.field.label',
                  })}
                </h1>
                <Input
                  onChange={handleDocumentIdChange}
                  onBlur={() => handleBlur('documentId')}
                  className={`p-2 mb-4 border rounded w-full ${DocumentIdError ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder={intl.formatMessage({
                    id: 'create.client.page.document.field.placeholder',
                  })}
                  value={documentId}
                  maxLength={18}
                  required
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
              <div className="mt-3 w-56">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.phoneNumber.field.label',
                  })}
                </h1>
                <Input
                  onChange={e => setPhoneNumber(e.target.value)}
                  className="p-2 mb-4 border rounded w-full"
                  placeholder={intl.formatMessage({
                    id: 'create.client.page.phoneNumber.field.placeholder',
                  })}
                  value={phoneNumber}
                  type="text"
                />
              </div>
            </div>
            <h1 className="mt-3">
              {intl.formatMessage({
                id: 'create.client.page.email.field.label',
              })}
            </h1>
            <Input
              onChange={e => setEmail(e.target.value)}
              className="p-2 mb-4 border rounded w-full"
              placeholder={intl.formatMessage({
                id: 'create.client.page.email.field.placeholder',
              })}
              value={email}
            />
          </div>
          <h1 className="text-2xl font-bold mt-8 mb-4">
            {intl.formatMessage({
              id: 'create.client.page.localization.information.section',
            })}
          </h1>
          <div>
            <div className="w-full flex justify-around">
              <div className="flex flex-col w-[40%] relative">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.zipCode.field.label',
                  })}
                </h1>
                <div className="flex">
                  <Input
                    className={`p-2 mb-4 border rounded w-full ${DocumentIdError ? 'border-red-500' : 'border-slate-300'}`}
                    placeholder={intl.formatMessage({
                      id: 'create.client.page.zipCode.field.placeholder',
                    })}
                    value={zipCode}
                    maxLength={9}
                    onChange={handleZipCodeChange}
                    onBlur={() => handleBlur('zipCode')}
                    required
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
                  <SearchIcon
                    className="p-2 h-10 w-10 cursor-pointer"
                    onClick={handleSearchClick}
                  />
                </div>
              </div>
              <div className="mx-1 w-[60%] relative">
                <h1>
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
            </div>
            <div className="w-full justify-between flex mt-3">
              <div className="mr-0 w-[35%] relative">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.streetNumber.field.label',
                  })}
                </h1>
                <Input
                  onChange={e => setAddressNumber(e.target.value)}
                  onBlur={() => handleBlur('addressNumber')}
                  className={`p-2 mb-4 border rounded w-full ${addressNumberError ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder={intl.formatMessage({
                    id: 'create.client.page.streetNumber.field.placeholder',
                  })}
                  value={addressNumber}
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
              <div className="mr-0 w-[60%]">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.streetComplement.field.label',
                  })}
                </h1>
                <Input
                  onChange={e => setAddressComplement(e.target.value)}
                  className="p-2 border-slate-500 bg-white mb-4"
                  placeholder={intl.formatMessage({
                    id: 'create.client.page.streetComplement.field.placeholder',
                  })}
                  value={addressComplement}
                />
              </div>
            </div>
            <div className="w-full flex justify-around mt-3">
              <div className="mx-1 relative">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.district.field.label',
                  })}
                </h1>
                <Input
                  className={`p-2 mb-4 border rounded w-full ${districtError ? 'border-red-500' : 'border-slate-300'}`}
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  readOnly={true}
                  disabled={true}
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
              <div className="mx-1 relative">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.state.field.label',
                  })}
                </h1>
                <Input
                  className={`p-2 mb-4 border rounded w-full ${stateError ? 'border-red-500' : 'border-slate-300'}`}
                  value={state}
                  onChange={e => setState(e.target.value)}
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
              <div className="mx-1 relative">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.city.field.label',
                  })}
                </h1>
                <Input
                  className={`p-2 mb-4 border rounded w-full ${cityError ? 'border-red-500' : 'border-slate-300'}`}
                  value={city}
                  onChange={e => setCity(e.target.value)}
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
          <div className="flex justify-end mt-3 mr-1">
            <Button
              className="bg-primary text-white w-[30%]"
              onClick={() => createClient()}
            >
              {intl.formatMessage({
                id: 'create.client.page.create.client.button',
              })}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default CreateClientModal
