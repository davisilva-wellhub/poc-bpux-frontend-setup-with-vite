import type { PropsWithChildren } from 'react'

import { KeycloakAuth } from '@/modules/account/providers/KeycloakAuth'

export const LocalAccountWrapper = ({ children }: PropsWithChildren) => (
  <KeycloakAuth>{children}</KeycloakAuth>
)
