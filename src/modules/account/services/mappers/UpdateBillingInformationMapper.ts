import { IBillingInformation } from '../billing-information.service'

const COUNTRIES_REFERENCES = {
  Brasil: 'BR',
}

type TProps = {
  billingInformation: IBillingInformation
}

export class UpdateBillingInformationMapper {
  static toPersistence({ billingInformation }: TProps) {
    return {
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
