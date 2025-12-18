import { formatCPF } from '@gympass/bpux-billing-utils'
import { useFormik } from 'formik'
import IMask, { MaskedPattern } from 'imask'
import { useEffect, useMemo, useState } from 'react'
import { usePlacesWidget } from 'react-google-autocomplete'

import { useTracking } from '@/core/hooks/useTracking'
import { useTranslation } from '@/core/hooks/useTranslation'
import { useCorrelationId } from '@/core/providers/hooks/useCorrelationId'
import { useBillingInformationMutation } from '@/modules/account/billing-information/hooks/useBillingInformationMutation'
import { useLoggedUser } from '@/modules/account/hooks/useLogged'
import type { IBillingInformation } from '@/modules/account/types'

import { selectPostalCodeButtonClickTrack } from '../../../tracking'
import { BILLING_INFORMATION_COUNTRY_SETTINGS } from '../config'
import { COUNTRIES_NAMES } from '../constants'
import { billInfoSchema } from '../schema'
import { getAddressValues } from '../utils'

type TUseBillingInfoFormProps = {
  currentBillingInfo: IBillingInformation | undefined
  onSuccess: () => void
  onError: () => void
}

export function useBillingInfoForm({
  currentBillingInfo,
  onSuccess,
  onError,
}: TUseBillingInfoFormProps) {
  const loggedUser = useLoggedUser()
  const correlationId = useCorrelationId()
  const { t } = useTranslation()
  const { trackEvent } = useTracking()
  const [isInvalidAddress, setIsInvalidAddress] = useState(false)
  const [isConfirmOpened, setIsConfirmOpened] = useState(false)
  const [hasCurrentBillingInfo, setHasCurrentBillingInfo] =
    useState(!!currentBillingInfo)
  const [allowCustomFields, setAllowCustomFields] = useState(false)
  const [userHasSelectedAddress, setUserHasSelectedAddress] = useState(false)

  const inputMasks = useMemo(() => {
    return new Map<string, MaskedPattern<string>>()
  }, [])

  const onMutationSuccess = (): void => {
    setIsConfirmOpened(false)
    setHasCurrentBillingInfo(true)
    setAllowCustomFields(false)
    onSuccess()
  }

  const billingInformationMutation = useBillingInformationMutation({
    hasCurrentBillingInfo,
    onSuccess: onMutationSuccess,
    onError,
  })

  const formattedCPF = currentBillingInfo?.taxIdNumber
    ? formatCPF(currentBillingInfo?.taxIdNumber)
    : ''

  const countryName = currentBillingInfo?.country
    ? COUNTRIES_NAMES[
        currentBillingInfo?.country as keyof typeof COUNTRIES_NAMES
      ] || currentBillingInfo?.country
    : ''

  const formik = useFormik({
    initialValues: {
      taxIdNumber: formattedCPF,
      postalCode: currentBillingInfo?.postalCode || '',
      street: currentBillingInfo?.street || '',
      doorNumber: currentBillingInfo?.doorNumber || '',
      street2: currentBillingInfo?.street2 || '',
      neighborhood: currentBillingInfo?.neighborhood || '',
      city: currentBillingInfo?.city || '',
      state: currentBillingInfo?.state || '',
      country: countryName,
    },
    validationSchema: billInfoSchema(t),
    validateOnMount: true,
    onSubmit: values => {
      if (!hasCurrentBillingInfo) {
        setIsConfirmOpened(true)
      } else {
        billingInformationMutation.mutate(
          {
            userId: loggedUser?.id || '',
            correlationId,
            billingInformation: values,
          },
          {
            onSuccess: () => {
              formik.resetForm({ values })
            },
          }
        )
      }
    },
  })

  const { ref } = usePlacesWidget({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    options: {
      componentRestrictions: {
        country: [BILLING_INFORMATION_COUNTRY_SETTINGS.googleMapsCountryKey],
      },
      fields: BILLING_INFORMATION_COUNTRY_SETTINGS.googleMapsFields,
      types: BILLING_INFORMATION_COUNTRY_SETTINGS.googleMapsTypes,
    },
    onPlaceSelected: place => {
      setUserHasSelectedAddress(true)
      setIsInvalidAddress(false)

      if (!place.address_components) {
        setIsInvalidAddress(true)
        return
      }

      const addressValues = getAddressValues(place.address_components)

      formik.setValues(prev => ({
        ...prev,
        ...addressValues,
      }))

      if (!addressValues.city) {
        setIsInvalidAddress(true)
      }

      trackEvent(selectPostalCodeButtonClickTrack(addressValues.country))

      setAllowCustomFields(true)
    },
  })

  const handleConfirm = (): void => {
    billingInformationMutation.mutate(
      {
        userId: loggedUser?.id || '',
        correlationId,
        billingInformation: formik.values,
      },
      {
        onSuccess: () => {
          formik.resetForm({ values: formik.values })
        },
      }
    )
  }

  const handleMaskedInput =
    (mask: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, id } = event.target || {}

      if (!inputMasks.has(mask)) {
        inputMasks.set(mask, IMask.createMask({ mask }))
      }

      const cachedMask = inputMasks.get(mask)!
      cachedMask.resolve(value)
      formik.setFieldValue(id, cachedMask.value)
    }

  const cleanAddressFields = (): void => {
    formik.setValues(prev => ({
      ...prev,
      street: '',
      doorNumber: '',
      street2: '',
      neighborhood: '',
      city: '',
      state: '',
      country: '',
    }))

    setAllowCustomFields(false)
  }

  const addressNotFound = useMemo(
    () =>
      (!formik.errors.postalCode && !formik.values.city) || isInvalidAddress,
    [formik.errors.postalCode, formik.values.city, isInvalidAddress]
  )

  useEffect(() => {
    formik.validateForm(formik.values)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values])

  return {
    formik,
    ref,
    isInvalidAddress,
    isConfirmOpened,
    setIsConfirmOpened,
    hasCurrentBillingInfo,
    billingInformationMutation,
    handleConfirm,
    handleMaskedInput,
    allowCustomFields,
    cleanAddressFields,
    addressNotFound,
    userHasSelectedAddress,
  }
}
