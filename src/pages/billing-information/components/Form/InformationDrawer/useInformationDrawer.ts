import { usePageViewTrack, useTracking } from '@/core/hooks/useTracking'
import { useTranslation } from '@/core/hooks/useTranslation'
import type { IBillingInformation } from '@/modules/account/types'

import {
  helpCenterButtonClickTrack,
  informationDrawerPageViewTrack,
} from './tracking'

type TProps = {
  isOpen: boolean
  currentBillingInfo: IBillingInformation | undefined
  trackReady: boolean
}

export const useInformationDrawer = ({
  currentBillingInfo,
  isOpen,
  trackReady,
}: TProps) => {
  const { t } = useTranslation()
  const { trackEvent } = useTracking()
  const helpCenterUrl = import.meta.env.VITE_HELP_CENTER_URL || ''

  usePageViewTrack(
    informationDrawerPageViewTrack(currentBillingInfo, isOpen && trackReady)
  )

  const handleHelpCenterClick = () => {
    trackEvent(helpCenterButtonClickTrack(currentBillingInfo))
  }

  return { t, helpCenterUrl, handleHelpCenterClick }
}
