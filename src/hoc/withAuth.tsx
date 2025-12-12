import { useAuth, useRequiredAuthentication } from '@gympass/keycloak-auth-js'
import { setAuthToken } from '../core/config/auth-token-store'
import { ComponentType, JSX } from 'react'

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
