import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { ApiException } from '../../shared/api/errors'
import type { AuthUser } from '../../shared/api/types'
import {
  loginRequest,
  persistSession,
  clearSession,
  getStoredAuth,
} from './authService'

export interface AuthState {
  user: AuthUser | null
  token: string | null
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated'
  error: string | null
}

const stored = getStoredAuth()

const initialState: AuthState = {
  user: stored.user,
  token: stored.token,
  status: stored.token ? 'authenticated' : 'unauthenticated',
  error: null,
}

interface LoginArgs {
  email: string
  password: string
}

export const loginUser = createAsyncThunk<
  AuthUser,
  LoginArgs,
  { rejectValue: { message: string; code: string } }
>('auth/login', async (args, { rejectWithValue }) => {
  try {
    const response = await loginRequest(args.email, args.password)
    persistSession(response)
    return response.user
  } catch (error) {
    if (error instanceof ApiException) {
      return rejectWithValue({ message: error.message, code: error.code })
    }
    return rejectWithValue({
      message: 'An unexpected error occurred. Please try again.',
      code: 'UNKNOWN_ERROR',
    })
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      clearSession()
      state.user = null
      state.token = null
      state.status = 'unauthenticated'
      state.error = null
    },
    clearError(state) {
      state.error = null
    },
    restoreSession(state, action: PayloadAction<{ user: AuthUser; token: string }>) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.status = 'authenticated'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = 'authenticated'
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'unauthenticated'
        state.user = null
        state.token = null
        state.error = action.payload?.message ?? 'Login failed'
      })
  },
})

export const { logout, clearError, restoreSession } = authSlice.actions
export default authSlice.reducer
