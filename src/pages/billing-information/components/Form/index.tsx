import { Button, TextField, Typography } from '@gympass/tai-chi'
import { Box, Grid } from '@mui/material'
import { useEffect } from 'react'

import { ScreenReaderOnlyText } from '@/core/components/ScreenReaderOnlyText'
import { useAriaLiveRegion } from '@/core/hooks/useAriaLiveRegion'
import { useTracking } from '@/core/hooks/useTracking'
import { useTranslation } from '@/core/hooks/useTranslation'
import type { IBillingInformation } from '@/modules/account/types'

import { ConfirmationDrawer } from './ConfirmationDrawer'
import { useBillingInfoForm } from './hooks'
import { ButtonWrapper } from './styles'
import {
  clearInputEventTrack,
  closeButtonClickEventTrack,
  confirmButtonClickEventTrack,
  inputFocusEventTrack,
  saveInformationButtonClickEventTrack,
} from './tracking'

type TFormProps = {
  currentBillingInfo: IBillingInformation | undefined
  onSuccess: () => void
  onError: () => void
}

export const Form = ({
  currentBillingInfo,
  onSuccess,
  onError,
}: TFormProps) => {
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
        defaultValue: 'After saved, CPF cannot be modified.',
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

      formik.setFieldValue(formName, '')

      trackEvent(clearInputEventTrack(formName, values.country))

      setMessage(
        t('billing_information.form.input.clear.a11y.feedback', {
          defaultValue: '{{value}} has been deleted. Enter a new {{field}}',
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
            '{{address}} has been selected, disabled fields have been automatically filled',
        })
      )
    }
  }, [
    userHasSelectedAddress,
    addressNotFound,
    errors.postalCode,
    setMessage,
    t,
    values.street,
    values.neighborhood,
    values.city,
    values.state,
  ])

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

  console.log({ mfe: 'billing-information', file: 'Form/index.tsx' })

  return (
    <Box pb="96px">
      <form onSubmit={formik.handleSubmit}>
        <Box mb={7}>
          <Box mb={5}>
            <Typography component="h2" variant="body2" weight="bold">
              CPF
            </Typography>
          </Box>

          <Grid container spacing={6}>
            <Grid
              item
              xs={12}
              onFocus={() =>
                trackEvent(
                  inputFocusEventTrack('TAX_ID_NUMBER', values.country)
                )
              }
            >
              <TextField
                id="taxIdNumber"
                label="CPF"
                name="taxIdNumber"
                required={!hasCurrentBillingInfo}
                helperText={values.taxIdNumber ? CPFHelperText : ''}
                value={values.taxIdNumber}
                onChange={handleMaskedInput('000.000.000-00')}
                error={!!(values.taxIdNumber && errors.taxIdNumber)}
                disabled={hasCurrentBillingInfo}
                fullWidth
                ariaLabel={t('billing_information.form.cpf.a11y.label', {
                  defaultValue: 'Enter your CPF',
                })}
                endAdornment={
                  !hasCurrentBillingInfo
                    ? buildAdornment({
                        field: 'CPF',
                        formName: 'taxIdNumber',
                        value: values.taxIdNumber,
                      })
                    : undefined
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Box mb={5}>
            <Typography component="h2" variant="body2" weight="bold">
              {t('billing_information.form.address.label', {
                defaultValue: 'Address',
              })}
            </Typography>
          </Box>

          <Grid container spacing={5}>
            <Grid
              item
              xs={12}
              onFocus={() =>
                trackEvent(inputFocusEventTrack('POSTAL_CODE', values.country))
              }
            >
              <TextField
                ref={ref}
                id="postalCode"
                label="CEP"
                name="postalCode"
                required
                value={values.postalCode}
                onChange={event => {
                  cleanAddressFields()
                  handleMaskedInput('00000-000')(event)
                }}
                error={
                  !!(values.postalCode && errors.postalCode) || addressNotFound
                }
                helperText={
                  addressNotFound
                    ? t('billing_information.form.cep.invalid', {
                        defaultValue:
                          'Postal code not found. Try again or contact the Help Center.',
                      })
                    : ''
                }
                fullWidth
                ariaLabel={t('billing_information.form.cep.a11y.label', {
                  defaultValue: 'Enter your postal code',
                })}
                endAdornment={buildAdornment({
                  field: 'CEP',
                  formName: 'postalCode',
                  value: values.postalCode,
                })}
              />
            </Grid>

            <Grid
              item
              xs={12}
              onFocus={() =>
                trackEvent(inputFocusEventTrack('STREET', values.country))
              }
            >
              <TextField
                id="street"
                label={t('billing_information.form.street.label', {
                  defaultValue: 'Street',
                })}
                name="street"
                required
                value={values.street}
                onChange={handleChange}
                disabled={!allowCustomFields}
                error={!!(values.street && errors.street)}
                fullWidth
                ariaDescribedBy="street-disabled-supplementary-text"
                endAdornment={
                  allowCustomFields
                    ? buildAdornment({
                        field: t('billing_information.form.street.label', {
                          defaultValue: 'Street',
                        }),
                        formName: 'street',
                        value: values.street,
                      })
                    : undefined
                }
              />
              {!allowCustomFields && (
                <ScreenReaderOnlyText id="street-disabled-supplementary-text">
                  {disabledFieldSupplementaryText}
                </ScreenReaderOnlyText>
              )}
            </Grid>

            <Grid
              item
              xs={4}
              onFocus={() =>
                trackEvent(inputFocusEventTrack('DOOR_NUMBER', values.country))
              }
            >
              <TextField
                id="doorNumber"
                label={t('billing_information.form.number.label', {
                  defaultValue: 'Number',
                })}
                name="doorNumber"
                value={values.doorNumber}
                onChange={handleChange}
                fullWidth
                endAdornment={buildAdornment({
                  field: t('billing_information.form.number.label', {
                    defaultValue: 'Number',
                  }),
                  formName: 'doorNumber',
                  value: values.doorNumber,
                })}
              />
            </Grid>

            <Grid
              item
              xs={8}
              onFocus={() =>
                trackEvent(inputFocusEventTrack('STREET_2', values.country))
              }
            >
              <TextField
                id="street2"
                label={t('billing_information.form.street2.label', {
                  defaultValue: 'Complement (Optional)',
                })}
                name="street2"
                value={values.street2}
                onChange={handleChange}
                error={!!(values.street2 && errors.street2)}
                fullWidth
                endAdornment={buildAdornment({
                  field: t('billing_information.form.street2.label', {
                    defaultValue: 'Complement (Optional)',
                  }),
                  formName: 'street2',
                  value: values.street2,
                })}
              />
            </Grid>

            <Grid
              item
              xs={12}
              onFocus={() =>
                trackEvent(inputFocusEventTrack('NEIGHBORHOOD', values.country))
              }
            >
              <TextField
                id="neighborhood"
                label={t('billing_information.form.neighborhood.label', {
                  defaultValue: 'Neighborhood',
                })}
                name="neighborhood"
                required
                value={values.neighborhood}
                onChange={handleChange}
                disabled={!allowCustomFields}
                fullWidth
                ariaDescribedBy="neighborhood-disabled-supplementary-text"
                endAdornment={
                  allowCustomFields
                    ? buildAdornment({
                        field: t(
                          'billing_information.form.neighborhood.label',
                          {
                            defaultValue: 'Neighborhood',
                          }
                        ),
                        formName: 'neighborhood',
                        value: values.neighborhood,
                      })
                    : undefined
                }
              />
              {!allowCustomFields && (
                <ScreenReaderOnlyText id="neighborhood-disabled-supplementary-text">
                  {disabledFieldSupplementaryText}
                </ScreenReaderOnlyText>
              )}
            </Grid>

            <Grid
              item
              xs={6}
              onFocus={() =>
                trackEvent(inputFocusEventTrack('CITY', values.country))
              }
            >
              <TextField
                id="city"
                label={t('billing_information.form.city.label', {
                  defaultValue: 'City',
                })}
                name="city"
                value={values.city}
                disabled
                fullWidth
                ariaDescribedBy="city-disabled-supplementary-text"
              />
              <ScreenReaderOnlyText id="city-disabled-supplementary-text">
                {disabledFieldSupplementaryText}
              </ScreenReaderOnlyText>
            </Grid>

            <Grid
              item
              xs={6}
              onFocus={() =>
                trackEvent(inputFocusEventTrack('STATE', values.country))
              }
            >
              <TextField
                id="state"
                label={t('billing_information.form.state.label', {
                  defaultValue: 'State',
                })}
                name="state"
                value={values.state}
                disabled
                fullWidth
                ariaDescribedBy="state-disabled-supplementary-text"
              />
              <ScreenReaderOnlyText id="state-disabled-supplementary-text">
                {disabledFieldSupplementaryText}
              </ScreenReaderOnlyText>
            </Grid>

            <Grid
              item
              xs={12}
              onFocus={() =>
                trackEvent(inputFocusEventTrack('COUNTRY', values.country))
              }
            >
              <TextField
                id="country"
                label={t('billing_information.form.country.label', {
                  defaultValue: 'Country',
                })}
                name="country"
                value={values.country}
                disabled
                fullWidth
                ariaDescribedBy="country-disabled-supplementary-text"
              />
              <ScreenReaderOnlyText id="country-disabled-supplementary-text">
                {disabledFieldSupplementaryText}
              </ScreenReaderOnlyText>
            </Grid>
          </Grid>
        </Box>

        <ButtonWrapper>
          <Button
            type="submit"
            fullWidth
            size="large"
            disabled={!dirty || !isValid}
            loading={billingInformationMutation.isPending}
            onClick={handleSaveInformationClick}
          >
            {t('billing_information.form.cta.save', {
              defaultValue: 'Save',
            })}
          </Button>
        </ButtonWrapper>
      </form>

      {!hasCurrentBillingInfo && values && (
        <ConfirmationDrawer
          isOpen={isConfirmOpened}
          billingInformation={values}
          onCloseClicked={handleCloseClick}
          onConfirmClicked={handleConfirmClick}
          isLoading={billingInformationMutation.isPending}
        />
      )}

      {ariaLiveRegionElement}
    </Box>
  )
}
