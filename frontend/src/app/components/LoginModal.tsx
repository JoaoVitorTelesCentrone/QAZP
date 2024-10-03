'use client'

import { useState } from 'react'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Toaster, toast } from 'sonner'
import ClipLoader from 'react-spinners/ClipLoader'
import { Modal, Button } from 'antd'

const LoginPage = ({
  isModalVisible,
  setIsModalVisible,
}: {
  isModalVisible: boolean
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const router = useRouter()
  const [userAuth, setUserAuth] = useAtom(authAtom)
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const API_URL = 'http://localhost:5196/api/User/login'

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const verifyLogin = async () => {
    setLoading(true)
    try {
      const response = await axios.post(API_URL, { username, password }) 
      if (response.status === 200) {
        const { name } = response.data
        setUserAuth(true)
        setUserInfo({
          name: name, 
          username: username,
          password: password,
        })
        setIsModalVisible(false)
        toast.success(`Bem-vindo ${username}`)
        router.push('/dashboard')

      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error)
      toast.error('Usuário ou senha incorretos')
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await verifyLogin()
  }

  return (
    <div>
      <Toaster richColors />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={'#123abc'} loading={loading} />
        </div>
      ) : (
        <Modal
          title="Faça seu login"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <form onSubmit={handleSubmit}>
            <label className="text-lg font-bold">Usuário</label>
            <Input
              placeholder="Digite o usuário"
              onChange={e => setUsername(e.target.value)}
              className="p-2 bg-white border-slate-500 mb-8"
              type="text"
              id="email"
            />

            <label className="text-lg font-bold" htmlFor="password">
              Senha
            </label>
            <Input
              placeholder="Digite a senha"
              onChange={e => setPassword(e.target.value)}
              className="p-2 border-slate-500 bg-white mb-8"
              type="password"
              id="password"
            />

            <div className="flex flex-col">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-primary text-secondary rounded-xl px-6 py-3 max-w-[150px] mx-auto"
              >
                Entrar
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default LoginPage
