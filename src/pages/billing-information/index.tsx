import { Alert, Page, Typography } from '@gympass/tai-chi'
import { Box, Snackbar } from '@mui/material'

import { PageHeader } from '@/core/components/PageHeader'
import { withAuth } from '@/hoc/withAuth'

import { Form } from './components/Form'
import { InformationDrawer } from './components/Form/InformationDrawer'
import { FormLoader } from './components/Form/Loader'
import { useBillingInformation } from './useBillingInformation'

const BillingInformation = () => {
  const {
    t,
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
  } = useBillingInformation()

  return (
    <>
      <PageHeader
        title={t('billing_information.page.title', {
          defaultValue: 'Billing information',
        })}
        onInfoClicked={handleInfoClick}
        backButtonA11yLabel={t('billing_information.page.back.a11y.label', {
          defaultValue: 'Back to previous screen',
        })}
        infoButtonA11yLabel={t('billing_information.page.info.a11y.label', {
          defaultValue: 'Information',
        })}
        infoButtonA11ySupplementary={t(
          'billing_information.page.info.a11y.supplementary',
          {
            defaultValue: 'Understand why we need your data',
          }
        )}
        onBackClicked={handleBackClick}
      />

      <Page>
        <Box maxWidth={520} mx="auto">
          <Typography variant="body2" mb={7}>
            {t('billing_information.page.description', {
              defaultValue:
                'De acordo com a nova reforma tributária, precisamos dos seus dados de faturamento.',
            })}
          </Typography>

          {!isFetched ? (
            <FormLoader />
          ) : (
            <Form
              currentBillingInfo={currentBillingInfo}
              onSuccess={() => {
                setIsSuccess(true)
                setShowGenericError(false)
              }}
              onError={() => {
                setIsSuccess(false)
                setShowGenericError(true)
              }}
            />
          )}
        </Box>
      </Page>

      <InformationDrawer
        isOpen={infoOpened}
        onCloseClicked={handleCloseClick}
        currentBillingInfo={currentBillingInfo}
        trackReady={isFetched}
      />

      <Snackbar
        open={isSuccess && !isFromClaim}
        autoHideDuration={6000}
        onClose={() => setIsSuccess(false)}
        sx={{ justifyContent: 'center' }}
      >
        <Alert
          message={t('billing_information.page.success_message', {
            defaultValue: 'Dados de faturamento atualizados.',
          })}
          severity="success"
          size="large"
        />
      </Snackbar>

      <Snackbar
        open={showGenericError}
        autoHideDuration={6000}
        onClose={() => setShowGenericError(false)}
        sx={{ justifyContent: 'center' }}
      >
        <Alert
          message={t('billing_information.page.generic_error_message', {
            defaultValue: 'Algo deu errado. Tente novamente.',
          })}
          severity="error"
          size="large"
        />
      </Snackbar>
    </>
  )
}

const BillingInformationPage = withAuth(BillingInformation)

export { BillingInformation }
export default BillingInformationPage
