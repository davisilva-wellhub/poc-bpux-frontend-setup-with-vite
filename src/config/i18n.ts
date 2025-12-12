import { buildCache } from '@gympass/i18n-cache-web';
import { init } from '@gympass/i18n';

import { APP_LOCALE, LOCALIZATION_NAMESPACE } from '.';

init({
  namespace: LOCALIZATION_NAMESPACE,
  language: APP_LOCALE,
  cache: buildCache(),
  staging: !import.meta.env.PROD,
  react: {
    transKeepBasicHtmlNodesFor: ['b', 'br', 'i', 'strong'],
  },
  enableOTAUpdate: true,
});
