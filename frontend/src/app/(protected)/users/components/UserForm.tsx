'use client'
import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { toast, Toaster } from 'sonner'
import { createUser } from '../services/userService'
import { mapFormToApi, UserFormData } from '../mappers/userMapper'

interface UserFormProps {
  closeModal: () => void
  onCreated?: () => void
  userData?: UserFormData
}

const UserForm: React.FC<UserFormProps> = ({ closeModal, onCreated, userData }) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [different, setDifferent] = useState(false)

  useEffect(() => {
    if (userData) {
      setName(userData.name || '')
      setUsername(userData.username || '')
    }
  }, [userData])

  useEffect(() => {
    setDifferent(password !== confirmPassword)
  }, [password, confirmPassword])

  const togglePassword1 = () => setShowPassword1(prev => !prev)
  const togglePassword2 = () => setShowPassword2(prev => !prev)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (different) {
      toast.error('As senhas não coincidem!')
      return
    }

    try {
      const newUser: UserFormData = { name, username, password }
      await createUser(mapFormToApi(newUser))
      toast.success('Usuário criado com sucesso!')
      onCreated?.()
      closeModal()
    } catch (err) {
      console.error(err)
      toast.error('Erro ao criar usuário')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Toaster richColors />
      <h1 className="text-xl font-bold uppercase">Criar usuário</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <p className="text-lg">Nome</p>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Digite o nome completo"
            required
          />
        </div>

        <div>
          <p className="text-lg">Usuário</p>
          <Input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Digite o nome do usuário"
            required
          />
        </div>

        <div>
          <p className="text-lg">Senha</p>
          <div className="flex items-center gap-2">
            <Input
              type={showPassword1 ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Digite a senha"
              required
            />
            {showPassword1 ? (
              <EyeOff onClick={togglePassword1} className="cursor-pointer" />
            ) : (
              <Eye onClick={togglePassword1} className="cursor-pointer" />
            )}
          </div>
        </div>

        <div>
          <p className="text-lg">Confirme a senha</p>
          <div className="flex items-center gap-2">
            <Input
              type={showPassword2 ? 'text' : 'password'}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirme a senha"
              required
            />
            {showPassword2 ? (
              <EyeOff onClick={togglePassword2} className="cursor-pointer" />
            ) : (
              <Eye onClick={togglePassword2} className="cursor-pointer" />
            )}
          </div>
        </div>

        {different && <h1 className="text-red-700 font-bold">As senhas não coincidem</h1>}

        <div className="flex">
          <Button type="submit" className="mx-4 bg-primary text-white">Criar usuário</Button>
          <Button type="button" onClick={closeModal} className="bg-gray-500 text-white">Fechar</Button>
        </div>
      </form>
    </div>
  )
}

export default UserForm