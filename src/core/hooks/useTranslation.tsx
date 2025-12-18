import {
  type Namespace,
  useTranslation as useTranslation18n,
  type UseTranslationResponse,
} from '@gympass/i18n'

import { LOCALIZATION_NAMESPACE } from '@/config'

const parseToLocalizeKey = (string: string) => string?.toLowerCase() || ''

export const useTranslation = (keyPrefix?: string) => {
  const { t: translate, ...rest } = useTranslation18n(LOCALIZATION_NAMESPACE, {
    keyPrefix,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any

  const t = (key: string, ...args: unknown[]) => {
    const parsedKey = parseToLocalizeKey(key)
    return translate(parsedKey, ...args)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { t, ...rest } as UseTranslationResponse<Namespace, any>
}
