/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOCAL_CONTEXT: string
  readonly VITE_KEYCLOAK_URL: string
  readonly VITE_KEYCLOAK_REALM: string
  readonly VITE_KEYCLOAK_CLIENT_ID: string
  readonly VITE_DARWIN_AUTH_REDIRECT_URID: string
  readonly VITE_DARWIN_AUTH_ENTITLEMENT_MANAGER_URL: string
  readonly VITE_BILLING_USERS_BFF_URL: string
  readonly VITE_BILLING_HISTORY_MIN_YEAR: string
  readonly VITE_HELP_CENTER_URL: string
  readonly VITE_GOOGLE_MAPS_API_KEY: string
  readonly VITE_ACCOUNT_MANAGER_URL: string
  readonly VITE_WELLHUB_LINKS_URL: string
  readonly VITE_SNOWPLOW_URL: string
  readonly VITE_UNIFIED_CHECKOUT_FRONT_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
