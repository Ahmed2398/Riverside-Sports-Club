import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ApiException } from '../../shared/api/errors'
import type { ClubSummary } from '../../shared/api/types'
import { fetchSummary } from './summaryService'

export interface SummaryState {
  data: ClubSummary | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: SummaryState = {
  data: null,
  status: 'idle',
  error: null,
}

export const fetchClubSummary = createAsyncThunk<
  ClubSummary,
  void,
  { rejectValue: { message: string; code: string } }
>('summary/fetch', async (_, { rejectWithValue }) => {
  try {
    return await fetchSummary()
  } catch (error) {
    if (error instanceof ApiException) {
      return rejectWithValue({ message: error.message, code: error.code })
    }
    return rejectWithValue({
      message: 'An unexpected error occurred.',
      code: 'UNKNOWN_ERROR',
    })
  }
})

const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubSummary.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchClubSummary.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
        state.error = null
      })
      .addCase(fetchClubSummary.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message ?? 'Failed to load summary'
      })
  },
})

export default summarySlice.reducer
