import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { ApiException } from './errors'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// --- Request interceptor: attach Bearer token and Accept-Language header ---
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('rsc_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Add Accept-Language header based on current locale
    const locale = localStorage.getItem('rsc_locale') || 'en'
    config.headers['Accept-Language'] = locale === 'ar' ? 'ar' : 'en'
    
    return config
  },
  (error) => Promise.reject(error),
)

// --- Response interceptor: normalize errors into ApiException ---
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response
      return Promise.reject(ApiException.fromResponse(status, data))
    }
    if (error.request) {
      return Promise.reject(
        new ApiException(0, 'NETWORK_ERROR', 'Network error — could not reach the server'),
      )
    }
    return Promise.reject(
      new ApiException(0, 'UNKNOWN_ERROR', error.message ?? 'An unexpected error occurred'),
    )
  },
)
