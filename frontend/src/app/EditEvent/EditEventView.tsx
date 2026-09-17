'use client'

import { Input } from 'antd'
import UserSideMenu from '@/app/components/UserHeader'
import EventDetailsFields from './components/EventDetailsFields'
import AddressFields from './components/AddressFields'
import DateTimeFields from './components/DateTimeFields'
import MaterialsSection from './components/MaterialsSection'
import { useEditEvent } from './hooks/useEditEvent'

type EditEventViewProps = ReturnType<typeof useEditEvent>

export default function EditEventView(props: EditEventViewProps) {
  const { name } = props

  return (
    <div>
      <UserSideMenu />
      <div className="ml-56 p-3 rounded-xl bg-gray-300 border-2 border-gray-200 mr-10 my-10">
        <h1 className="text-3xl font-bold">Editar evento {name}</h1>
        <div className="my-4">
          <EventDetailsFields
            name={props.name}
            onNameChange={props.setName}
            onNameBlur={() => props.handleBlur('name')}
            nameError={props.nameError}
            clientName={props.clientName}
            clients={props.clients}
            onSelectClient={props.getClientValues}
          />

          <AddressFields
            zipCode={props.zipCode}
            onZipCodeChange={props.handleZipCodeChange}
            onZipCodeBlur={() => props.handleBlur('zipCode')}
            zipCodeError={props.zipCodeError}
            onSearchClick={props.handleSearchClick}
            addressName={props.addressName}
            onAddressNameChange={props.setAddressName}
            addressNameError={props.addressNameError}
            addressNumber={props.addressNumber}
            onAddressNumberChange={props.setAddressNumber}
            onAddressNumberBlur={() => props.handleBlur('addressNumber')}
            addressNumberError={props.addressNumberError}
            addressComplement={props.addressComplement}
            onAddressComplementChange={props.setAddressComplement}
            district={props.district}
            onDistrictChange={props.setDistrict}
            districtError={props.districtError}
            city={props.city}
            onCityChange={props.setCity}
            cityError={props.cityError}
            state={props.state}
            onStateChange={props.setState}
            stateError={props.stateError}
          />

          <div className="flex flex-col mt-6 relative mb-8">
            <label className="font-bold mb-2 text-2xl ">Público estimado</label>
            <Input
              value={props.estimatedAudience}
              onChange={props.handleEstimatedAudienceChange}
              onBlur={() => props.handleBlur('estimatedAudience')}
              placeholder="Público estimado"
              className={`bg-white text-gray-600 border border-gray-300  h-[40px] w-full sm:w-[300px] md:w-[420px] ${props.estimatedAudienceError ? 'border-red-500' : 'border-slate-300'}`}
            />
            {props.estimatedAudienceError && (
              <div
                style={{
                  color: 'red',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                }}
              >
                {props.estimatedAudienceError}
              </div>
            )}
          </div>

          <DateTimeFields
            startDate={props.startDate}
            onStartDateChange={props.handleStartDateChange}
            startDateError={props.startDateError}
            isStartDateTouched={props.isStartDateTouched}
            setIsStartDateTouched={props.setIsStartDateTouched}
            endDate={props.endDate}
            onEndDateChange={props.handleEndDateChange}
            endDateError={props.endDateError}
            isEndDateTouched={props.isEndDateTouched}
            setIsEndDateTouched={props.setIsEndDateTouched}
            startTime={props.startTime}
            onStartTimeChange={props.handleStartTimeChange}
            startTimeError={props.startTimeError}
            isStartTimeTouched={props.isStartTimeTouched}
            setIsStartTimeTouched={props.setIsStartTimeTouched}
            endTime={props.endTime}
            onEndTimeChange={props.handleEndTimeChange}
            endTimeError={props.endTimeError}
            isEndTimeTouched={props.isEndTimeTouched}
            setIsEndTimeTouched={props.setIsEndTimeTouched}
          />

          <MaterialsSection
            selectedCategory={props.selectedCategory}
            onSelectCategory={props.getMaterialsByCategory}
            selectedMaterial={props.selectedMaterial}
            sMaterials={props.sMaterials}
            onSelectMaterial={props.getMaterialValues}
            materialQnt={props.materialQnt}
            onMaterialQntChange={props.handleMaterialQuantityChange}
            onAddMaterial={props.handleAddMaterial}
            materials={props.materials}
            onRemoveMaterial={props.removeMaterial}
            totalAmountConverted={props.totalAmountConverted}
            onUpdate={props.handleUpdate}
          />
        </div>
      </div>
    </div>
  )
}
