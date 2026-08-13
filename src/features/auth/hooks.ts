import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { loginUser, logout, clearError } from './authSlice'

export function useAuth() {
  const user = useAppSelector((s) => s.auth.user)
  const status = useAppSelector((s) => s.auth.status)
  const error = useAppSelector((s) => s.auth.error)
  const isAuthenticated = status === 'authenticated'

  return { user, status, error, isAuthenticated }
}

export function useLogin() {
  const dispatch = useAppDispatch()

  const login = useCallback(
    (email: string, password: string) => {
      return dispatch(loginUser({ email, password }))
    },
    [dispatch],
  )

  const signOut = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  const dismissError = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  return { login, signOut, dismissError }
}
