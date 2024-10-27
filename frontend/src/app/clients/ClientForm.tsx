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
    updateClient({
      id: clientData?.id,
      fullName: fullName,
      documentId: documentId,
      createdDate: clientData?.createdDate,
      email: email,
      zipCode: zipCode,
      addressName: addressName,
      addressComplement: addressComplement,
      addressNumber: addressNumber,
      district: district,
      state: state,
      city: city,
      isActive: clientData?.isActive,
      phoneNumber: phoneNumber,
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
          <h1 className="text-2xl font-bold mb-6">Criar cliente</h1>
          <X className="cursor-pointer" onClick={closeModal} />
        </div>

        <div>
          <div className="flex w-full justify-between">
            <div className="w-full">
              <h1 className="xl:mr-96 xl:w-48 mb-2 font-bold">
                {intl.formatMessage({
                  id: 'create.client.page.fullName.field.label',
                })}
              </h1>
              <Input
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="p-2 border-slate-500 bg-white mb-4"
                placeholder={intl.formatMessage({
                  id: 'create.client.page.fullName.field.placeholder',
                })}
              />
            </div>
          </div>
          <div className="w-full justify-around flex">
            <div className="mr-2 w-[45%]">
              <h1 className="xl:mr-40  font-bold">
                {intl.formatMessage({
                  id: 'create.client.page.document.field.label',
                })}
              </h1>
              <Input
                value={documentId}
                onChange={e => setDocumentId(e.target.value)}
                className="p-2 border-slate-500 bg-white mb-4"
                placeholder={intl.formatMessage({
                  id: 'create.client.page.document.field.placeholder',
                })}
              />
            </div>
            <div className="w-[45%]">
              <h1 className="xl:mr-44  font-bold">
                {intl.formatMessage({
                  id: 'create.client.page.phoneNumber.field.label',
                })}
              </h1>
              <Input
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                className="p-2 border-slate-500 bg-white mb-4"
                placeholder={intl.formatMessage({
                  id: 'create.client.page.phoneNumber.field.placeholder',
                })}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-[60%]">
            <h1 className="xl:mr-24  font-bold">
              {intl.formatMessage({
                id: 'create.client.page.email.field.label',
              })}
            </h1>
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="p-2 border-slate-500 bg-white mb-4"
              placeholder={intl.formatMessage({
                id: 'create.client.page.email.field.placeholder',
              })}
            />
          </div>
          <div className="flex flex-col w-[40%] ml-3">
            <h1 className="xl:mr-24  font-bold">
              {intl.formatMessage({
                id: 'create.client.page.zipCode.field.label',
              })}
            </h1>
            <div className="flex">
              <Input
                className="p-2 border-slate-500 bg-white mb-4"
                placeholder={intl.formatMessage({
                  id: 'create.client.page.zipCode.field.placeholder',
                })}
                value={zipCode}
                onChange={e => setZipCode(e.target.value)}
              />
              <SearchIcon className="p-2 h-10 w-10 cursor-pointer" />
            </div>
          </div>
        </div>

        <div>
          <div className=" flex justify-around">
            <div className="mx-1 ">
              <h1 className="xl:mr-24  font-bold">
                {intl.formatMessage({
                  id: 'create.client.page.streetName.field.label',
                })}
              </h1>
              <Input
                className="p-2 border-slate-500 bg-neutral-300 mb-4"
                value={addressName}
                onChange={e => setAddressName(e.target.value)}
                readOnly={true}
              />
            </div>

            <div className="mx-1">
              <h1 className="xl:mr-24  font-bold">
                {intl.formatMessage({
                  id: 'create.client.page.streetNumber.field.label',
                })}
              </h1>
              <Input
                value={addressNumber}
                onChange={e => setAddressNumber(e.target.value)}
                placeholder={intl.formatMessage({
                  id: 'create.client.page.streetNumber.field.placeholder',
                })}
                className="p-2 border-slate-500 bg-white mb-4"
              />
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
                className="p-2 border-slate-500 bg-white mb-4"
              />
            </div>
          </div>
          <div className="w-full flex justify-around">
            <div className="mx-1">
              <h1 className="xl:mr-24  font-bold">
                {intl.formatMessage({
                  id: 'create.client.page.district.field.label',
                })}
              </h1>
              <Input
                className="p-2 border-slate-500 bg-neutral-300 mb-4"
                value={district}
                onChange={e => setDistrict(e.target.value)}
                readOnly={true}
                disabled
              />
            </div>
            <div className="mx-1">
              <h1 className="xl:mr-24  font-bold">
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
              <h1 className="xl:mr-24  font-bold">
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
        <div className="flex justify-between">
          <Button className="" onClick={closeModal} type="default">
            Fechar
          </Button>
          <Button type="default">
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
