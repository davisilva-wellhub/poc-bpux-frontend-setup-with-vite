import { wellhub } from '@gympass/tai-chi'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { render } from '@testing-library/react'
import { type ReactNode } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { BaseExposeWrapper } from '@/core/components/BaseWrapper'
import { KeycloakAuth } from '@/modules/account/providers/KeycloakAuth'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: 'en',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}))

vi.mock('@gympass/keycloak-auth-js', () => ({
  useAuth: () => ({
    keycloak: {
      authenticated: true,
      tokenParsed: {
        sub: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User',
      },
      token: 'mock-token',
    },
    initialized: true,
  }),
  AuthProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
}))

export const renderWithTheme = (component: ReactNode, options = {}) =>
  render(
    <KeycloakAuth>
      <BaseExposeWrapper>
        <MuiThemeProvider theme={wellhub}>
          <StyledThemeProvider theme={wellhub}>{component}</StyledThemeProvider>
        </MuiThemeProvider>
      </BaseExposeWrapper>
    </KeycloakAuth>,
    options
  )
