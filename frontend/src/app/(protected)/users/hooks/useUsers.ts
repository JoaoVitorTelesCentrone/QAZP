import { useState, useEffect, useCallback, useRef } from 'react'
import { getActiveUsers } from '../services/userService'
import { UserApi } from '../mappers/userMapper'

export const useUsers = () => {
  const [users, setUsers] = useState<UserApi[]>([])
  const [loading, setLoading] = useState(true)
  const isFetching = useRef(false)

  const fetchUsers = useCallback(async () => {
    if (isFetching.current) return
    isFetching.current = true
    setLoading(true)
    try {
      const data = await getActiveUsers()
      setUsers(data.filter((u: any) => !u.isDeleted))
    } catch (err) {
      console.error(err)
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