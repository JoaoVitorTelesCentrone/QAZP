import { TextField } from '@mui/material'
import React from 'react'

interface InputProps {
    value: string
}

const Input:  React.FC<InputProps> = ({value}) => {
  return (
    <div>
        <p>{value}</p>
        <TextField
        className='rounded-xl'
          required
          id={value}
          defaultValue={`Digite ${value}`}
        />
    </div>
  )
}

export default Input