import { QueryClientProvider } from '@tanstack/react-query'
import { Fragment, type PropsWithChildren } from 'react'

import { queryClient } from '@/config/query-client'
import { LocalAccountWrapper } from '@/core/components/LocalAccountWrapper'
import { CorrelationIdProvider } from '@/core/providers'

const wrapperMap: Record<string, React.ElementType> = {
  account: LocalAccountWrapper,
}

type TContextProps = PropsWithChildren & {
  context: string | undefined
  authInstance?: any
}

const ContextWrapper = ({ children, context }: TContextProps) => {
  const Wrapper =
    context && wrapperMap[context] ? wrapperMap[context] : Fragment

  return <Wrapper>{children}</Wrapper>
}

export const LocalWrapper = ({
  children,
  context,
  authInstance: _authInstance,
}: TContextProps) => (
  <QueryClientProvider client={queryClient}>
    <CorrelationIdProvider>
      <ContextWrapper context={context}>{children}</ContextWrapper>
    </CorrelationIdProvider>
  </QueryClientProvider>
)
