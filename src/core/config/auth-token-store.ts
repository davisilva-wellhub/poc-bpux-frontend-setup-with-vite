let authToken: string | null = null

export const setAuthToken = (token?: string | null) => {
  authToken = token ?? null
}

export const getAuthToken = (): string | null => authToken
