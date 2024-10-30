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

const API_URL = 'http://localhost:5196/api/User/login'

const LoginModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const router = useRouter()
  const [userAuth, setUserAuth] = useAtom(authAtom)
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    }
  }, [router])

  const verifyLogin = async () => {
    setLoading(true)
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
        toast.success(`Bem-vindo ${username}`)
        router.push('/dashboard')
        onClose()
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
      toast.error('Usuário ou senha incorretos')
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 4000)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    verifyLogin()
  }

  return (
    <>
      <Toaster richColors />
      <Modal
        visible={isVisible}
        onCancel={onClose}
        footer={null}
        title={intl.formatMessage({ id: 'login.page.title' })}
        centered
      >
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <ClipLoader size={50} color={'#123abc'} loading={loading} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col p-6">
            <label className="text-lg font-bold">
              {intl.formatMessage({
                id: 'login.page.user.field.label',
              })}
            </label>
            <Input
              placeholder={intl.formatMessage({
                id: 'login.page.user.field.placeholder',
              })}
              onChange={e => setUsername(e.target.value)}
              className="mb-4"
              type="text"
              id="username"
              required
            />
            <label className="text-lg font-bold" htmlFor="password">
              {intl.formatMessage({
                id: 'login.page.password.field.label',
              })}
            </label>
            <Input
              placeholder={intl.formatMessage({
                id: 'login.page.password.field.placeholder',
              })}
              onChange={e => setPassword(e.target.value)}
              className="mb-4"
              type="password"
              id="password"
              required
            />
            <Button
              data-testid="login-button"
              className="bg-primary text-secondary w-full"
              type="primary"
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
