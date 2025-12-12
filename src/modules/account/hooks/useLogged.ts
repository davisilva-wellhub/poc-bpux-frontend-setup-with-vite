import { useAuth } from '@gympass/keycloak-auth-js'
import { useMemo } from 'react'

type TLoggedUser = {
  id: string
  email: string
}

export const useLoggedUser = () => {
  const { keycloak } = useAuth()

  const loggedUser = useMemo<TLoggedUser | null>(
    () =>
      !keycloak?.tokenParsed
        ? null
        : {
            id: keycloak.tokenParsed.uid as string,
            email: keycloak.tokenParsed.email as string,
          },
    [keycloak]
  )

  return loggedUser
}
