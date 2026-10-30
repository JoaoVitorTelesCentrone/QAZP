import { useState, useEffect, useCallback, useRef } from 'react'
import { getActiveUsers } from '../services/userService'
import { UserApi } from '../mappers/userMapper'
import { logUnexpectedError } from '@/lib/apiClient'

export const useUsers = () => {
  const [users, setUsers] = useState<UserApi[]>([])
  const [loading, setLoading] = useState(true)
  const isFetching = useRef(false)

  // `loading` only covers the first load; refetches update the table in place so it
  // doesn't unmount (and lose its filters) behind the full-page spinner.
  const fetchUsers = useCallback(async () => {
    if (isFetching.current) return
    isFetching.current = true
    try {
      const data = await getActiveUsers()
      setUsers(data.filter((u: any) => !u.isDeleted))
    } catch (err) {
      logUnexpectedError(err)
    } finally {
      setLoading(false)
      isFetching.current = false
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return { users, setUsers, loading, fetchUsers }
}