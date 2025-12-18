import { getAddressValues } from './getAddressValues'

const mockAddress = [
  {
    long_name: '123',
    short_name: '123',
    types: ['street_number'],
  },
  {
    long_name: 'Main St',
    short_name: 'Main St',
    types: ['route'],
  },
  {
    long_name: 'Downtown',
    short_name: 'Downtown',
    types: ['political', 'sublocality', 'sublocality_level_1'],
  },
  {
    long_name: 'Springfield',
    short_name: 'Springfield',
    types: ['administrative_area_level_2'],
  },
  {
    long_name: 'Illinois',
    short_name: 'IL',
    types: ['administrative_area_level_1'],
  },
  {
    long_name: '62704',
    short_name: '62704',
    types: ['postal_code'],
  },
  {
    long_name: 'United States',
    short_name: 'US',
    types: ['country'],
  },
] as google.maps.GeocoderAddressComponent[]

describe('getAddressValues', () => {
  it('should extract all address fields correctly', () => {
    const result = getAddressValues(mockAddress)

    expect(result).toEqual({
      postalCode: '62704',
      street: 'Main St',
      neighborhood: 'Downtown',
      city: 'Springfield',
      state: 'IL',
      country: 'US',
    })
  })

  it('should return empty strings for missing fields', () => {
    const partialAddress = [
      {
        long_name: '456',
        short_name: '456',
        types: ['street_number'],
      },
      {
        long_name: 'Elm St',
        short_name: 'Elm St',
        types: ['route'],
      },
    ] as google.maps.GeocoderAddressComponent[]

    const result = getAddressValues(partialAddress)

    expect(result).toEqual({
      postalCode: '',
      street: 'Elm St',
      neighborhood: '',
      city: '',
      state: '',
      country: '',
    })
  })

  it('should return all empty strings if address is undefined', () => {
    const result = getAddressValues(undefined)

    expect(result).toEqual({
      postalCode: '',
      street: '',
      neighborhood: '',
      city: '',
      state: '',
      country: '',
    })
  })

  it('should return all empty strings if address is undefined', () => {
    const result = getAddressValues(undefined)

    expect(result).toEqual({
      postalCode: '',
      street: '',
      neighborhood: '',
      city: '',
      state: '',
      country: '',
    })
  })

  it('should get street from specific street types when there is no route type', () => {
    const address = [
      {
        long_name: 'Main St',
        short_name: 'Main St',
        types: ['political', 'sublocality', 'sublocality_level_3'],
      },
    ] as google.maps.GeocoderAddressComponent[]

    const result = getAddressValues(address)

    expect(result.street).toBe('Main St')
  })
})
