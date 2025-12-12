import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/home'
import { NotFound } from '../pages/not-found'
import BillingInformation from '../pages/billing-information'

export const AccountRoutes = () => (
  <Routes>
    <Route path="/test-home" element={<Home />} />
    <Route path="/billing-information" element={<BillingInformation />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)
