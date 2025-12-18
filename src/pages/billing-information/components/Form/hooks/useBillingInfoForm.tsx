import { formatCPF } from '@gympass/bpux-billing-utils'
import { zodResolver } from '@hookform/resolvers/zod'
import IMask, { type MaskedPattern } from 'imask'
import { useMemo, useState } from 'react'
import { usePlacesWidget } from 'react-google-autocomplete'
import { useForm } from 'react-hook-form'

import { useTracking } from '@/core/hooks/useTracking'
import { useTranslation } from '@/core/hooks/useTranslation'
import { useCorrelationId } from '@/core/providers/hooks/useCorrelationId'
import { useBillingInformationMutation } from '@/modules/account/billing-information/hooks/useBillingInformationMutation'
import { useLoggedUser } from '@/modules/account/hooks/useLogged'
import type { IBillingInformation } from '@/modules/account/types'

import { selectPostalCodeButtonClickTrack } from '../../../tracking'
import { BILLING_INFORMATION_COUNTRY_SETTINGS } from '../config'
import { COUNTRIES_NAMES } from '../constants'
import { type BillInfoFormValues, billInfoSchema } from '../schema'
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

  const formMethods = useForm<BillInfoFormValues>({
    resolver: zodResolver(billInfoSchema(t)),
    mode: 'onChange',
    defaultValues: {
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
  })

  const {
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = formMethods

  const postalCodeError = errors.postalCode
  const watchedCity = watch('city')

  const onSubmit = (data: BillInfoFormValues) => {
    if (!hasCurrentBillingInfo) {
      setIsConfirmOpened(true)
    } else {
      billingInformationMutation.mutate(
        {
          userId: loggedUser?.id || '',
          correlationId,
          billingInformation: data,
        },
        {
          onSuccess: () => {
            reset(data)
          },
        }
      )
    }
  }

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

      Object.entries(addressValues).forEach(([key, value]) => {
        setValue(key as keyof BillInfoFormValues, value, {
          shouldValidate: true,
          shouldDirty: true,
        })
      })

      if (!addressValues.city) {
        setIsInvalidAddress(true)
      }

      trackEvent(selectPostalCodeButtonClickTrack(addressValues.country))

      setAllowCustomFields(true)
    },
  })

  const handleConfirm = (): void => {
    const currentValues = getValues()
    billingInformationMutation.mutate(
      {
        userId: loggedUser?.id || '',
        correlationId,
        billingInformation: currentValues,
      },
      {
        onSuccess: () => {
          reset(currentValues)
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
      setValue(id as keyof BillInfoFormValues, cachedMask.value, {
        shouldValidate: true,
        shouldDirty: true,
      })
    }

  const cleanAddressFields = (): void => {
    setValue('street', '', { shouldValidate: true })
    setValue('doorNumber', '', { shouldValidate: true })
    setValue('street2', '', { shouldValidate: true })
    setValue('neighborhood', '', { shouldValidate: true })
    setValue('city', '', { shouldValidate: true })
    setValue('state', '', { shouldValidate: true })
    setValue('country', '', { shouldValidate: true })

    setAllowCustomFields(false)
  }

  const addressNotFound = useMemo(
    () => (!postalCodeError && !watchedCity) || isInvalidAddress,
    [postalCodeError, watchedCity, isInvalidAddress]
  )

  return {
    methods: formMethods,
    onSubmit,
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
