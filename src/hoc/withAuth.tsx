import { useAuth, useRequiredAuthentication } from '@gympass/keycloak-auth-js'
import type { ComponentType, JSX } from 'react'

import { setAuthToken } from '@/core/config/auth-token-store'

export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const WithAuthComponent = (props: P): JSX.Element | null => {
    useRequiredAuthentication()

    const { initialized, keycloak } = useAuth()

    if (!initialized) {
      setAuthToken(null)
      return null
    }

    if (!keycloak?.token) {
      setAuthToken(null)
      return null
    }

    setAuthToken(keycloak.token)

    return <Component {...props} />
  }

  return WithAuthComponent
}
