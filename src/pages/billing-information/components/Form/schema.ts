import { isValidCEP, isValidCPF } from '@gympass/bpux-billing-utils'
import * as Yup from 'yup'

// eslint-disable-next-line no-useless-escape
const addressRegex = /^(?=\S)[^@\[\]{}*|!?"%$();<>]+$/

const billInfoSchema = (
  t: (key: string, options: { defaultValue: string }) => string
) => {
  return Yup.object().shape({
    taxIdNumber: Yup.string()
      .required('Required')
      .test(
        'is-valid',
        t('billing_information.form.cpf.invalid', {
          defaultValue: 'Enter a valid CPF.',
        }),
        value => {
          return isValidCPF(value)
        }
      ),
    postalCode: Yup.string()
      .required('Required')
      .test('is-valid', 'Invalid postalCode format', value => {
        return isValidCEP(value)
      }),
    street: Yup.string()
      .required('Required')
      .matches(addressRegex, 'Invalid address format'),
    doorNumber: Yup.string(),
    street2: Yup.string().matches(addressRegex, 'Invalid address format'),
    neighborhood: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
  })
}

export { billInfoSchema }
