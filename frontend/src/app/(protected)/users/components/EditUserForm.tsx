'use client'
import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { updateUser } from '../services/userService'
import { UserApi, mapFormToApi } from '../mappers/userMapper'
import { toast } from 'sonner'
import axios from 'axios'
import { intl } from '@/i18n'

// Mirrors the backend rule applied when the password changes.
const MIN_PASSWORD_LENGTH = 6

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

  const passwordTooShort = password.length > 0 && password.length < MIN_PASSWORD_LENGTH

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordTooShort) return
    try {
      await updateUser(mapFormToApi({ ...userData, name, username, password }))
      onUpdated?.()
      closeModal()
    } catch (err) {
      console.error(err)
      const message = axios.isAxiosError(err) ? err.response?.data?.message : undefined
      toast.error(message ?? 'Erro ao atualizar usuário')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" required />
      <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuário" required />
      <div>
        <Input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Senha"
          type="password"
          required
          className={passwordTooShort ? 'border-red-500' : undefined}
        />
        {passwordTooShort && (
          <p className="mt-1 text-sm text-red-600">
            {intl.formatMessage({ id: 'create.user.password.min.length' })}
          </p>
        )}
      </div>
      <div className="flex gap-4">
        <Button type="submit" className="bg-primary text-white" disabled={passwordTooShort}>Salvar</Button>
        <Button onClick={closeModal} className="bg-gray-500 text-white">Fechar</Button>
      </div>
    </form>
  )
}

export default EditUserForm
