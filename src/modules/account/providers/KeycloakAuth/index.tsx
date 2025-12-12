import { AuthProvider } from '@gympass/keycloak-auth-js'
import type { PropsWithChildren } from 'react'

export const KeycloakAuth = ({ children }: PropsWithChildren) => (
  <AuthProvider
    keycloakConfig={{
      url: import.meta.env.VITE_KEYCLOAK_URL,
      realm: import.meta.env.VITE_KEYCLOAK_REALM as string,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID as string,
    }}
    customOptions={{
      autoLogin: false,
      customKeycloakInitOptions: {
        responseMode: 'query',
        checkLoginIframe: false,
      },
    }}
  >
    {children}
  </AuthProvider>
)
