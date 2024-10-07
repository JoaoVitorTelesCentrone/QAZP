
import { Button, Modal } from 'antd'
import axios from 'axios'
import {  Eye, EyeOff } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useAtom } from 'jotai'

import { redirect } from 'next/navigation'
import { authAtom } from '../atoms/authAtom'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { userChangeAtom } from '../atoms/changeUserAtom'
import ValidatedInput from '../components/ValidatedInput'

export type createUserProps = {
  isVisible: boolean
  onClose: () => void
}

const CreateUserModal: React.FC<createUserProps> = ({ isVisible, onClose }) => {
  const [isLogged, setIsLogged] = useAtom(authAtom)
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(false)
  const [createUser, setCreateUser] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [different, setDifferent] = useState(false)
  const [change, setChange] = useAtom(userChangeAtom)

  if (!isLogged) {
    redirect('/')
  }

  async function verifyCreation() {
    const data = {
      name,
      username,
      password,
      role: 0,
    }
    try {
      const response = await axios.post('http://localhost:5196/api/User', data)
      const userData = response.data
      if (response.status === 201) {
        toast.success('Usuário criado')
        onClose()
        setChange(prev => prev + 1)
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
      toast.error('Esse usuário já existe!')
      setError(true)
    }
  }

  const changeState1 = () => {
    setShowPassword1(prevState => !prevState)
  }

  const changeState2 = () => {
    setShowPassword2(prevState => !prevState)
  }

  useEffect(() => {
    if (password !== confirmedPassword) {
      setDifferent(true)
    } else {
      setDifferent(false)
    }
  }, [confirmedPassword])

  return (
    <div>
      <Modal
        title="Criar Usuário"
        visible={isVisible}
        onCancel={onClose} // Close the modal when "X" is clicked
        footer={[]}
      >
        <div className="">
          <form className="">
            <div className="mx-auto">
              <h1>Nome</h1>
              <ValidatedInput
                onChange={setName}
                required
                placeholder="Digite o nome completo"
                className="bg-white border-slate-500 border rounded w-full"
                value={name}
              />
            </div>

            <div className="mx-auto w-full mt-6">
              <h1>Usuário</h1>
              <ValidatedInput
                onChange={setUsername}
                required
                placeholder="Digite o nome do usuário"
                className="bg-white border-slate-500 mx-auto border rounded w-full "
                value={username}
              />
            </div>

            <div className="relative mx-auto mt-6 w-full">
              <h1>Senha</h1>
              <div className="flex items-center">
                <ValidatedInput
                  type={showPassword1 ? 'text' : 'password'}
                  onChange={setPassword}
                  required
                  placeholder="Digite a senha"
                  className="bg-white border-slate-500 pr-12 my-2"
                  value={password}
                />
                <div className="absolute right-0 flex items-center px-3 -mt-3">
                  {showPassword1 ? (
                    <EyeOff onClick={changeState1} className="cursor-pointer" />
                  ) : (
                    <Eye onClick={changeState1} className="cursor-pointer" />
                  )}
                </div>
              </div>
            </div>

            <div className="relative mx-auto mt-3 w-full mb-4">
              <h1>Confirme a senha</h1>
              <div className="flex items-center">
                <ValidatedInput
                  type={showPassword2 ? 'text' : 'password'}
                  onChange={setConfirmPassword}
                  required
                  placeholder="Confirme a senha"
                  className="bg-white border-slate-500 pr-12"
                  value={confirmedPassword}
                />
                <div className="absolute right-0 flex items-center px-3 -mt-3">
                  {showPassword2 ? (
                    <EyeOff onClick={changeState2} className="cursor-pointer" />
                  ) : (
                    <Eye onClick={changeState2} className="cursor-pointer" />
                  )}
                </div>
              </div>
            </div>

            {different && (
              <h1 className="text-red-700 font-bold">
                As senhas são diferentes
              </h1>
            )}
            <div className="flex justify-end mt-3">
              <Button
                className="bg-primary text-white w-[30%]"
                onClick={() => verifyCreation()}
              >
                Criar usuário
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default CreateUserModal
