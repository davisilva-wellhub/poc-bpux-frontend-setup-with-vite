import { ExposeAccountWrapper } from '@/core/components/ExposeAccountWrapper'
import { BillingInformation } from '@/pages/billing-information'

const BillingInformationExpose = () => {
  return (
    <ExposeAccountWrapper>
      <BillingInformation />
    </ExposeAccountWrapper>
  )
}

export default BillingInformationExpose
