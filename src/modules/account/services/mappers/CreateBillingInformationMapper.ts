import { IBillingInformation } from '../billing-information.service'

const COUNTRIES_REFERENCES = {
  Brasil: 'BR',
}

type TProps = {
  userId: string
  billingInformation: IBillingInformation
}

export class CreateBillingInformationMapper {
  static toPersistence({ userId, billingInformation }: TProps) {
    return {
      reference: userId,
      taxIdNumber: billingInformation?.taxIdNumber,
      city: billingInformation?.city,
      country:
        COUNTRIES_REFERENCES[
          billingInformation?.country as keyof typeof COUNTRIES_REFERENCES
        ] || billingInformation?.country,
      doorNumber: billingInformation?.doorNumber,
      line1: billingInformation?.street,
      line2: billingInformation?.street2 || null,
      neighborhood: billingInformation?.neighborhood,
      postalCode: billingInformation?.postalCode,
      state: billingInformation?.state,
    }
  }
}
