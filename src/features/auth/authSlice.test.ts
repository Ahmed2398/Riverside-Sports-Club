import { describe, it, expect } from 'vitest'
import authReducer, {
  loginUser,
  logout,
  clearError,
  type AuthState,
} from './authSlice'

describe('authSlice', () => {
  const initialState: AuthState = {
    user: null,
    token: null,
    status: 'unauthenticated',
    error: null,
  }

  describe('logout', () => {
    it('clears user, token, and error', () => {
      const state: AuthState = {
        user: { id: 1, name: { ar: 'مدير', en: 'Admin' }, email: 'a@b.com', role: 'admin' },
        token: 'abc',
        status: 'authenticated',
        error: 'some error',
      }
      const result = authReducer(state, logout())
      expect(result.user).toBeNull()
      expect(result.token).toBeNull()
      expect(result.status).toBe('unauthenticated')
      expect(result.error).toBeNull()
    })
  })

  describe('clearError', () => {
    it('clears the error field', () => {
      const state: AuthState = { ...initialState, error: 'bad creds' }
      const result = authReducer(state, clearError())
      expect(result.error).toBeNull()
    })
  })

  describe('loginUser.pending', () => {
    it('sets status to loading and clears error', () => {
      const state: AuthState = { ...initialState, error: 'old error' }
      const action = { type: loginUser.pending.type }
      const result = authReducer(state, action)
      expect(result.status).toBe('loading')
      expect(result.error).toBeNull()
    })
  })

  describe('loginUser.fulfilled', () => {
    it('sets user and authenticated status', () => {
      const user = { id: 1, name: { ar: 'مدير', en: 'Admin' }, email: 'a@b.com', role: 'admin' as const }
      const action = { type: loginUser.fulfilled.type, payload: user }
      const result = authReducer(initialState, action)
      expect(result.user).toEqual(user)
      expect(result.status).toBe('authenticated')
      expect(result.error).toBeNull()
    })
  })

  describe('loginUser.rejected', () => {
    it('sets error and unauthenticated status', () => {
      const action = {
        type: loginUser.rejected.type,
        payload: { message: 'Invalid email or password.', code: 'INVALID_CREDENTIALS' },
      }
      const result = authReducer(initialState, action)
      expect(result.status).toBe('unauthenticated')
      expect(result.user).toBeNull()
      expect(result.token).toBeNull()
      expect(result.error).toBe('Invalid email or password.')
    })
  })
})
