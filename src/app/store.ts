import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import summaryReducer from '../features/summary/summarySlice'
import membersReducer from '../features/members/membersSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      summary: summaryReducer,
      members: membersReducer,
    },
  })
}

export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
