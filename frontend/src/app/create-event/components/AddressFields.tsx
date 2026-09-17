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

  estimatedAudience: string
  onEstimatedAudienceChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onEstimatedAudienceBlur: () => void
  estimatedAudienceError: string
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
  estimatedAudience,
  onEstimatedAudienceChange,
  onEstimatedAudienceBlur,
  estimatedAudienceError,
}: AddressFieldsProps) {
  return (
    <>
      <h1 className="text-3xl font-bold text-left text-primary">Endereço</h1>

      <div className="xl:flex">
        <div className="flex flex-col">
          <div className="flex items-center w-56 relative mb-4">
            <div className="flex flex-col">
              <label className="font-bold">CEP</label>
              <Input
                value={zipCode}
                onChange={onZipCodeChange}
                onBlur={onZipCodeBlur}
                maxLength={9}
                placeholder="Digite o CEP"
                className={`p-2 mb-4 border rounded w-full ${zipCodeError ? 'border-red-500' : 'border-slate-300'}`}
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
            </div>
            <SearchIcon
              className="p-2 h-12 w-12 cursor-pointer mt-3"
              onClick={onSearchClick}
            />
          </div>
          <div className="flex flex-col mr-3 mb-4 relative">
            <label className="font-bold">Endereço</label>
            <Input
              value={addressName}
              onChange={e => onAddressNameChange(e.target.value)}
              placeholder="Digite o endereço"
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
          <div className="flex flex-col w-40 mr-3 relative mb-4">
            <label className="font-bold ">Número</label>
            <Input
              value={addressNumber}
              onChange={e => onAddressNumberChange(e.target.value)}
              onBlur={onAddressNumberBlur}
              placeholder="Número"
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
          <div className="flex flex-col w-48 mr-3">
            <label className="font-bold">Complemento</label>
            <Input
              value={addressComplement}
              onChange={e => onAddressComplementChange(e.target.value)}
              placeholder="Digite o complemento"
              className="p-2 border-slate-300 bg-white mb-4"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col ">
            <div className="flex flex-col relative mb-4">
              <label className="font-bold">Bairro</label>
              <Input
                value={district}
                onChange={e => onDistrictChange(e.target.value)}
                placeholder="Digite o bairro"
                className={`p-2 mb-4 border rounded w-full ${districtError ? 'border-red-500' : 'border-slate-300'}`}
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
                    marginTop: -15,
                  }}
                >
                  {districtError}
                </div>
              )}
            </div>
            <div className="flex flex-col  relative mb-4">
              <label className="font-bold">Cidade</label>
              <Input
                value={city}
                onChange={e => onCityChange(e.target.value)}
                placeholder="Digite a Cidade"
                className={`p-2 mb-4 border rounded w-full ${cityError ? 'border-red-500' : 'border-slate-300'}`}
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
                    marginTop: -15,
                  }}
                >
                  {cityError}
                </div>
              )}
            </div>
            <div className="flex flex-col relative ">
              <label className="font-bold">Estado</label>
              <Input
                value={state}
                onChange={e => onStateChange(e.target.value)}
                placeholder="Digite o Estado"
                className={`p-2 mb-4 border rounded w-full ${stateError ? 'border-red-500' : 'border-slate-300'}`}
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
          <div className="flex flex-col relative">
            <label className="font-bold">Público</label>
            <Input
              value={estimatedAudience}
              onChange={onEstimatedAudienceChange}
              onBlur={onEstimatedAudienceBlur}
              placeholder="Público estimado"
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
        </div>
      </div>
    </>
  )
}
