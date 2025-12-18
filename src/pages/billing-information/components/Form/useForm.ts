import { useEffect } from 'react'

import { useAriaLiveRegion } from '@/core/hooks/useAriaLiveRegion'
import { useTracking } from '@/core/hooks/useTracking'
import { useTranslation } from '@/core/hooks/useTranslation'
import type { IBillingInformation } from '@/modules/account/types'

import { useBillingInfoForm } from './hooks'
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

  const {
    formik,
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
  const { values, handleChange, dirty, isValid, errors } = formik

  const CPFHelperText = errors.taxIdNumber
    ? errors.taxIdNumber
    : t('billing_information.form.cpf.helper_text', {
        defaultValue: 'Após salvo, o CPF não pode ser modificado.',
      })

  const disabledFieldSupplementaryText = t(
    'billing-users-mfe.billing_information.form.input.disabled.a11y.supplementary',
    {
      defaultValue: 'Campo desabilitado, será preenchido automáticamente',
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
        defaultValue: 'Apagar {{value}}',
        value: value || field,
      }
    ),
    icon: 'Close' as const,
    onClick: () => {
      if (formName === 'postalCode') {
        cleanAddressFields()
      }

      formik.setFieldValue(formName, '')

      trackEvent(clearInputEventTrack(formName, values.country))

      setMessage(
        t('billing_information.form.input.clear.a11y.feedback', {
          defaultValue: '{{value}} foi excluído. Insira um novo {{field}}',
          field,
          value: value || field,
        })
      )
    },
  })

  useEffect(() => {
    if (userHasSelectedAddress && !addressNotFound && !errors.postalCode) {
      setMessage(
        t('billing_information.form.cep.selected.a11y.feedback', {
          address: `${values.street}, ${values.neighborhood}, ${values.city}, ${values.state}`,
          defaultValue:
            '{{address}} foi selecionado, os campos desabilitados foram preenchidos automaticamente',
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userHasSelectedAddress, addressNotFound, errors.postalCode])

  const handleSaveInformationClick = () => {
    trackEvent(saveInformationButtonClickEventTrack(currentBillingInfo))
  }

  const handleConfirmClick = () => {
    trackEvent(confirmButtonClickEventTrack(values))

    handleConfirm()
  }

  const handleCloseClick = () => {
    trackEvent(closeButtonClickEventTrack(values))

    setIsConfirmOpened(false)
  }

  return {
    t,
    ref,
    dirty,
    errors,
    formik,
    values,
    isValid,
    trackEvent,
    handleChange,
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
