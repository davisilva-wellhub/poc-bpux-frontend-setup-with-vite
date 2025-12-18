import { useContext } from 'react'

import { CorrelationIdContext } from '../CorrelationIdContext'

export const useCorrelationId = () => useContext(CorrelationIdContext)
