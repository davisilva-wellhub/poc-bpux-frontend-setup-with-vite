import { screen } from '@testing-library/dom'

import { renderWithTheme } from '@/test-utils/render'

import { ConfirmationDrawer } from '.'

describe('ConfirmationDrawer', () => {
  it('placeholder test', () => {
    renderWithTheme(
      <ConfirmationDrawer
        isLoading={false}
        isOpen={true}
        billingInformation={{
          city: 'São Paulo',
          country: 'Brazil',
          state: 'SP',
          street: 'Av. Paulista, 1000',
          postalCode: '01310-100',
          doorNumber: '100',
          street2: 'Apto 101',
          taxIdNumber: '12.345.678/0001-99',
          neighborhood: 'Bela Vista',
        }}
        onCloseClicked={vi.fn()}
        onConfirmClicked={vi.fn()}
      />
    )
    screen.logTestingPlaygroundURL()
  })
})
