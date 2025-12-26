import {
  Alert,
  Button,
  Divider,
  SwipeableDrawer,
  Typography,
} from '@gympass/tai-chi'
import { Box } from '@mui/material'

import type { IBillingInformation } from '@/modules/account/types'

import { useConfirmationDrawer } from './useConfirmationDrawer'

type ConfirmationDrawerProps = {
  billingInformation: IBillingInformation
  isOpen: boolean
  isLoading: boolean
  onConfirmClicked: () => void
  onCloseClicked: () => void
}

export const ConfirmationDrawer = ({
  billingInformation,
  isOpen,
  isLoading,
  onConfirmClicked,
  onCloseClicked,
}: ConfirmationDrawerProps) => {
  const { address, cpfA11yLabel, t } = useConfirmationDrawer({
    billingInformation,
    isOpen,
  })

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isOpen}
      onClose={onCloseClicked}
      onOpen={() => ({})}
    >
      <Box textAlign="center" py={3}>
        <Typography component="h2" variant="body2" weight="bold">
          {t('billing_information.form.confirmation.title', {
            defaultValue: 'Confirme seus dados de faturamento',
          })}
        </Typography>
      </Box>

      <Divider orientation="horizontal" />

      {billingInformation && (
        <Box mt={8}>
          <Typography variant="body2" mb={4} aria-label={cpfA11yLabel}>
            <strong>CPF:</strong> {billingInformation.taxIdNumber}
          </Typography>

          <Typography variant="body2">
            <strong>
              {t('billing_information.form.address.label', {
                defaultValue: 'Address',
              })}
              :
            </strong>{' '}
            {address}
          </Typography>
        </Box>
      )}

      <Box mt={8} mb={6}>
        <Alert
          icon="Info"
          message={t('billing_information.form.confirmation.warning', {
            defaultValue: 'CPF cannot be modified after saving.',
          })}
          severity="warning"
          title=""
        />
      </Box>

      <Box>
        <Button
          onClick={onConfirmClicked}
          size="large"
          type="button"
          variant="contained"
          fullWidth
          loading={isLoading}
        >
          {t('billing_information.form.confirmation.confirm', {
            defaultValue: 'Confirm',
          })}
        </Button>

        <Box mt={6} mb={4}>
          <Button
            onClick={onCloseClicked}
            size="small"
            type="button"
            variant="text"
            color="secondary"
            fullWidth
          >
            {t('billing_information.form.confirmation.back', {
              defaultValue: 'Edit data',
            })}
          </Button>
        </Box>
      </Box>
    </SwipeableDrawer>
  )
}
