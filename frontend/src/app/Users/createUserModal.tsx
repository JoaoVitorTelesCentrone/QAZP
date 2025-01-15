import { Button, Input, Modal } from 'antd'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useAtom } from 'jotai'

import { redirect } from 'next/navigation'
import { authAtom } from '../atoms/authAtom'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { userChangeAtom } from '../atoms/changeUserAtom'

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
  const [nameError, setNameError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmedPasswordError, setConfirmPasswordError] = useState('')

  if (!isLogged) {
    redirect('/')
  }

  const handleBlur = (fieldName: keyof typeof fieldErrorMap) => {
    const fieldErrorMap = {
      name: {
        value: name,
        setError: setNameError,
      },
      username: {
        value: username,
        setError: setUsernameError,
      },
      password: {
        value: password,
        setError: setPasswordError,
      },
      confirmedPassword: {
        value: confirmedPassword,
        setError: setConfirmPasswordError,
      },
    }

    const field = fieldErrorMap[fieldName]

    if (!field.value) {
      field.setError('Campo obrigatório *')
    } else {
      field.setError('')
    }
  }

  async function verifyCreation() {
    const fieldsToValidate = [
      { value: name, errorSetter: setNameError },
      { value: username, errorSetter: setUsernameError },
      { value: password, errorSetter: setPasswordError },
      { value: confirmedPassword, errorSetter: setConfirmPasswordError },
    ]

    let isValid = true

    fieldsToValidate.forEach(({ value, errorSetter }) => {
      if (!value) {
        errorSetter('Campo obrigatório *')
        isValid = false
      } else {
        errorSetter('')
      }
    })

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
        open={isVisible}
        onCancel={onClose}
        footer={[]}
      >
        <div className="">
          <form className="">
            <div className="mx-auto relative">
              <h1>Nome</h1>
              <Input
                onChange={e => setName(e.target.value)}
                onBlur={() => handleBlur('name')}
                required
                placeholder="Digite o nome completo"
                className={`p-2 mb-4 border rounded w-full ${nameError ? 'border-red-500' : 'border-slate-300'}`}
                value={name}
              />
              {nameError && (
                <div
                  style={{
                    color: 'red',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: -15,
                  }}
                >
                  {nameError}
                </div>
              )}
            </div>
            <div className="mx-auto w-full mt-6 relative">
              <h1>Usuário</h1>
              <Input
                onChange={e => setUsername(e.target.value)}
                onBlur={() => handleBlur('username')}
                required
                placeholder="Digite o nome do usuário"
                className={`p-2 mb-4 border rounded w-full ${usernameError ? 'border-red-500' : 'border-slate-300'}`}
                value={username}
              />
              {usernameError && (
                <div
                  style={{
                    color: 'red',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: -15,
                  }}
                >
                  {usernameError}
                </div>
              )}
            </div>

            <div className="mx-auto mt-6 w-full relative">
              <h1>Senha</h1>
              <div className="flex items-center">
                <Input
                  type={showPassword1 ? 'text' : 'password'}
                  onChange={e => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  required
                  placeholder="Digite a senha"
                  className={`p-2 mb-4 border rounded w-full ${passwordError ? 'border-red-500' : 'border-slate-300'}`}
                  value={password}
                />
                {passwordError && (
                  <div
                    style={{
                      color: 'red',
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: -15,
                    }}
                  >
                    {passwordError}
                  </div>
                )}
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
                <Input
                  type={showPassword2 ? 'text' : 'password'}
                  onChange={e => setConfirmPassword(e.target.value)}
                  onBlur={() => handleBlur('confirmedPassword')}
                  required
                  placeholder="Confirme a senha"
                  className={`p-2 mb-4 border rounded w-full ${confirmedPasswordError ? 'border-red-500' : 'border-slate-300'}`}
                  value={confirmedPassword}
                />
                {confirmedPasswordError && (
                  <div
                    style={{
                      color: 'red',
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: -15,
                    }}
                  >
                    {confirmedPasswordError}
                  </div>
                )}
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
