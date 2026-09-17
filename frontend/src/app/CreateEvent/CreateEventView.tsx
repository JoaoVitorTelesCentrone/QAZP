'use client'

import { Toaster } from 'sonner'
import UserSideMenu from '../components/UserHeader'
import EventTypeAndTitleFields from './components/EventTypeAndTitleFields'
import ClientFields from './components/ClientFields'
import AddressFields from './components/AddressFields'
import DateTimeFields from './components/DateTimeFields'
import MaterialsSection from './components/MaterialsSection'
import { useCreateEvent } from './hooks/useCreateEvent'

type CreateEventViewProps = ReturnType<typeof useCreateEvent>

export default function CreateEventView(props: CreateEventViewProps) {
  return (
    <div className="h-full bg-tertiary">
      <UserSideMenu />
      <Toaster richColors />
      <div className="h-full bg-tertiary">
        <form className="flex flex-col rounded-xl  border-gray-200 border-2 bg-gray-300 p-6 mr-10 mt-10 mx-auto ml-64 space-y-4">
          <h1 className="text-3xl font-bold text-left text-primary">
            Criar evento
          </h1>
          <h1 className="text-2xl font-bold text-left text-primary">
            Informações do Evento
          </h1>

          <EventTypeAndTitleFields
            selectedType={props.selectedType}
            isTypeValid={props.isTypeValid}
            isTouched={props.isTouched}
            setIsTouched={props.setIsTouched}
            onSelectEventType={props.getEventTypeNameAndIndex}
            eventName={props.eventName}
            onEventNameChange={props.setEventName}
            onEventNameBlur={() => props.handleBlur('eventName')}
            eventNameError={props.EventNameError}
          />

          <h1 className="text-2xl font-bold text-left text-primary">
            Informações do cliente
          </h1>
          <ClientFields
            clients={props.clients}
            clientName={props.clientName}
            clientDocument={props.clientDocument}
            clientEmail={props.clientEmail}
            clientNameError={props.clientNameError}
            isClientTouched={props.isClientTouched}
            setIsClientTouched={props.setIsClientTouched}
            setClientNameError={props.setClientNameError}
            clientDocumentError={props.clientDocumentError}
            onSelectClient={props.getClientValues}
            onClientDocumentChange={props.setClientDocument}
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
            estimatedAudience={props.estimatedAudience}
            onEstimatedAudienceChange={props.handleEstimatedAudienceChange}
            onEstimatedAudienceBlur={() => props.handleBlur('estimatedAudience')}
            estimatedAudienceError={props.estimatedAudienceError}
          />

          <DateTimeFields
            startDate={props.startDate}
            onStartDateChange={props.handleStartDateChange}
            startDateError={props.startDateError}
            isStartDateTouched={props.isStartDateTouched}
            setIsStartDateTouched={props.setIsStartDateTouched}
            startTime={props.startTime}
            onStartTimeChange={props.handleStartTimeChange}
            startTimeError={props.startTimeError}
            isStartTimeTouched={props.isStartTimeTouched}
            setIsStartTimeTouched={props.setIsStartTimeTouched}
            endDate={props.endDate}
            onEndDateChange={props.handleEndDateChange}
            endDateError={props.endDateError}
            isEndDateTouched={props.isEndDateTouched}
            setIsEndDateTouched={props.setIsEndDateTouched}
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
            materials={props.materials}
            onSelectMaterial={props.getMaterialValues}
            materialQnt={props.materialQnt}
            onMaterialQntChange={props.handleMaterialQuantityChange}
            onAddMaterial={props.handleAddMaterial}
            insertedMaterial={props.insertedMaterial}
            onRemoveMaterial={props.removeMaterial}
            totalAmountConverted={props.totalAmountConverted}
            onSubmit={props.postEvent}
          />
        </form>
      </div>
    </div>
  )
}
