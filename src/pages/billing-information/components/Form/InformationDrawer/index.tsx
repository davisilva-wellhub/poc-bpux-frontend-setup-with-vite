import {
  Button,
  Divider,
  Link,
  SwipeableDrawer,
  Typography,
} from '@gympass/tai-chi'
import { Box } from '@mui/material'

import { ScreenReaderOnlyText } from '@/core/components/ScreenReaderOnlyText'
import type { IBillingInformation } from '@/modules/account/types'

import { useInformationDrawer } from './useInformationDrawer'

type InformationDrawerProps = {
  isOpen: boolean
  onCloseClicked: () => void
  currentBillingInfo: IBillingInformation | undefined
  trackReady: boolean
}

export const InformationDrawer = ({
  isOpen,
  onCloseClicked,
  currentBillingInfo,
  trackReady,
}: InformationDrawerProps) => {
  const { t, helpCenterUrl, handleHelpCenterClick } = useInformationDrawer({
    isOpen,
    trackReady,
    currentBillingInfo,
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
          {t('billing_information.page.info.title', {
            defaultValue: 'Por que precisamos dos seus dados de faturamento?',
          })}
        </Typography>
      </Box>

      <Divider orientation="horizontal" />

      <Typography variant="body2" textAlign="center" p={5}>
        {t('billing_information.page.info.description', {
          defaultValue:
            'Os dados fornecidos garantem conformidade com a nova lei brasileira de reforma tributária e são essenciais para regularidade fiscal.',
        })}
      </Typography>

      <Box mb={5}>
        <Button
          onClick={onCloseClicked}
          size="large"
          type="button"
          variant="contained"
          fullWidth
        >
          {t('billing_information.page.info.cta', {
            defaultValue: 'Ok',
          })}
          <ScreenReaderOnlyText>
            {', '}
            {t('billing_information.page.info.cta.a11y.supplementary', {
              defaultValue:
                'Você será redirecionado para o formulário de Dados de faturamento',
            })}
          </ScreenReaderOnlyText>
        </Button>
      </Box>

      <Typography variant="body2" weight="bold" textAlign="center" py={2}>
        {t('billing_information.page.info.help_text', {
          defaultValue: 'Need help?',
        })}{' '}
        <Link
          href={helpCenterUrl}
          target="_blank"
          onClick={handleHelpCenterClick}
        >
          {t('billing_information.page.info.help_link', {
            defaultValue: 'Visit the Help Center',
          })}
          <ScreenReaderOnlyText>
            {t('billing_information.page.info.help_link.a11y.supplementary', {
              defaultValue: 'for more information',
            })}
          </ScreenReaderOnlyText>
        </Link>
      </Typography>
    </SwipeableDrawer>
  )
}
