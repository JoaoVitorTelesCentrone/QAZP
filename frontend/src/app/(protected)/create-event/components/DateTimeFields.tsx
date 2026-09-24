'use client'

import { Dayjs } from 'dayjs'
import { DatePicker, TimePicker } from 'antd'

type DateTimeFieldsProps = {
  startDate: Dayjs | null
  onStartDateChange: (date: Dayjs | null) => void
  startDateError: string
  isStartDateTouched: boolean
  setIsStartDateTouched: (touched: boolean) => void

  startTime: Dayjs | null
  onStartTimeChange: (time: Dayjs | null) => void
  startTimeError: string
  isStartTimeTouched: boolean
  setIsStartTimeTouched: (touched: boolean) => void

  endDate: Dayjs | null
  onEndDateChange: (date: Dayjs | null) => void
  endDateError: string
  isEndDateTouched: boolean
  setIsEndDateTouched: (touched: boolean) => void

  endTime: Dayjs | null
  onEndTimeChange: (time: Dayjs | null) => void
  endTimeError: string
  isEndTimeTouched: boolean
  setIsEndTimeTouched: (touched: boolean) => void
}

export default function DateTimeFields({
  startDate,
  onStartDateChange,
  startDateError,
  isStartDateTouched,
  setIsStartDateTouched,
  startTime,
  onStartTimeChange,
  startTimeError,
  isStartTimeTouched,
  setIsStartTimeTouched,
  endDate,
  onEndDateChange,
  endDateError,
  isEndDateTouched,
  setIsEndDateTouched,
  endTime,
  onEndTimeChange,
  endTimeError,
  isEndTimeTouched,
  setIsEndTimeTouched,
}: DateTimeFieldsProps) {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex flex-wrap gap-4">
        <div className="relative mb-6 flex flex-col w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[225px] xl:mr-8 2xl:w-[250px] 2xl:mr-10">
          <label className="font-bold">Data inicial</label>
          <DatePicker
            onChange={onStartDateChange}
            onBlur={() => {
              if (!isStartDateTouched) {
                setIsStartDateTouched(true)
              }
            }}
            onOpenChange={open => {
              if (open && !isStartDateTouched) {
                setIsStartDateTouched(true)
              }
            }}
            value={startDate}
            format="YYYY/MM/DD"
            size="large"
            className={`bg-white text-gray-600 border ${startDateError ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
            placeholder="Selecione uma data"
          />
          {startDateError && (
            <span
              className="text-red-500 text-sm mt-1"
              style={{ position: 'absolute', top: '100%', left: '0' }}
            >
              {startDateError}
            </span>
          )}
        </div>
        <div className="relative mb-6 flex flex-col w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[225px] xl:mr-8 2xl:w-[250px] 2xl:mr-10">
          <label className="font-bold">Horário inicial</label>
          <TimePicker
            onChange={onStartTimeChange}
            onBlur={() => {
              if (!isStartTimeTouched) {
                setIsStartTimeTouched(true)
              }
            }}
            onOpenChange={open => {
              if (open && !isStartTimeTouched) {
                setIsStartTimeTouched(true)
              }
            }}
            value={startTime}
            format="HH:mm"
            size="large"
            className={`bg-white text-gray-600 border ${startTimeError ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
            placeholder="Selecione um horário"
          />
          {startTimeError && (
            <span
              className="text-red-500 text-sm mt-1"
              style={{ position: 'absolute', top: '100%', left: '0' }}
            >
              {startTimeError}
            </span>
          )}
        </div>
        <div className="relative mb-6 flex flex-col w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[225px] xl:mr-8 2xl:w-[250px] 2xl:mr-10">
          <label className="font-bold">Data final</label>
          <DatePicker
            onChange={onEndDateChange}
            onBlur={() => {
              if (!isEndDateTouched) {
                setIsEndDateTouched(true)
              }
            }}
            onOpenChange={open => {
              if (open && !isEndDateTouched) {
                setIsEndDateTouched(true)
              }
            }}
            value={endDate}
            format="YYYY/MM/DD"
            size="large"
            className={`bg-white text-gray-600 border ${endDateError ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
            placeholder="Selecione uma data"
          />
          {endDateError && (
            <span
              className="text-red-500 text-sm mt-1"
              style={{ position: 'absolute', top: '100%', left: '0' }}
            >
              {endDateError}
            </span>
          )}
        </div>
        <div className="relative mb-6 flex flex-col w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[225px] 2xl:w-[250px]">
          <label className="font-bold">Horário final</label>
          <TimePicker
            onChange={onEndTimeChange}
            onBlur={() => {
              if (!isEndTimeTouched) {
                setIsEndTimeTouched(true)
              }
            }}
            onOpenChange={open => {
              if (open && !isEndTimeTouched) {
                setIsEndTimeTouched(true)
              }
            }}
            value={endTime}
            format="HH:mm"
            size="large"
            className={`bg-white text-gray-600 border ${endTimeError ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
            placeholder="Selecione um horário"
          />
          {endTimeError && (
            <span
              className="text-red-500 text-sm mt-1"
              style={{ position: 'absolute', top: '100%', left: '0' }}
            >
              {endTimeError}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
