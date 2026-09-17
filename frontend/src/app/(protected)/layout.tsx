import UserSideMenu from '../components/UserHeader'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <UserSideMenu />
      {children}
    </>
  )
}
