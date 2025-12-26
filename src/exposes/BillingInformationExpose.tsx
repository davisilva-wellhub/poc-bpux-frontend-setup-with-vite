import { ExposeAccountWrapper } from '@/core/components/ExposeAccountWrapper'
import { setAuthToken } from '@/core/config/auth-token-store'
import { setLoggedUser } from '@/core/config/user-store'
import { BillingInformation } from '@/pages/billing-information'

// Expose global function to allow host application to inject user data and auth token
// This enables the MFE to work without direct access to the host's AuthProvider
if (typeof window !== 'undefined') {
  ;(window as any).__MFE_SET_USER_DATA__ = (data: {
    id: string
    email: string
    token?: string
  }) => {
    setLoggedUser({ id: data.id, email: data.email })
    if (data.token) {
      setAuthToken(data.token)
    }
  }
}

const BillingInformationExpose = () => {
  console.log('[BillingInformationExpose] Component rendering')
  return (
    <ExposeAccountWrapper>
      <BillingInformation />
    </ExposeAccountWrapper>
  )
}

export default BillingInformationExpose
