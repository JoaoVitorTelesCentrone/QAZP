import { useState } from 'react';

interface ValidatedInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
  readonly?:boolean;
  disabled?:boolean;
  type?: string;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  required = false,

}) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = () => {
    setIsTouched(true);
  };

  const isValid = required ? value.trim().length > 0 : true;

  return (
    <div className="mb-4 relative w-[100%]">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        className={`p-2 border rounded w-full ${
          !isValid && isTouched ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder={placeholder}
      />
      {!isValid && isTouched && (
        <span className="text-red-500 text-sm absolute -bottom-5 left-0">
          Campo obrigatório
        </span>
      )}
    </div>
  );
};

export default ValidatedInput;
