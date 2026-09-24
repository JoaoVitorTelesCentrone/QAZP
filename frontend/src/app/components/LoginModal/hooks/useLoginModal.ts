'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAtom } from 'jotai'
import { toast } from 'sonner'
import { intl } from '@/i18n'
import { authAtom } from '@/app/atoms/authAtom'
import { userInfoAtom } from '@/app/atoms/userInfoAtom'
import { login } from '../services/loginService'
import { saveSession } from '@/lib/apiClient'

export function useLoginModal(isVisible: boolean, onClose: () => void) {
  const router = useRouter()
  const [, setUserAuth] = useAtom(authAtom)
  const [, setUserInfo] = useAtom(userInfoAtom)
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

    setLoading(true)
    try {
      const { token, refreshToken, name } = await login(username, password)
      saveSession(token, refreshToken)
      setUserAuth(true)
      setUserInfo({ name, username, password })
      toast.success(intl.formatMessage({ id: 'login.success.message' }, { name }))

      setFullScreenLoading(true)
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
      toast.error(intl.formatMessage({ id: 'login.error.message' }))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isVisible) {
      setUsername('')
      setPassword('')
      setUsernameError('')
      setPasswordError('')
    }
  }, [isVisible])

  return {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    usernameError,
    passwordError,
    showPassword,
    setShowPassword,
    fullScreenLoading,
    handleBlur,
    handleSubmit,
  }
}
