import '@gympass/tai-chi/index.css'
import '@/config/i18n'

import { wellhub } from '@gympass/tai-chi'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { LocalWrapper } from '@/core/components/LocalWrapper'
import { RoutesComponent } from '@/routes'
import { AccountRoutes } from '@/routes/accounts-routes'

export const App = () => {
  const context = import.meta.env.VITE_LOCAL_CONTEXT

  return (
    <LocalWrapper context={context}>
      <MuiThemeProvider theme={wellhub}>
        <StyledThemeProvider theme={wellhub}>
          <Router>
            {(() => {
              switch (context) {
                case 'account':
                  return <AccountRoutes />
                default:
                  return <RoutesComponent />
              }
            })()}
          </Router>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </LocalWrapper>
  )
}
