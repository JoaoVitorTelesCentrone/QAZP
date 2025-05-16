'use client'

import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { useRouter } from 'next/navigation'
import { Input } from 'antd'
import axios from 'axios'
import { Toaster, toast } from 'sonner'
import ClipLoader from 'react-spinners/ClipLoader'
import { useState, useEffect } from 'react'
import { Modal, Button } from 'antd'
import { intl } from '@/i18n'
import { Eye, EyeOff } from 'lucide-react'

const API_URL = 'http://localhost:5196/api/User/login'

const LoginModal = ({
  isVisible,
  onClose,
  onCancel,
}: {
  isVisible: boolean
  onClose: () => void
  onCancel: () => void
}) => {
  const router = useRouter()
  const [userAuth, setUserAuth] = useAtom(authAtom)
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword1] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    }
  }, [router])

  const handleBlur = (fieldName: keyof typeof fieldErrorMap) => {
    const fieldErrorMap = {
      name: {
        value: username,
        setError: setUsernameError,
      },
      password: {
        value: password,
        setError: setPasswordError,
      },
    }

    const field = fieldErrorMap[fieldName]

    if (!field.value) {
      field.setError(`${intl.formatMessage({
        id: 'required.field.error.message',
      })}`)
    } else {
      field.setError('')
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldsToValidate = [
      { value: username, errorSetter: setUsernameError },
      { value: password, errorSetter: setPasswordError },
    ];

    let isValid = true;

    fieldsToValidate.forEach(({ value, errorSetter }) => {
      if (!value) {
        errorSetter(`${intl.formatMessage({
          id: 'required.field.error.message',
        })}`);
        isValid = false;
      } else {
        errorSetter('');
      }
    });

    if (isValid) {
      verifyLogin();
    }
  };

  const verifyLogin = async () => {
    try {
      const response = await axios.post(API_URL, { username, password })

      if (response.status === 200) {
        const { token, name } = response.data
        localStorage.setItem('token', token)

        setUserAuth(true)
        setUserInfo({
          name: name,
          username: username,
          password: password,
        })
        toast.success(intl.formatMessage({ id: 'login.success.message' }, { name }))
        router.push('/dashboard')
        onClose()
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
      toast.error(`${intl.formatMessage({
        id: 'login.error.message',
      })}`)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }

  const changeState1 = () => {
    setShowPassword1(prevState => !prevState)
  }

  useEffect(() => {
    if (!isVisible) {
      setUsername('');
      setPassword('');
      setUsernameError('');
      setPasswordError('');
    }
  }, [isVisible]);

  return (
    <>
      <Toaster richColors />
      <Modal
        data-testid="login-modal"
        open={isVisible}
        onCancel={onCancel}
        footer={null}
        title={intl.formatMessage({ id: 'login.page.title' })}
        centered
      >
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <ClipLoader size={50} color={'#123abc'} loading={loading} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col p-6 relative">
            <label className="text-lg font-bold">
              {intl.formatMessage({
                id: 'login.page.user.field.label',
              })}
            </label>
            <div className="relative mb-4">
              <Input
                placeholder={intl.formatMessage({
                  id: 'login.page.user.field.placeholder',
                })}
                onChange={e => setUsername(e.target.value)}
                className={`p-2 mb-4 border rounded w-full ${usernameError ? 'border-red-500' : 'border-slate-300'}`}
                type="text"
                id="username"
                value={username}
                onBlur={() => handleBlur('name')}
                data-testid="username-loginInput-form"
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
            <div className="relative mb-4">
              <label className="text-lg font-bold" htmlFor="password">
                {intl.formatMessage({
                  id: 'login.page.password.field.label',
                })}
              </label>
              <Input
                data-testid="password-loginInput-form"
                placeholder={intl.formatMessage({
                  id: 'login.page.password.field.placeholder',
                })}
                type={showPassword ? 'text' : 'password'}
                onChange={e => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                className={`p-2 mb-4 border rounded w-full ${passwordError ? 'border-red-500' : 'border-slate-300'}`}
                id="password"
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
              <div className="absolute right-0 flex items-center px-3 -mt-12">
                {showPassword ? (
                  <EyeOff onClick={changeState1} className="cursor-pointer" />
                ) : (
                  <Eye onClick={changeState1} className="cursor-pointer" />
                )}
              </div>
            </div>
            <Button
              data-testid="enter-login-form-btn"
              className="bg-primary text-secondary w-full mt-4"
              htmlType="submit"
            >
              {intl.formatMessage({
                id: 'login.page.enter.button.label',
              })}
            </Button>
          </form>
        )}
      </Modal>
    </>
  )
}

export default LoginModal
