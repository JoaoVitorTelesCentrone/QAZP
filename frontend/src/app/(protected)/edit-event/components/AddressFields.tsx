'use client'

import { SearchIcon } from 'lucide-react'
import { Input } from 'antd'

type AddressFieldsProps = {
  zipCode: string
  onZipCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onZipCodeBlur: () => void
  zipCodeError: string
  onSearchClick: React.MouseEventHandler<SVGSVGElement>

  addressName: string
  onAddressNameChange: (value: string) => void
  addressNameError: string

  addressNumber: string
  onAddressNumberChange: (value: string) => void
  onAddressNumberBlur: () => void
  addressNumberError: string

  addressComplement: string
  onAddressComplementChange: (value: string) => void

  district: string
  onDistrictChange: (value: string) => void
  districtError: string

  city: string
  onCityChange: (value: string) => void
  cityError: string

  state: string
  onStateChange: (value: string) => void
  stateError: string
}

export default function AddressFields({
  zipCode,
  onZipCodeChange,
  onZipCodeBlur,
  zipCodeError,
  onSearchClick,
  addressName,
  onAddressNameChange,
  addressNameError,
  addressNumber,
  onAddressNumberChange,
  onAddressNumberBlur,
  addressNumberError,
  addressComplement,
  onAddressComplementChange,
  district,
  onDistrictChange,
  districtError,
  city,
  onCityChange,
  cityError,
  state,
  onStateChange,
  stateError,
}: AddressFieldsProps) {
  return (
    <>
      <h1 className="font-bold text-2xl mt-10 mb-2">Endereço</h1>

      <div className="flex sm:flex-col md:flex-col xl:flex-row w-full">
        <div className="xl:flex flex-col justify-around mb-8 mr-10">
          <div className="flex items-center w-72">
            <div className="relative flex flex-col mb-6 sm:w-[300px] md:w-[500px]">
              <label className="font-bold block mb-2">CEP</label>
              <Input
                value={zipCode}
                onChange={onZipCodeChange}
                onBlur={onZipCodeBlur}
                maxLength={9}
                placeholder="Digite o CEP"
                className={`p-2 mb-4 border rounded w-full ${addressNameError ? 'border-red-500' : 'border-slate-300'}`}
                required
              />
              {zipCodeError && (
                <div
                  style={{
                    color: 'red',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                  }}
                >
                  {zipCodeError}
                </div>
              )}
            </div>
            <SearchIcon
              className="h-12 w-12 cursor-pointer "
              onClick={onSearchClick}
            />
          </div>
          <div className="flex flex-col mb-8 mr-4 relative">
            <label className="font-bold block mb-2">Endereço</label>
            <Input
              value={addressName}
              onChange={e => onAddressNameChange(e.target.value)}
              placeholder="Digite a Rua"
              className={`p-2 mb-4 border rounded w-full ${addressNameError ? 'border-red-500' : 'border-slate-300'}`}
              disabled
              readOnly
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
          <div className="relative flex flex-col mr-10 mb-8">
            <label className="font-bold block mb-2">Número</label>
            <Input
              value={addressNumber}
              onChange={e => onAddressNumberChange(e.target.value)}
              onBlur={onAddressNumberBlur}
              placeholder="Número"
              className={`p-2 mb-4 border rounded w-full ${addressNameError ? 'border-red-500' : 'border-slate-300'}`}
            />
            {addressNumberError && (
              <div
                style={{
                  color: 'red',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                }}
              >
                {addressNumberError}
              </div>
            )}
          </div>
          <div className="flex flex-col ">
            <label className="font-bold block mb-2">Complemento</label>
            <Input
              value={addressComplement}
              onChange={e => onAddressComplementChange(e.target.value)}
              placeholder="Digite o complemento"
              className={`p-2 mb-4 border rounded w-full ${addressNameError ? 'border-red-500' : 'border-slate-300'}`}
            />
          </div>
        </div>

        <div className="flex flex-col ">
          <div className="flex flex-col relative mb-8">
            <label className="font-bold block mb-2">Bairro</label>
            <Input
              value={district}
              onChange={e => onDistrictChange(e.target.value)}
              placeholder="Digite o bairro"
              className={`p-2 mb-4 border rounded w-full ${addressNameError ? 'border-red-500' : 'border-slate-300'}`}
              disabled
              readOnly
            />
            {districtError && (
              <div
                style={{
                  color: 'red',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                }}
              >
                {districtError}
              </div>
            )}
          </div>
          <div className="flex flex-col flex-grow relative">
            <label className="font-bold block mb-2">Cidade</label>
            <Input
              value={city}
              onChange={e => onCityChange(e.target.value)}
              placeholder="Digite a Cidade"
              className={`p-2 mb-4 border rounded w-full ${addressNameError ? 'border-red-500' : 'border-slate-300'}`}
              disabled
              readOnly
            />
            {cityError && (
              <div
                style={{
                  color: 'red',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                }}
              >
                {cityError}
              </div>
            )}
          </div>
          <div className="flex flex-col flex-grow relative">
            <label className="font-bold block mb-2">Estado</label>
            <Input
              value={state}
              onChange={e => onStateChange(e.target.value)}
              placeholder="Digite o Estado"
              className={`p-2 mb-4 border rounded w-full ${addressNameError ? 'border-red-500' : 'border-slate-300'}`}
              disabled
              readOnly
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
        </div>
      </div>
    </>
  )
}
