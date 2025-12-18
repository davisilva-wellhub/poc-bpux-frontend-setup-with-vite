import type { IBillingInformation } from '@/modules/account/types'

import { SNOWPLOW_EVENT_METADATA } from './components/Form/tracking'

export const billingInformationPageViewTrack = (
  billingInformation: IBillingInformation | undefined,
  originParam: string,
  trackReady: boolean
) => ({
  page: 'BILLING_INFORMATION',
  label: 'PAGE_VIEW_BILLING_INFORMATION_PAGE',
  metadata: {
    addressInitialStatus: billingInformation?.postalCode
      ? SNOWPLOW_EVENT_METADATA.FILLED
      : SNOWPLOW_EVENT_METADATA.MISSING,
    taxIdInitialStatus: billingInformation?.taxIdNumber
      ? SNOWPLOW_EVENT_METADATA.FILLED
      : SNOWPLOW_EVENT_METADATA.MISSING,
    userCountry: billingInformation?.country as string,
    origin: originParam,
  },
  trackReady,
})

export const backButtonClickTrack = (
  billingInformation: IBillingInformation | undefined
) => ({
  category: 'CLICK',
  action: 'CLICK',
  flow: 'BILLING_INFORMATION_BACK',
  label: 'CLICK_BILLING_INFORMATION_BACK',
  metadata: {
    userCountry: billingInformation?.country as string,
  },
})

export const infoButtonClickTrack = (
  billingInformation: IBillingInformation | undefined
) => ({
  category: 'CLICK',
  action: 'CLICK',
  flow: 'BILLING_INFORMATION_FAQ',
  label: 'CLICK_BILLING_INFORMATION_FAQ',
  metadata: {
    userCountry: billingInformation?.country as string,
  },
})

export const closeButtonClickTrack = (
  billingInformation: IBillingInformation | undefined
) => ({
  category: 'CLICK',
  action: 'CLICK',
  flow: 'BILLING_INFORMATION_FAQ_ACKNOWLEDGE',
  label: 'CLICK_BILLING_INFORMATION_FAQ_ACKNOWLEDGE',
  metadata: {
    userCountry: billingInformation?.country as string,
  },
})

export const selectPostalCodeButtonClickTrack = (userCountry: string) => ({
  category: 'CLICK',
  action: 'CLICK',
  flow: 'BILLING_INFORMATION_GOOGLE_ADDRESS_SELECTED',
  label: 'CLICK_BILLING_INFORMATION_GOOGLE_ADDRESS_SELECTED',
  metadata: {
    userCountry,
  },
})
