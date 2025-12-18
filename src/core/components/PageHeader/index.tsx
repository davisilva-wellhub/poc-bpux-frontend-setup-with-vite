import { IconButton, Typography } from '@gympass/tai-chi'
import { ArrowBack, Info } from '@gympass/tai-chi/icons'

import { buildAriaLabel } from '@/core/utils'
import { handleBackPage } from '@/modules/account/utils'

import { Header } from './styles'

type TPageHeaderProps = {
  title: string
  onBackClicked?: () => void
  onInfoClicked?: () => void
  backButtonA11yLabel?: string
  infoButtonA11yLabel?: string
  infoButtonA11ySupplementary?: string
}

export const PageHeader = ({
  title,
  onBackClicked = handleBackPage,
  onInfoClicked,
  backButtonA11yLabel = undefined,
  infoButtonA11yLabel = undefined,
  infoButtonA11ySupplementary = undefined,
}: TPageHeaderProps) => {
  const infoButtonAriaLabel = buildAriaLabel(
    infoButtonA11yLabel,
    infoButtonA11ySupplementary
  )

  return (
    <Header>
      <IconButton
        variant="secondary"
        size="large"
        ariaLabel={backButtonA11yLabel}
        onClick={onBackClicked}
      >
        <ArrowBack />
      </IconButton>

      <Typography as="h1" weight="bold" textAlign="center">
        {title}
      </Typography>

      {onInfoClicked && (
        <IconButton
          variant="secondary"
          size="large"
          onClick={onInfoClicked}
          ariaLabel={infoButtonAriaLabel}
        >
          <Info />
        </IconButton>
      )}
    </Header>
  )
}
