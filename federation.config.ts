export interface FederationConfig {
  name: string
  filename: string
  exposes: Record<string, string>
  remotes?: Record<string, string>
  shared: Record<string, any>
}

export const exposedModules = {
  './BillingInformation': './src/pages/billing-information/index.tsx',
}

export const remoteModules: Record<string, string> = {}

export const sharedDependencies = {
  react: {
    singleton: true,
    requiredVersion: '^19.2.0',
  },
  'react-dom': {
    singleton: true,
    requiredVersion: '^19.2.0',
  },
  'react-router-dom': {
    singleton: true,
    requiredVersion: '^7.10.1',
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
  '@gympass/darwin-auth': {
    singleton: true,
  },
  'styled-components': {
    singleton: true,
  },
}

export const federationConfig: FederationConfig = {
  name: 'billing_information',
  filename: 'remoteEntry.js',
  exposes: exposedModules,
  remotes: remoteModules,
  shared: sharedDependencies,
}

export default federationConfig
