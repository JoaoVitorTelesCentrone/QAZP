import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { Button, Input, Modal } from 'antd'
import axios, { isAxiosError } from 'axios'
import { ChevronDown, SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

import { useAtom } from 'jotai'
import { intl } from '@/i18n'
import { redirect } from 'next/navigation'
import { authAtom } from '../atoms/authAtom'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { clientChangeAtom } from '../atoms/clientChangeAtom'
import ValidatedInput from '../components/ValidatedInput'

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

  const [loading, setLoading] = useState(false)

  if (!isLogged) {
    redirect('/')
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

  async function createClient() {
    const data = {
      fullName,
      documentId,
      phoneNumber,
      email,
      zipCode,
      addressName,
      addressNumber,
      addressComplement,
      district,
      state,
      city,
    }
    try {
      const response = await axios.post(
        'http://localhost:5196/api/Client',
        data,
      )
      const userData = response.data
      if (response.status === 201) {
        toast.success('Cliente criado')
        onClose()
        setChange(prev => prev + 1)
      }
      if (response.status === 409) {
        toast.error('Cliente criado')
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error('Erro ao fazer a requisição:', error)
        if (error.response) {
          console.error('Código de status:', error.response.status)
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
        <form className="">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {intl.formatMessage({
                id: 'create.client.page.personal.information.section',
              })}
            </h1>
            <div className="flex w-full justify-between">
              <div className="w-full">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.fullName.field.label',
                  })}
                </h1>
                <ValidatedInput
                  onChange={setFullName}
                  className="p-4 border-slate-500 bg-white mb-4 border rounded w-full"
                  placeholder={intl.formatMessage({
                    id: 'create.client.page.fullName.field.placeholder',
                  })}
                  value={fullName}
                  required
                />
              </div>
            </div>
            <div className="w-full justify-between flex">
              <div className="mr-2 mt-3 w-56">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.document.field.label',
                  })}
                </h1>
                <ValidatedInput
                  onChange={setDocumentId}
                  className="p-4 border-slate-500 bg-white mb-4 border rounded w-full"
                  placeholder={intl.formatMessage({
                    id: 'create.client.page.document.field.placeholder',
                  })}
                  value={documentId}
                  required
                />
              </div>
              <div className="mt-3 w-56">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.phoneNumber.field.label',
                  })}
                </h1>
                <ValidatedInput
                  onChange={setPhoneNumber}
                  className="p-2 border-slate-500 bg-white mb-4 border rounded w-full"
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
            <ValidatedInput
              onChange={setEmail}
              className="p-2 border-slate-500 bg-white mb-4 border rounded w-full"
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
              <div className="flex flex-col w-[40%]">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.zipCode.field.label',
                  })}
                </h1>
                <div className="flex">
                  <ValidatedInput
                    className="p-4 border-slate-500 bg-white mb-4 border rounded w-full"
                    placeholder={intl.formatMessage({
                      id: 'create.client.page.zipCode.field.placeholder',
                    })}
                    value={zipCode}
                    onChange={setZipCode}
                    required
                  />
                  <SearchIcon
                    className="p-2 h-10 w-10 cursor-pointer"
                    onClick={handleSearchClick}
                  />
                </div>
              </div>
              <div className="mx-1 w-[60%]">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.streetName.field.label',
                  })}
                </h1>
                <Input
                  className="p-2 border-slate-500 bg-neutral-300 mb-2 border rounded w-full"
                  value={addressName}
                  onChange={e => setAddressName(e.target.value)}
                  readOnly={true}
                  disabled
                />
              </div>
            </div>
            <div className="w-full justify-between flex mt-3">
              <div className="mr-0 w-[35%]">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.streetNumber.field.label',
                  })}
                </h1>
                <ValidatedInput
                  onChange={setAddressNumber}
                  className="p-2 border-slate-500 bg-white mb-2 border rounded w-full"
                  placeholder={intl.formatMessage({
                    id: 'create.client.page.streetNumber.field.placeholder',
                  })}
                  value={addressNumber}
                  required
                />
              </div>
              <div className="mr-0 w-[60%]">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.streetComplement.field.label',
                  })}
                </h1>
                <ValidatedInput
                  onChange={setAddressComplement}
                  className="p-2 border-slate-500 bg-white mb-4"
                  placeholder={intl.formatMessage({
                    id: 'create.client.page.streetComplement.field.placeholder',
                  })}
                  value={addressComplement}
                />
              </div>
            </div>
            <div className="w-full flex justify-around mt-3">
              <div className="mx-1">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.district.field.label',
                  })}
                </h1>
                <Input
                  className="p-2 border-slate-500 bg-neutral-500 mb-4 border rounded w-full"
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  readOnly={true}
                  disabled={true}
                />
              </div>
              <div className="mx-1">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.state.field.label',
                  })}
                </h1>
                <Input
                  className="p-2 border-slate-500 bg-neutral-300 mb-4"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  readOnly={true}
                  disabled
                />
              </div>
              <div className="mx-1">
                <h1>
                  {intl.formatMessage({
                    id: 'create.client.page.city.field.label',
                  })}
                </h1>
                <Input
                  className="p-2 border-slate-500 bg-neutral-300 mb-4"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  readOnly={true}
                  disabled
                />
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
