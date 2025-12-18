import { useQuery } from '@tanstack/react-query'

import { useCorrelationId } from '@/core/providers/hooks/useCorrelationId'
import { getBillingInformation } from '@/modules/account/services/billing-information.service'

type TBillingInformationQueryProps = {
  userId: string | undefined
}

export const useGetInformation = ({
  userId,
}: TBillingInformationQueryProps) => {
  const correlationId = useCorrelationId()

  return useQuery({
    queryKey: ['billingInformation', userId],
    queryFn: () => {
      return getBillingInformation({
        correlationId,
      })
    },
    enabled: Boolean(userId),
    retry: 0,
  })
}
