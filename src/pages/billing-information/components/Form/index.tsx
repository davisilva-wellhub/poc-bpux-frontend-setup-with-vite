import { Button, TextField, Typography } from '@gympass/tai-chi'
import { Box, Grid } from '@mui/material'

import { ScreenReaderOnlyText } from '@/core/components/ScreenReaderOnlyText'
import type { IBillingInformation } from '@/modules/account/types'

import { ConfirmationDrawer } from './ConfirmationDrawer'
import { ButtonWrapper } from './styles'
import { inputFocusEventTrack } from './tracking'
import { useForm } from './useForm'

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
  const {
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

  return (
    <Box pb="96px">
      <form onSubmit={formik.handleSubmit}>
        <Box mb={7}>
          <Typography component="h2" variant="body2" weight="bold" mb={5}>
            CPF
          </Typography>

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
                  defaultValue: 'Insira seu CPF',
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
          <Typography component="h2" variant="body2" weight="bold" mb={5}>
            {t('billing_information.form.address.label', {
              defaultValue: 'Endereço',
            })}
          </Typography>

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
                          'CEP não encontrado. Tente novamente ou contate a Central de Ajuda.',
                      })
                    : ''
                }
                fullWidth
                ariaLabel={t('billing_information.form.cep.a11y.label', {
                  defaultValue: 'Insira seu CEP',
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
                  defaultValue: 'Logradouro',
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
                          defaultValue: 'Logradouro',
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
                  defaultValue: 'Número',
                })}
                name="doorNumber"
                value={values.doorNumber}
                onChange={handleChange}
                fullWidth
                endAdornment={buildAdornment({
                  field: t('billing_information.form.number.label', {
                    defaultValue: 'Número',
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
                  defaultValue: 'Complemento (Opcional)',
                })}
                name="street2"
                value={values.street2}
                onChange={handleChange}
                error={!!(values.street2 && errors.street2)}
                fullWidth
                endAdornment={buildAdornment({
                  field: t('billing_information.form.street2.label', {
                    defaultValue: 'Complemento (Opcional)',
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
                  defaultValue: 'Bairro',
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
                            defaultValue: 'Bairro',
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
                  defaultValue: 'Cidade',
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
                  defaultValue: 'Estado',
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
                  defaultValue: 'País',
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
              defaultValue: 'Salvar',
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
