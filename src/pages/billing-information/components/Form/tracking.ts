import { IBillingInformation } from '@/modules/account/types'

export enum SNOWPLOW_EVENT_METADATA {
  FILLED = 'FILLED',
  MISSING = 'MISSING',
  REGISTER = 'REGISTER',
  UPDATE = 'UPDATE',
}

export const saveInformationButtonClickEventTrack = (
  billingInformation: IBillingInformation | undefined
) => ({
  category: 'CLICK',
  action: 'CLICK',
  flow: 'BILLING_INFORMATION_SUBMIT_FORM',
  label: 'CLICK_BILLING_INFORMATION_SUBMIT_FORM',
  metadata: {
    userCountry: billingInformation?.country as string,
    action:
      billingInformation?.taxIdNumber && billingInformation?.postalCode
        ? SNOWPLOW_EVENT_METADATA.UPDATE
        : SNOWPLOW_EVENT_METADATA.REGISTER,
  },
})

export const confirmButtonClickEventTrack = (
  billingInformation: IBillingInformation | undefined
) => ({
  category: 'CLICK',
  action: 'CLICK',
  flow: 'BILLING_INFORMATION_FORM_REVIEW_CONFIRM',
  label: 'CLICK_BILLING_INFORMATION_FORM_REVIEW_CONFIRM',
  metadata: {
    userCountry: billingInformation?.country as string,
  },
})

export const closeButtonClickEventTrack = (
  billingInformation: IBillingInformation | undefined
) => ({
  category: 'CLICK',
  action: 'CLICK',
  flow: 'BILLING_INFORMATION_FORM_REVIEW_CHANGE_DATA',
  label: 'CLICK_BILLING_INFORMATION_FORM_REVIEW_CHANGE_DATA',
  metadata: {
    userCountry: billingInformation?.country as string,
  },
})

export const inputFocusEventTrack = (
  fieldName: string,
  userCountry: string
) => ({
  category: 'CLICK',
  action: 'CLICK',
  flow: `BILLING_INFORMATION_FORM_INPUT_${fieldName}`,
  label: `CLICK_BILLING_INFORMATION_FORM_INPUT_${fieldName}`,
  metadata: {
    userCountry,
  },
})

export const clearInputEventTrack = (
  fieldName: string,
  userCountry: string
) => ({
  category: 'CLICK',
  action: 'CLICK',
  flow: `BILLING_INFORMATION_FORM_INPUT_${fieldName}_CLEAN`,
  label: `CLICK_BILLING_INFORMATION_FORM_INPUT_${fieldName}_CLEAN`,
  metadata: {
    userCountry,
  },
})
