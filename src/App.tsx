import { wellhub } from '@gympass/tai-chi'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

import '@gympass/tai-chi/index.css'

import './config/i18n'
import { LocalWrapper } from './core/components/LocalWrapper'
import { RoutesComponent } from './routes'
import { AccountRoutes } from './routes/accounts-routes'

export const App = () => {
  const context = import.meta.env.VITE_LOCAL_CONTEXT

  return (
    <LocalWrapper context={context}>
      <MuiThemeProvider theme={wellhub}>
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
      </MuiThemeProvider>
    </LocalWrapper>
  )
}
