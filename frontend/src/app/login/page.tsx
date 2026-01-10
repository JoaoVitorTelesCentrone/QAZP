'use client'

import { Toaster } from 'sonner'
import LoginView from './LoginView'
import { useLogin } from './hooks/useLogin'

export default function LoginPage() {
  const login = useLogin()

  return (
    <>
      <Toaster richColors />
      <LoginView
        loading={login.loading}
        username={login.username}
        password={login.password}
        onUsernameChange={login.setUsername}
        onPasswordChange={login.setPassword}
        onSubmit={login.handleLogin}
      />
    </>
  )
}