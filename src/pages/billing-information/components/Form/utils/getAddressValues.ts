import { COUNTRIES_NAMES } from '../constants'

type TAddressValues = {
  postalCode: string
  street: string
  neighborhood: string
  city: string
  state: string
  country: string
}

export const getAddressValues = (
  address: Array<google.maps.GeocoderAddressComponent> | undefined
): TAddressValues => {
  const streetTypes = ['political', 'sublocality', 'sublocality_level_3']
  const neighborhoodTypes = ['political', 'sublocality', 'sublocality_level_1']

  const street =
    address?.find(
      item =>
        item.types.includes('route') ||
        streetTypes.every(type => item.types.includes(type))
    )?.long_name || ''

  const neighborhood =
    address?.find(item =>
      neighborhoodTypes.every(type => item.types.includes(type))
    )?.long_name || ''

  const city =
    address?.find(item => item.types.includes('administrative_area_level_2'))
      ?.long_name || ''

  const state =
    address?.find(item => item.types.includes('administrative_area_level_1'))
      ?.short_name || ''

  const postalCode =
    address?.find(item => item.types.includes('postal_code'))?.short_name || ''

  const country =
    address?.find(item => item.types.includes('country'))?.short_name || ''

  return {
    postalCode,
    street,
    neighborhood,
    city,
    state,
    country:
      COUNTRIES_NAMES[country as keyof typeof COUNTRIES_NAMES] || country,
  }
}
