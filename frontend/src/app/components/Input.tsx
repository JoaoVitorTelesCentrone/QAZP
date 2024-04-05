import { TextField } from '@mui/material'
import React from 'react'

interface InputProps {
    value: string
    type: string
}

const Input:  React.FC<InputProps> = ({value, type}) => {
  return (
    <div>
        <p>{value}</p>
        <TextField
        className='rounded-xl'
          required
          id={value}
          defaultValue={`Digite ${value}`}
          type={type}
        />
    </div>
  )
}

export default Input