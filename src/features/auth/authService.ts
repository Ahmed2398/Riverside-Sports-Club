import { apiClient } from '../../shared/api/client'
import type { AuthUser, LoginResponse } from '../../shared/api/types'

const TOKEN_KEY = 'rsc_token'
const USER_KEY = 'rsc_user'

export const tokenStorage = {
  get(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },
  set(token: string): void {
    localStorage.setItem(TOKEN_KEY, token)
  },
  clear(): void {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },
}

export const userStorage = {
  get(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as AuthUser
    } catch {
      return null
    }
  },
  set(user: AuthUser): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },
}

export async function loginRequest(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/api/auth/login', {
    email,
    password,
  })
  return data
}

export function persistSession(response: LoginResponse): void {
  tokenStorage.set(response.token)
  userStorage.set(response.user)
}

export function clearSession(): void {
  tokenStorage.clear()
}

export function getStoredAuth(): { token: string | null; user: AuthUser | null } {
  return {
    token: tokenStorage.get(),
    user: userStorage.get(),
  }
}
