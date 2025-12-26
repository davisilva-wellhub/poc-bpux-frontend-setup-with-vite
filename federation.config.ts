export interface FederationConfig {
  name: string
  filename: string
  exposes: Record<string, string>
  remotes?: Record<string, string>
  shared: Record<string, any>
}

export const exposedModules = {
  './BillingInformationPage': './src/exposes/BillingInformationExpose.tsx',
}

export const remoteModules: Record<string, string> = {}

export const sharedDependencies = {
  react: {
    singleton: true,
    requiredVersion: false,
  },
  'react-dom': {
    singleton: true,
    requiredVersion: false,
  },
  'react-router-dom': {
    singleton: true,
    requiredVersion: false,
  },
  '@tanstack/react-query': {
    singleton: true,
    requiredVersion: '^5.90.12',
  },
  '@emotion/react': {
    singleton: true,
  },
  '@emotion/styled': {
    singleton: true,
  },
  '@mui/material': {
    singleton: true,
  },
  '@mui/lab': {
    singleton: true,
  },
  '@gympass/tai-chi': {
    singleton: true,
  },
  '@gympass/i18n': {
    singleton: true,
  },
  '@gympass/keycloak-auth-js': {
    singleton: true,
  },
  '@gympass/darwin-auth': {
    singleton: true,
  },
  'react-hook-form': {
    singleton: true,
  },
  'react-google-autocomplete': {
    singleton: true,
  },
  'styled-components': {
    singleton: true,
  },
}

export const federationConfig: FederationConfig = {
  name: 'billingInformationMFE',
  filename: 'remoteEntry.js',
  exposes: exposedModules,
  remotes: remoteModules,
  shared: sharedDependencies,
}

export default federationConfig
