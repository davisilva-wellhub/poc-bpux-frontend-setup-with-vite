import axios from 'axios'

import { getAuthToken } from '@/core/config/auth-token-store'

const billingUsersBffClient = axios.create({
  baseURL: import.meta.env.VITE_BILLING_USERS_BFF_URL,
})

billingUsersBffClient.interceptors.request.use(
  config => {
    const token = getAuthToken()

    console.log('[MFE Axios Interceptor] Token:', token ? 'EXISTS' : 'NULL')
    console.log('[MFE Axios Interceptor] Request URL:', config.url)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      console.warn('[MFE Axios Interceptor] No token available for request')
    }

    return config
  },
  error => Promise.reject(error)
)

export { billingUsersBffClient }
