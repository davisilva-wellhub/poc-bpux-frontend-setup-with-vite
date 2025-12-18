import type { HTMLAttributes, PropsWithChildren } from 'react'

import { HiddenSpan } from './styles'

export const ScreenReaderOnlyText = ({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) => (
  <HiddenSpan {...props}>{children}</HiddenSpan>
)
