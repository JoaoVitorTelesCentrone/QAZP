export type LoginProps = {
  loading: boolean
  username: string
  password: string
  onUsernameChange: (v: string) => void
  onPasswordChange: (v: string) => void
  onSubmit: () => void
}