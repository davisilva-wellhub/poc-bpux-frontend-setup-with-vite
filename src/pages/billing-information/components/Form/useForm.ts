import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { useAriaLiveRegion } from '@/core/hooks/useAriaLiveRegion'
import { useTracking } from '@/core/hooks/useTracking'
import { useTranslation } from '@/core/hooks/useTranslation'
import type { IBillingInformation } from '@/modules/account/types'

import { useBillingInfoForm } from './hooks'
import type { BillInfoFormValues } from './schema'
import {
  clearInputEventTrack,
  closeButtonClickEventTrack,
  confirmButtonClickEventTrack,
  saveInformationButtonClickEventTrack,
} from './tracking'

type TProps = {
  currentBillingInfo: IBillingInformation | undefined
  onSuccess: VoidFunction
  onError: VoidFunction
}

export const useForm = ({ currentBillingInfo, onError, onSuccess }: TProps) => {
  const { t } = useTranslation()
  const { trackEvent } = useTracking()

  // Access only the RHF methods needed for this hook
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<BillInfoFormValues>()

  const {
    ref,
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
  } = useBillingInfoForm({
    currentBillingInfo,
    onSuccess,
    onError,
  })
  const { setMessage, ariaLiveRegionElement } = useAriaLiveRegion()

  const CPFHelperText = errors.taxIdNumber
    ? errors.taxIdNumber.message
    : t('billing_information.form.cpf.helper_text', {
        defaultValue: 'Once saved, CPF cannot be modified.',
      })

  const disabledFieldSupplementaryText = t(
    'billing-users-mfe.billing_information.form.input.disabled.a11y.supplementary',
    {
      defaultValue: 'Disabled field, will be filled automatically',
    }
  )

  const buildAdornment = ({
    field,
    formName,
    value,
  }: {
    field: string
    formName: keyof IBillingInformation
    value: string
  }) => ({
    ariaLabel: t(
      'billing-users-mfe.billing_information.form.input.clear.a11y.label',
      {
        defaultValue: 'Clear {{value}}',
        value: value || field,
      }
    ),
    icon: 'Close' as const,
    onClick: () => {
      if (formName === 'postalCode') {
        cleanAddressFields()
      }

      setValue(formName, '')

      trackEvent(clearInputEventTrack(formName, getValues('country')))

      setMessage(
        t('billing_information.form.input.clear.a11y.feedback', {
          defaultValue: '{{value}} was cleared. Enter a new {{field}}',
          field,
          value: value || field,
        })
      )
    },
  })

  useEffect(() => {
    if (userHasSelectedAddress && !addressNotFound && !errors.postalCode) {
      const values = getValues()
      setMessage(
        t('billing_information.form.cep.selected.a11y.feedback', {
          address: `${values.street}, ${values.neighborhood}, ${values.city}, ${values.state}`,
          defaultValue:
            '{{address}} was selected, disabled fields were filled automatically',
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userHasSelectedAddress, addressNotFound, errors.postalCode])

  const handleSaveInformationClick = () => {
    trackEvent(saveInformationButtonClickEventTrack(currentBillingInfo))
  }

  const handleConfirmClick = () => {
    trackEvent(confirmButtonClickEventTrack(getValues()))

    handleConfirm()
  }

  const handleCloseClick = () => {
    trackEvent(closeButtonClickEventTrack(getValues()))

    setIsConfirmOpened(false)
  }

  return {
    t,
    ref,
    trackEvent,
    buildAdornment,
    CPFHelperText,
    addressNotFound,
    isConfirmOpened,
    handleCloseClick,
    cleanAddressFields,
    handleMaskedInput,
    allowCustomFields,
    handleConfirmClick,
    ariaLiveRegionElement,
    hasCurrentBillingInfo,
    handleSaveInformationClick,
    billingInformationMutation,
    disabledFieldSupplementaryText,
  }
}
