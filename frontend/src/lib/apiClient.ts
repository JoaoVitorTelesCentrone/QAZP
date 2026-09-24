import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export const TOKEN_KEY = 'token'
export const REFRESH_TOKEN_KEY = 'refreshToken'

export const apiClient = axios.create({
  baseURL,
  timeout: 20000,
})

export function saveSession(token: string, refreshToken: string) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export async function logout() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
  clearSession()
  if (refreshToken) {
    await axios.post(`${baseURL}/User/logout`, { refreshToken }).catch(() => {})
  }
}

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Shared across concurrent 401s so the refresh token is only rotated once.
let refreshPromise: Promise<string | null> | null = null

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
  if (!refreshToken) return null

  try {
    const { data } = await axios.post(`${baseURL}/User/refresh`, { refreshToken })
    saveSession(data.token, data.refreshToken)
    return data.token
  } catch {
    return null
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined
    const isLoginRequest = original?.url?.toLowerCase().includes('/user/login')

    if (error.response?.status !== 401 || !original || isLoginRequest || typeof window === 'undefined') {
      return Promise.reject(error)
    }

    if (!original._retry) {
      original._retry = true
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null
      })
      const newToken = await refreshPromise
      if (newToken) {
        original.headers.Authorization = `Bearer ${newToken}`
        return apiClient(original)
      }
    }

    clearSession()
    window.location.href = '/'
    return Promise.reject(error)
  },
)
