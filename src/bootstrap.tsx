import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import { setAuthToken } from '@/core/config/auth-token-store'

import App from './App'
import { GlobalStyles } from './styles/GlobalStyles'

export const mount = (
  container: HTMLElement,
  authInstance?: { keycloak?: { token?: string } }
) => {
  console.log('[MFE Bootstrap] mount called with authInstance:', authInstance)
  console.log('[MFE Bootstrap] token:', authInstance?.keycloak?.token)

  // Set auth token if provided by host
  if (authInstance?.keycloak?.token) {
    console.log('[MFE Bootstrap] Setting auth token from host')
    setAuthToken(authInstance.keycloak.token)
  } else {
    console.warn('[MFE Bootstrap] No token provided by host')
  }

  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Suspense fallback={<>Loading do MFE...</>}>
        <GlobalStyles />
        <App />
      </Suspense>
    </React.StrictMode>
  )

  return {
    unmount: () => {
      root.unmount()
    },
  }
}

if (!import.meta.env.PROD || window.location.pathname === '/') {
  const rootElement = document.getElementById('root')
  if (rootElement) {
    mount(rootElement)
  }
}
