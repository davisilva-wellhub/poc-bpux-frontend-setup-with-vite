import { Fragment, type PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '../../../config/query-client'
import { LocalAccountWrapper } from '../LocalAccountWrapper'
import { CorrelationIdProvider } from '../../providers'

const wrapperMap: Record<string, React.ElementType> = {
  account: LocalAccountWrapper,
}

type TContextProps = PropsWithChildren & {
  context: string | undefined
}

const ContextWrapper = ({ children, context }: TContextProps) => {
  const Wrapper =
    context && wrapperMap[context] ? wrapperMap[context] : Fragment

  return <Wrapper>{children}</Wrapper>
}

export const LocalWrapper = ({ children, context }: TContextProps) => (
  <QueryClientProvider client={queryClient}>
    <CorrelationIdProvider>
      <ContextWrapper context={context}>{children}</ContextWrapper>
    </CorrelationIdProvider>
  </QueryClientProvider>
)
