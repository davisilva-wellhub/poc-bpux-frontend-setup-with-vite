import type { AxiosResponse } from 'axios'

import { billingUsersBffClient } from '@/core/clients/billing-users-bff.client'

import { CreateBillingInformationMapper } from './mappers/CreateBillingInformationMapper'
import { UpdateBillingInformationMapper } from './mappers/UpdateBillingInformationMapper'

export const HEADERS = {
  CORRELATION_ID: 'x-gympass-correlation-id',
} as const

export interface IBillingInformation {
  taxIdNumber: string
  postalCode: string
  street: string
  doorNumber: string
  street2: string
  neighborhood: string
  city: string
  state: string
  country: string
}

type TGetBillingInformationProps = {
  correlationId: string
}

const getBillingInformation = async ({
  correlationId,
}: TGetBillingInformationProps): Promise<IBillingInformation> => {
  const { data } = await billingUsersBffClient.get(
    '/account/v1/billing-information',
    {
      headers: { [HEADERS.CORRELATION_ID]: correlationId },
    }
  )

  return {
    ...data,
    street: data?.line1,
    street2: data?.line2,
  }
}

type TCreateBillingInformationProps = {
  userId: string
  correlationId: string
  billingInformation: IBillingInformation
}

const createBillingInformation = ({
  userId,
  correlationId,
  billingInformation,
}: TCreateBillingInformationProps): Promise<AxiosResponse> => {
  const payload = CreateBillingInformationMapper.toPersistence({
    userId,
    billingInformation,
  })

  return billingUsersBffClient.post(
    '/account/v1/billing-information',
    payload,
    {
      headers: { [HEADERS.CORRELATION_ID]: correlationId },
    }
  )
}

type TUpdateBillingInformationProps = {
  correlationId: string
  billingInformation: IBillingInformation
}

const updateBillingInformation = ({
  correlationId,
  billingInformation,
}: TUpdateBillingInformationProps): Promise<AxiosResponse> => {
  const payload = UpdateBillingInformationMapper.toPersistence({
    billingInformation,
  })

  return billingUsersBffClient.put('/account/v1/billing-information', payload, {
    headers: { [HEADERS.CORRELATION_ID]: correlationId },
  })
}

export {
  createBillingInformation,
  getBillingInformation,
  updateBillingInformation,
}
