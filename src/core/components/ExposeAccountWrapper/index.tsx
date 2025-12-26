import '@gympass/tai-chi/index.css'
import '@/config/i18n'

import { wellhub } from '@gympass/tai-chi'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { BaseExposeWrapper } from '../BaseWrapper'

export const ExposeAccountWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <BaseExposeWrapper>
      <MuiThemeProvider theme={wellhub}>
        <StyledThemeProvider theme={wellhub}>{children}</StyledThemeProvider>
      </MuiThemeProvider>
    </BaseExposeWrapper>
  )
}
