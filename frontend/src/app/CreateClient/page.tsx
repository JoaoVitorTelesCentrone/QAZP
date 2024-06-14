'use client'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { authAtom } from '../atoms/authAtom'
import { redirect } from 'next/navigation'
import UserHeader from '../components/UserHeader'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'
import axios, { isAxiosError } from 'axios'
import { Toaster, toast } from 'sonner'
import { intl } from '../../i18n'

const CreateClientForm = () => {
  const [isLogged, setIsLogged] = useAtom(authAtom)
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
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

  const [loading, setLoading] = useState(false)

  if (!isLogged) {
    redirect('/login')
  }

  const handleSearchClick: React.MouseEventHandler<
    SVGSVGElement
  > = async event => {
    try {
      event.preventDefault()
      const response = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json/`,
      )

      console.log(response.data)
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
      console.log(response.status)
      if (response.status === 201) {
        console.log(response.data)
        console.log(data)
        toast.success('Cliente criado')
        redirect('/clients')
      }
      if (response.status === 409) {
        console.log(response.data)
        console.log(data)
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
      console.log(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createClient()
  }

  return (
    <div className="flex flex-col">
      <UserHeader />
      <Toaster richColors />
      <h1 className="mx-auto my-4 text-5xl font-bold text-center">
        {intl.formatMessage({ id: 'create.client.page.title' })}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-5 mb-8 flex-col flex mx-auto border-2 rounded-xl border-secondary-foreground shadow-lg shadow-slate-500 border-slate-200 bg-slate-600 bg-opacity-10 p-10 max-w-[500px]"
      >
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
              <Input
                onChange={e => setFullName(e.target.value)}
                className="p-2 border-slate-500 bg-white mb-4"
                placeholder={intl.formatMessage({
                  id: 'create.client.page.fullName.field.placeholder',
                })}
              />
            </div>
          </div>
          <div className="w-full justify-between flex">
            <div className="mr-2">
              <h1>
                {intl.formatMessage({
                  id: 'create.client.page.document.field.label',
                })}
              </h1>
              <Input
                onChange={e => setDocumentId(e.target.value)}
                className="p-2 border-slate-500 bg-white mb-4"
                placeholder={intl.formatMessage({
                  id: 'create.client.page.document.field.placeholder',
                })}
              />
            </div>
            <div>
              <h1>
                {intl.formatMessage({
                  id: 'create.client.page.phoneNumber.field.label',
                })}
              </h1>
              <Input
                onChange={e => setPhoneNumber(e.target.value)}
                className="p-2 border-slate-500 bg-white mb-4"
                placeholder={intl.formatMessage({
                  id: 'create.client.page.phoneNumber.field.placeholder',
                })}
              />
            </div>
          </div>
          <h1>
            {intl.formatMessage({ id: 'create.client.page.email.field.label' })}
          </h1>
          <Input
            type="email"
            onChange={e => setEmail(e.target.value)}
            className="p-2 border-slate-500 bg-white mb-4"
            placeholder={intl.formatMessage({
              id: 'create.client.page.email.field.placeholder',
            })}
          />
        </div>
        <h1 className="text-2xl font-bold my-2">
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
                <Input
                  className="p-2 border-slate-500 bg-white mb-4"
                  placeholder={intl.formatMessage({
                    id: 'create.client.page.zipCode.field.placeholder',
                  })}
                  value={zipCode}
                  onChange={e => setZipCode(e.target.value)}
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
                className="p-2 border-slate-500 bg-neutral-300 mb-4"
                value={addressName}
                onChange={e => setAddressName(e.target.value)}
                readOnly={true}
              />
            </div>
          </div>
          <div className="w-full flex justify-around">
            <div className="mx-1">
              <h1>
                {intl.formatMessage({
                  id: 'create.client.page.streetNumber.field.label',
                })}
              </h1>
              <Input
                onChange={e => setAddressNumber(e.target.value)}
                placeholder={intl.formatMessage({
                  id: 'create.client.page.streetNumber.field.placeholder',
                })}
                className="p-2 border-slate-500 bg-white mb-4"
              />
            </div>
            <div className="mx-1">
              <h1>
                {intl.formatMessage({
                  id: 'create.client.page.streetComplement.field.label',
                })}
              </h1>
              <Input
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
              <h1>
                {intl.formatMessage({
                  id: 'create.client.page.district.field.label',
                })}
              </h1>
              <Input
                className="p-2 border-slate-500 bg-neutral-300 mb-4"
                value={district}
                onChange={e => setDistrict(e.target.value)}
                readOnly={true}
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
              />
            </div>
          </div>
        </div>
        <Button variant="default">
          {intl.formatMessage({
            id: 'create.client.page.create.client.button',
          })}
        </Button>
      </form>
    </div>
  )
}

export default CreateClientForm
