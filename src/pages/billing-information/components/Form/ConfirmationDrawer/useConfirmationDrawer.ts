import { usePageViewTrack } from '@/core/hooks/useTracking'
import { useTranslation } from '@/core/hooks/useTranslation'
import type { IBillingInformation } from '@/modules/account/types'

import { confirmationDrawerPageViewTrack } from './tracking'

type TProps = {
  billingInformation: IBillingInformation
  isOpen: boolean
}

export const useConfirmationDrawer = ({
  billingInformation,
  isOpen,
}: TProps) => {
  const { t } = useTranslation()

  usePageViewTrack(confirmationDrawerPageViewTrack(billingInformation, isOpen))

  const address = `${billingInformation?.street ?? ''} ${
    billingInformation?.doorNumber ?? ''
  }${billingInformation?.street2 ? ` (${billingInformation.street2})` : ''} - ${
    billingInformation?.neighborhood ?? ''
  }, ${billingInformation?.city ?? ''} - ${billingInformation?.state ?? ''}, ${
    billingInformation?.postalCode ?? ''
  }`

  const cpfA11yLabel = billingInformation?.taxIdNumber
    ? `CPF: ${billingInformation.taxIdNumber.split('').join(' ')}`
    : undefined

  return { t, address, cpfA11yLabel }
}
