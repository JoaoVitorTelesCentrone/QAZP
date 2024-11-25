import { intl } from '@/i18n'
import { useState } from 'react'

interface ValidatedInputProps {
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  required?: boolean
  className?: string
  readonly?: boolean
  disabled?: boolean
  type?: string
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  required = false,
  type = 'text',
}) => {
  const [isTouched, setIsTouched] = useState(false)

  const handleBlur = () => {
    setIsTouched(true)
  }

  const isValid = required ? String(value).trim().length > 0 : true

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (type === 'number') {
      onChange(inputValue)
    } else {
      onChange(inputValue)
    }
  }

  return (
    <div className="mb-4 relative w-[100%]">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`p-2 border rounded w-full ${!isValid && isTouched ? 'border-red-500' : 'border-gray-300'
          }`}
        placeholder={placeholder}
      />
      {!isValid && isTouched && (
        <span className="text-red-500 text-sm absolute -bottom-5 left-0">
          {intl.formatMessage({
            id: 'required.field.error.message',
          })}
        </span>
      )}
    </div>
  )
}

export default ValidatedInput
