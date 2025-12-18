import { useMutation } from '@tanstack/react-query'

import {
  createBillingInformation,
  updateBillingInformation,
} from '../../services/billing-information.service'

type TBillingInformationMutationProps = {
  hasCurrentBillingInfo: boolean
  onSuccess: () => void
  onError: () => void
}

export const useBillingInformationMutation = ({
  hasCurrentBillingInfo,
  onSuccess,
  onError,
}: TBillingInformationMutationProps) =>
  useMutation({
    mutationFn: hasCurrentBillingInfo
      ? updateBillingInformation
      : createBillingInformation,
    onSuccess: () => onSuccess(),
    onError: () => onError(),
  })
