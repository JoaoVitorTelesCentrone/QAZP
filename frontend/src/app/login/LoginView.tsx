'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { Input } from '@/components/ui/input'
import ClipLoader from 'react-spinners/ClipLoader'
import { intl } from '@/i18n'

interface Props {
  loading: boolean
  username: string
  password: string
  onUsernameChange: (v: string) => void
  onPasswordChange: (v: string) => void
  onSubmit: () => void
}

export default function LoginView({
  loading,
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}: Props) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#123abc" />
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="flex flex-col mx-auto py-14 bg-primary h-screen">
        <h1 className="mx-auto text-5xl text-secondary-foreground my-8 font-bold uppercase">
          {intl.formatMessage({ id: 'login.page.title' })}
        </h1>

        <form
          onSubmit={e => {
            e.preventDefault()
            onSubmit()
          }}
          className="flex flex-col mx-auto rounded-xl bg-slate-400 p-6 bg-opacity-20 shadow-md"
        >
          <label className="text-white font-bold">
            {intl.formatMessage({ id: 'login.page.user.field.label' })}
          </label>
          <Input
            value={username}
            onChange={e => onUsernameChange(e.target.value)}
            placeholder={intl.formatMessage({
              id: 'login.page.user.field.placeholder',
            })}
          />

          <label className="text-white font-bold mt-4">
            {intl.formatMessage({ id: 'login.page.password.field.label' })}
          </label>
          <Input
            type="password"
            value={password}
            onChange={e => onPasswordChange(e.target.value)}
            placeholder={intl.formatMessage({
              id: 'login.page.password.field.placeholder',
            })}
          />

          <button
            className="bg-primary text-secondary rounded-xl px-6 py-3 mt-6"
            type="submit"
          >
            {intl.formatMessage({
              id: 'login.page.enter.button.label',
            })}
          </button>
        </form>
      </div>
      <Footer />
    </>
  )
}