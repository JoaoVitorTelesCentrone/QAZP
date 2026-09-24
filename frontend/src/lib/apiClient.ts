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

const REFRESH_TIMEOUT_MS = 10000

// 'expired' = the server rejected the refresh token, so the session is really over.
// 'failed' = network error, timeout or server error: keep the session and just fail the request.
type RefreshResult = { status: 'ok'; token: string } | { status: 'expired' } | { status: 'failed' }

// Shared across concurrent 401s so the refresh token is only rotated once.
let refreshPromise: Promise<RefreshResult> | null = null

async function refreshAccessToken(): Promise<RefreshResult> {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
  if (!refreshToken) return { status: 'expired' }

  try {
    const { data } = await axios.post(
      `${baseURL}/User/refresh`,
      { refreshToken },
      { timeout: REFRESH_TIMEOUT_MS },
    )
    saveSession(data.token, data.refreshToken)
    return { status: 'ok', token: data.token }
  } catch (error) {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined
    return status === 400 || status === 401 ? { status: 'expired' } : { status: 'failed' }
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
      const result = await refreshPromise
      if (result.status === 'ok') {
        original.headers.Authorization = `Bearer ${result.token}`
        return apiClient(original)
      }
      if (result.status === 'failed') {
        return Promise.reject(error)
      }
    }

    clearSession()
    window.location.href = '/'
    return Promise.reject(error)
  },
)
