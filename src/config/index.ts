import { getCurrentLanguage } from '@gympass/i18n-language-web'

export const LOCALIZATION_NAMESPACE = 'billing-users-mfe'

export const APP_LOCALE = getCurrentLanguage() || 'en'
