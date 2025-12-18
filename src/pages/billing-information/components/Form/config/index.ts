import { BRAZIL_COUNTRY_STATES_LIST } from '../constants'

const BILLING_INFORMATION_COUNTRY_SETTINGS = {
  googleMapsCountryKey: 'br',
  statesList: BRAZIL_COUNTRY_STATES_LIST,
  zipCodeLength: 8,
  googleMapsTypes: ['postal_code'],
  googleMapsFields: ['address_components'],
}

export { BILLING_INFORMATION_COUNTRY_SETTINGS }
