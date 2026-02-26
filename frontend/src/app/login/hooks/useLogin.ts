'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAtom } from 'jotai'
import { authAtom } from '../../atoms/authAtom'
import { userInfoAtom } from '../../atoms/userInfoAtom'
import { login } from '../services/auth.service'
import { toast } from 'sonner'

export function useLogin() {
  const router = useRouter()
  const [, setUserAuth] = useAtom(authAtom)
  const [, setUserInfo] = useAtom(userInfoAtom)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.replace('/dashboard')
    }
  }, [router])

  async function handleLogin() {
    setLoading(true)
    try {
      const { token, name } = await login(username, password)

      localStorage.setItem('token', token)
      setUserAuth(true)
      setUserInfo({ name, username })

      toast.success(`Bem-vindo ${username}`)
      router.replace('/dashboard')
    } catch {
      toast.error('Usuário ou senha incorretos')
    } finally {
      setLoading(false)
    }
  }

  return {
    username,
    password,
    loading,
    setUsername,
    setPassword,
    handleLogin,
  }
}