'use client'

import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/authAtom'
import { userInfoAtom } from '../atoms/userInfoAtom'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Toaster, toast } from 'sonner'
import ClipLoader from 'react-spinners/ClipLoader'
import { Modal, Button } from 'antd' // Import Ant Design Modal and Button

// Accept isModalVisible and setIsModalVisible as props
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
  const [logged, isLogged] = useState(false)
  const [loading, setLoading] = useState(false)

  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  async function verifyLogin(username: string, password: string) {
    try {
      setLoading(true)
      const response = await axios.get(
        `http://localhost:5196/api/User/${username}&${password}`,
      )
      const userName = response.data.name
      const userPassword = response.data.password
      if (response.status === 200) {
        isLogged(true)
        setError(false)
        setUserAuth(true)
        setUserInfo({
          name: userName,
          username: username,
          password: userPassword,
        })
        setLoading(false)
        toast.success(`Bem vindo ${username}`)
        setIsModalVisible(false) // Close modal on successful login
        await router.push('/dashboard')
      }
    } catch (error) {
      setLoading(false)
      console.error('Erro ao fazer a requisição:', error)
      toast.error('Usuário ou senha incorretos')
      setError(true)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await verifyLogin(username, password)
  }

  return (
    <div>
      <Toaster richColors />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={'#123abc'} loading={loading} />
        </div>
      ) : (
        <>
          <Modal
            title="Faça seu login"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null} // No default footer so we can customize buttons inside the form
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
                  loading={loading}
                >
                  Entrar
                </Button>
              </div>
            </form>
          </Modal>
        </>
      )}
    </div>
  )
}

export default LoginPage
