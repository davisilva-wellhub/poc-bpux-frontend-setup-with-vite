import { isValidCEP, isValidCPF } from '@gympass/bpux-billing-utils'
import { z } from 'zod'

// eslint-disable-next-line no-useless-escape
const addressRegex = /^(?=\S)[^@\[\]{}*|!?"%$();<>]+$/

const billInfoSchema = (
  t: (key: string, options: { defaultValue: string }) => string
) => {
  return z.object({
    taxIdNumber: z
      .string()
      .min(1, 'Required')
      .refine(value => isValidCPF(value), {
        message: t('billing_information.form.cpf.invalid', {
          defaultValue: 'Enter a valid CPF.',
        }),
      }),
    postalCode: z
      .string()
      .min(1, 'Required')
      .refine(value => isValidCEP(value), {
        message: 'Invalid postalCode format',
      }),
    street: z
      .string()
      .min(1, 'Required')
      .regex(addressRegex, 'Invalid address format'),
    doorNumber: z.string(),
    street2: z.string(),
    neighborhood: z.string().min(1, 'Required'),
    city: z.string().min(1, 'Required'),
    state: z.string().min(1, 'Required'),
    country: z.string().min(1, 'Required'),
  })
}

export { billInfoSchema }
export type BillInfoFormValues = z.infer<ReturnType<typeof billInfoSchema>>
