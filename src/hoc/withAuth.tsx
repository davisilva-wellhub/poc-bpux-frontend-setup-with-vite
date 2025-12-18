import { useAuth, useRequiredAuthentication } from '@gympass/keycloak-auth-js'
import type { ComponentType, JSX } from 'react'

import { setAuthToken } from '@/core/config/auth-token-store'

export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const WithAuthComponent = (props: P): JSX.Element | null => {
    useRequiredAuthentication()

    const { initialized, keycloak } = useAuth()

    const token = keycloak?.token || null

    setAuthToken(token)

    if (!initialized || !token) return null

    return <Component {...props} />
  }

  return WithAuthComponent
}
