import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

import { useTracking } from '@/core/hooks/useTracking'
import { useTranslation } from '@/core/hooks/useTranslation'
import { useLoggedUser } from '@/modules/account/hooks/useLogged'
import type { IBillingInformation } from '@/modules/account/types'

import { useGetInformation } from './useGetInformation'

export const ERROR_REASON_KEYS = {
  NOT_AUTHORIZED: 'NOT_AUTHORIZED',
} as const

export const BILLING_INFORMATION_ORIGINS = {
  CLAIM: 'in-app',
} as const

const closeButtonClickTrack = (
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

export const useBillingInformation = () => {
  const loggedUser = useLoggedUser()
  const { t } = useTranslation()
  const { trackEvent } = useTracking()

  const originParam = new URLSearchParams(window.location.search)?.get('origin')
  const isFromClaim = originParam === BILLING_INFORMATION_ORIGINS.CLAIM

  const [infoOpened, setInfoOpened] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showGenericError, setShowGenericError] = useState(false)

  const {
    data: currentBillingInfo,
    isFetched,
    isError,
    error,
  } = useGetInformation({
    userId: loggedUser?.id,
  })

  const handleBackToApp = () => {
    window.location.href = `${import.meta.env.WELLHUB_LINKS_URL!}/view?url-id=login`
  }

  const handleInfoClick = () => {
    setInfoOpened(true)
  }

  const handleBackClick = () => {
    if (isFromClaim) {
      handleBackToApp()
    } else {
      window.history.back()
    }
  }

  const handleCloseClick = () => {
    trackEvent(closeButtonClickTrack(currentBillingInfo))

    setInfoOpened(false)
  }

  useEffect(() => {
    const shouldRedirect =
      isError &&
      error instanceof AxiosError &&
      error?.response?.data?.key === ERROR_REASON_KEYS.NOT_AUTHORIZED

    if (shouldRedirect) {
      window.location.href = `${import.meta.env.VITE_ACCOUNT_MANAGER_URL}`
    }
  }, [isError, error])

  return {
    t,
    isError,
    isSuccess,
    isFetched,
    infoOpened,
    isFromClaim,
    setIsSuccess,
    handleBackClick,
    handleInfoClick,
    handleCloseClick,
    showGenericError,
    currentBillingInfo,
    setShowGenericError,
  }
}
