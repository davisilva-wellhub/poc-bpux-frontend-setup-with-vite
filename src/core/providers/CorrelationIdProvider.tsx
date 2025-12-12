import { useMemo, type PropsWithChildren } from 'react'
import { v4 } from 'uuid'
import { CorrelationIdContext } from './CorrelationIdContext'

export const CorrelationIdProvider = ({ children }: PropsWithChildren) => {
  const correlationId = v4()

  const correlationIdContextValues = useMemo(
    () => correlationId,
    [correlationId]
  )

  return (
    <CorrelationIdContext.Provider value={correlationIdContextValues}>
      {children}
    </CorrelationIdContext.Provider>
  )
}
