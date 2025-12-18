import { Button, TextField, Typography } from '@gympass/tai-chi'
import { Box, Grid } from '@mui/material'
import { FormProvider, useFormContext } from 'react-hook-form'

import { ScreenReaderOnlyText } from '@/core/components/ScreenReaderOnlyText'
import type { IBillingInformation } from '@/modules/account/types'

import { ConfirmationDrawer } from './ConfirmationDrawer'
import { useBillingInfoForm } from './hooks'
import type { BillInfoFormValues } from './schema'
import { ButtonWrapper } from './styles'
import { inputFocusEventTrack } from './tracking'
import { useForm } from './useForm'

type TFormProps = {
  currentBillingInfo: IBillingInformation | undefined
  onSuccess: () => void
  onError: () => void
}

const FormContent = ({
  currentBillingInfo,
  onSuccess,
  onError,
}: TFormProps) => {
  const {
    register,
    formState: { errors, isValid, isDirty },
    watch,
    handleSubmit,
  } = useFormContext<BillInfoFormValues>()

  const values = watch()

  const {
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
    hasCurrentBillingInfo,
    ariaLiveRegionElement,
    billingInformationMutation,
    handleSaveInformationClick,
    disabledFieldSupplementaryText,
  } = useForm({
    currentBillingInfo,
    onError,
    onSuccess,
  })

  const { onSubmit } = useBillingInfoForm({
    currentBillingInfo,
    onSuccess,
    onError,
  })

  return (
    <Box pb="96px">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register('street')}
                id="street"
                label={t('billing_information.form.street.label', {
                  defaultValue: 'Street',
                })}
                required
                value={values.street}
                disabled={!allowCustomFields}
                error={!!errors.street}
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
                {...register('doorNumber')}
                id="doorNumber"
                label={t('billing_information.form.number.label', {
                  defaultValue: 'Number',
                })}
                value={values.doorNumber}
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
                {...register('street2')}
                id="street2"
                label={t('billing_information.form.street2.label', {
                  defaultValue: 'Complement (Optional)',
                })}
                value={values.street2}
                error={!!errors.street2}
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
                {...register('neighborhood')}
                id="neighborhood"
                label={t('billing_information.form.neighborhood.label', {
                  defaultValue: 'Neighborhood',
                })}
                required
                value={values.neighborhood}
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
                {...register('city')}
                id="city"
                label={t('billing_information.form.city.label', {
                  defaultValue: 'City',
                })}
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
                {...register('state')}
                id="state"
                label={t('billing_information.form.state.label', {
                  defaultValue: 'State',
                })}
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
                {...register('country')}
                id="country"
                label={t('billing_information.form.country.label', {
                  defaultValue: 'Country',
                })}
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
            disabled={!isDirty || !isValid}
            loading={billingInformationMutation.isPending}
            onClick={handleSaveInformationClick}
          >
            {t('billing_information.form.cta.save', {
              defaultValue: 'Save',
            })}
          </Button>
        </ButtonWrapper>
      </form>

      {!hasCurrentBillingInfo && (
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

export const Form = (props: TFormProps) => {
  const { methods } = useBillingInfoForm(props)

  return (
    <FormProvider {...methods}>
      <FormContent {...props} />
    </FormProvider>
  )
}
