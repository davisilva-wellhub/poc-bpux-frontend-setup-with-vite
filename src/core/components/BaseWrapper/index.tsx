import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/config/query-client'
import { CorrelationIdProvider } from '@/core/providers/CorrelationIdProvider'

export const BaseExposeWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <CorrelationIdProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CorrelationIdProvider>
  )
}
