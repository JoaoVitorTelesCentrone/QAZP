'use client'

import { Input, Button, Modal } from 'antd'
import ClipLoader from 'react-spinners/ClipLoader'
import { Toaster } from 'sonner'
import { intl } from '@/i18n'
import { Eye, EyeOff } from 'lucide-react'
import Loader from '../Loader'
import { useLoginModal } from './hooks/useLoginModal'

interface LoginModalProps {
  isVisible: boolean
  onClose: () => void
  onCancel: () => void
}

export default function LoginModal({ isVisible, onClose, onCancel }: LoginModalProps) {
  const {
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
  } = useLoginModal(isVisible, onClose)

  if (fullScreenLoading) return <Loader />

  return (
    <>
      <Toaster richColors />
      <Modal
        open={isVisible}
        onCancel={onCancel}
        footer={null}
        title={intl.formatMessage({ id: 'login.page.title' })}
        centered
        closable={!loading}
        maskClosable={!loading}
        keyboard={!loading}
      >
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
