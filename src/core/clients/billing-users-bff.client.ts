import axios from 'axios'

import { getAuthToken } from '@/core/config/auth-token-store'

const billingUsersBffClient = axios.create({
  baseURL: import.meta.env.VITE_BILLING_USERS_BFF_URL,
})

billingUsersBffClient.interceptors.request.use(
  config => {
    const token = getAuthToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => Promise.reject(error)
)

export { billingUsersBffClient }
