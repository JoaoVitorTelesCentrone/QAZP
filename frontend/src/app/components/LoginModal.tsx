'use client'

import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { useRouter } from 'next/navigation'
import { Input, Button, Modal } from 'antd'
import ClipLoader from 'react-spinners/ClipLoader'
import { useState, useEffect } from 'react'
import { Toaster, toast } from 'sonner'
import axios from 'axios'
import { intl } from '@/i18n'
import { Eye, EyeOff } from 'lucide-react'
import Loader from './Loader'

const API_URL = 'http://localhost:5196/api/User/login'

interface LoginModalProps {
  isVisible: boolean
  onClose: () => void
  onCancel: () => void
}

export default function LoginModal({ isVisible, onClose, onCancel }: LoginModalProps) {
  const router = useRouter()
  const [userAuth, setUserAuth] = useAtom(authAtom)
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [fullScreenLoading, setFullScreenLoading] = useState(false)

  const handleBlur = (fieldName: 'username' | 'password') => {
    if (fieldName === 'username') {
      setUsernameError(username ? '' : intl.formatMessage({ id: 'required.field.error.message' }))
    } else {
      setPasswordError(password ? '' : intl.formatMessage({ id: 'required.field.error.message' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let valid = true
    if (!username) { setUsernameError(intl.formatMessage({ id: 'required.field.error.message' })); valid = false }
    if (!password) { setPasswordError(intl.formatMessage({ id: 'required.field.error.message' })); valid = false }

    if (!valid) return

    try {
      setLoading(true)
      const response = await axios.post(API_URL, { username, password })
      if (response.status === 200) {
        const { token, name } = response.data
        localStorage.setItem('token', token)
        setUserAuth(true)
        setUserInfo({ name, username, password })
        toast.success(intl.formatMessage({ id: 'login.success.message' }, { name }))

        // Mostra loader full screen antes de redirecionar
        onClose()
        setFullScreenLoading(true)

        setTimeout(() => {
          router.push('/dashboard')
        }, 100) // garante que loader seja renderizado
      }
    } catch (error) {
      console.error(error)
      toast.error(intl.formatMessage({ id: 'login.error.message' }))
    } finally {
      setLoading(false)
    }
  }

  const toggleShowPassword = () => setShowPassword(prev => !prev)

  useEffect(() => {
    if (!isVisible) {
      setUsername('')
      setPassword('')
      setUsernameError('')
      setPasswordError('')
    }
  }, [isVisible])

  if (fullScreenLoading) return <Loader /> // loader full screen


  return (
    <>
      <Toaster richColors />
      <Modal open={isVisible} onCancel={onCancel} footer={null} title={intl.formatMessage({ id: 'login.page.title' })} centered>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <ClipLoader size={50} color="#123abc" loading={loading} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col p-6 relative">
            <label className="text-lg font-bold">{intl.formatMessage({ id: 'login.page.user.field.label' })}</label>
            <div className="relative mb-4">
              <Input
                placeholder={intl.formatMessage({ id: 'login.page.user.field.placeholder' })}
                onChange={e => setUsername(e.target.value)}
                className={`p-2 mb-4 border rounded w-full ${usernameError ? 'border-red-500' : 'border-slate-300'}`}
                value={username}
                onBlur={() => handleBlur('username')}
              />
              {usernameError && <div style={{ color: 'red', position: 'absolute', top: '100%', left: 0, marginTop: -15 }}>{usernameError}</div>}
            </div>
            <label className="text-lg font-bold">{intl.formatMessage({ id: 'login.page.password.field.label' })}</label>
            <div className="relative mb-4">
              <Input
                placeholder={intl.formatMessage({ id: 'login.page.password.field.placeholder' })}
                type={showPassword ? 'text' : 'password'}
                onChange={e => setPassword(e.target.value)}
                className={`p-2 mb-4 border rounded w-full ${passwordError ? 'border-red-500' : 'border-slate-300'}`}
                value={password}
                onBlur={() => handleBlur('password')}
              />
              {passwordError && <div style={{ color: 'red', position: 'absolute', top: '100%', left: 0, marginTop: -15 }}>{passwordError}</div>}
              <div className="absolute right-0 flex items-center px-3 -mt-12 cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>
            <Button htmlType="submit" className="bg-primary text-secondary w-full mt-4">
              {intl.formatMessage({ id: 'login.page.enter.button.label' })}
            </Button>
          </form>
        )}
      </Modal>
    </>
  )
}
