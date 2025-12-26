import { useEffect, useState } from 'react'

import { getLoggedUser } from '@/core/config/user-store'

type TLoggedUser = {
  id: string
  email: string
}

export const useLoggedUser = () => {
  const [loggedUser, setLoggedUser] = useState<TLoggedUser | null>(
    getLoggedUser()
  )

  useEffect(() => {
    const checkUser = () => {
      const user = getLoggedUser()
      setLoggedUser(user)
    }

    checkUser()

    const interval = setInterval(checkUser, 100)

    return () => clearInterval(interval)
  }, [])

  return loggedUser
}
