'use client'
import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { updateUser } from '../services/userService'
import { UserApi, mapFormToApi } from '../mappers/userMapper'

interface EditUserFormProps {
  userData: UserApi
  closeModal: () => void
  onUpdated?: () => void
}

const EditUserForm: React.FC<EditUserFormProps> = ({ userData, closeModal, onUpdated }) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setName(userData.name)
    setUsername(userData.username)
    setPassword(userData.password || '')
  }, [userData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateUser(mapFormToApi({ ...userData, name, username, password }))
      onUpdated?.()
      closeModal()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" required />
      <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuário" required />
      <Input value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" type="password" required />
      <div className="flex gap-4">
        <Button type="submit" className="bg-primary text-white">Salvar</Button>
        <Button onClick={closeModal} className="bg-gray-500 text-white">Fechar</Button>
      </div>
    </form>
  )
}

export default EditUserForm
