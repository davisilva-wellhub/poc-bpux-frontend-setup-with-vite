import { BRAZIL_COUNTRY_STATES_LIST } from '../constants'
import { BILLING_INFORMATION_COUNTRY_SETTINGS } from './index'

describe('BILLING_INFORMATION_COUNTRY_SETTINGS', () => {
  it('should BILLING_INFORMATION_COUNTRY_SETTINGS have proper settings', () => {
    expect(BILLING_INFORMATION_COUNTRY_SETTINGS.googleMapsCountryKey).toBe('br')
    expect(BILLING_INFORMATION_COUNTRY_SETTINGS.statesList).toEqual(
      BRAZIL_COUNTRY_STATES_LIST
    )
    expect(BILLING_INFORMATION_COUNTRY_SETTINGS.zipCodeLength).toBe(8)
    expect(BILLING_INFORMATION_COUNTRY_SETTINGS.googleMapsTypes).toContain(
      'postal_code'
    )
    expect(BILLING_INFORMATION_COUNTRY_SETTINGS.googleMapsFields).toContain(
      'address_components'
    )
  })
})
