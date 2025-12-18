import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import { GlobalStyles } from './styles/GlobalStyles'

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<>Loading...</>}>
    <GlobalStyles />
    <App />
  </Suspense>
)
