import type { IBillingInformation } from '@/modules/account/types'

export const confirmationDrawerPageViewTrack = (
  billingInformation: IBillingInformation,
  trackReady: boolean
) => ({
  page: 'BILLING_INFORMATION',
  label: 'PAGE_VIEW_BILLING_INFORMATION_FORM_REVIEW_DATA_STEP',
  metadata: {
    userCountry: billingInformation?.country as string,
  },
  trackReady,
})
