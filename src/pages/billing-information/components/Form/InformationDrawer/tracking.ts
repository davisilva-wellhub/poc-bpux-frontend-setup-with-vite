import type { IBillingInformation } from '@/modules/account/types'

import { SNOWPLOW_EVENT_METADATA } from '../tracking'

export const informationDrawerPageViewTrack = (
  billingInformation: IBillingInformation | undefined,
  trackReady: boolean
) => ({
  page: 'BILLING_INFORMATION',
  label: 'PAGE_VIEW_BILLING_INFORMATION_FAQ',
  metadata: {
    addressInitialStatus: billingInformation?.postalCode
      ? SNOWPLOW_EVENT_METADATA.FILLED
      : SNOWPLOW_EVENT_METADATA.MISSING,
    taxIdInitialStatus: billingInformation?.taxIdNumber
      ? SNOWPLOW_EVENT_METADATA.FILLED
      : SNOWPLOW_EVENT_METADATA.MISSING,
    userCountry: billingInformation?.country as string,
  },
  trackReady,
})

export const helpCenterButtonClickTrack = (
  billingInformation: IBillingInformation | undefined
) => ({
  category: 'CLICK',
  action: 'CLICK',
  flow: 'BILLING_INFORMATION_FAQ_HELP_CENTER',
  label: 'CLICK_BILLING_INFORMATION_FAQ_HELP_CENTER',
  metadata: {
    userCountry: billingInformation?.country as string,
  },
})
