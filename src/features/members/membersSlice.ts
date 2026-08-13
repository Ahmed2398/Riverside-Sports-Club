import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { ApiException } from '../../shared/api/errors'
import type { Paginated, MemberListItem, MemberListParams } from '../../shared/api/types'
import { fetchMembers } from './membersService'

export interface MembersState {
  data: MemberListItem[]
  meta: Paginated<MemberListItem>['meta'] | null
  params: MemberListParams
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const DEFAULT_PARAMS: MemberListParams = {
  page: 1,
  per_page: 25,
  search: '',
  tier: undefined,
  status: undefined,
  sort: 'name',
  dir: 'asc',
}

const initialState: MembersState = {
  data: [],
  meta: null,
  params: DEFAULT_PARAMS,
  status: 'idle',
  error: null,
}

// Race-condition-safe thunk: each call aborts the previous in-flight request.
// This ensures that if a user types quickly, only the latest request's response
// is committed to state — stale responses are cancelled via AbortController.
export const fetchMemberList = createAsyncThunk<
  Paginated<MemberListItem>,
  MemberListParams,
  { rejectValue: { message: string; code: string } }
>('members/fetch', async (params, { signal, rejectWithValue }) => {
  try {
    return await fetchMembers(params, signal)
  } catch (error) {
    if (axios.isCancel(error) || (error instanceof Error && error.name === 'CanceledError')) {
      return rejectWithValue({ message: 'cancelled', code: 'CANCELLED' })
    }
    if (error instanceof ApiException) {
      return rejectWithValue({ message: error.message, code: error.code })
    }
    return rejectWithValue({
      message: 'An unexpected error occurred.',
      code: 'UNKNOWN_ERROR',
    })
  }
})

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.params.search = action.payload
      state.params.page = 1
    },
    setTier(state, action: PayloadAction<'basic' | 'standard' | 'premium' | undefined>) {
      state.params.tier = action.payload
      state.params.page = 1
    },
    setStatus(state, action: PayloadAction<'active' | 'paused' | 'expired' | undefined>) {
      state.params.status = action.payload
      state.params.page = 1
    },
    setSort(state, action: PayloadAction<NonNullable<MemberListParams['sort']>>) {
      if (state.params.sort === action.payload) {
        state.params.dir = state.params.dir === 'asc' ? 'desc' : 'asc'
      } else {
        state.params.sort = action.payload
        state.params.dir = 'asc'
      }
    },
    setPage(state, action: PayloadAction<number>) {
      state.params.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemberList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchMemberList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload.data
        state.meta = action.payload.meta
        state.error = null
      })
      .addCase(fetchMemberList.rejected, (state, action) => {
        if (action.payload?.code === 'CANCELLED') return
        state.status = 'failed'
        state.error = action.payload?.message ?? 'Failed to load members'
      })
  },
})

export const { setSearch, setTier, setStatus, setSort, setPage } = membersSlice.actions
export default membersSlice.reducer
