import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { ApiException } from '../../shared/api/errors'
import type { MemberDetail, Paginated, Session } from '../../shared/api/types'
import { fetchMemberDetail, fetchMemberSessions } from './memberDetailService'

export interface MemberDetailState {
  member: MemberDetail | null
  sessions: Session[]
  sessionsMeta: Paginated<Session>['meta'] | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  isOpen: boolean
  selectedMemberId: number | null
}

const initialState: MemberDetailState = {
  member: null,
  sessions: [],
  sessionsMeta: null,
  status: 'idle',
  error: null,
  isOpen: false,
  selectedMemberId: null,
}

export const fetchMemberDetailData = createAsyncThunk<
  { member: MemberDetail; sessions: Paginated<Session> },
  number,
  { rejectValue: { message: string; code: string } }
>('memberDetail/fetch', async (id, { rejectWithValue }) => {
  try {
    const [member, sessions] = await Promise.all([
      fetchMemberDetail(id),
      fetchMemberSessions(id, 1, 10),
    ])
    return { member, sessions }
  } catch (error) {
    if (error instanceof ApiException) {
      return rejectWithValue({ message: error.message, code: error.code })
    }
    return rejectWithValue({
      message: 'Failed to load member details.',
      code: 'UNKNOWN_ERROR',
    })
  }
})

const memberDetailSlice = createSlice({
  name: 'memberDetail',
  initialState,
  reducers: {
    openMemberDetail(state, action: PayloadAction<number>) {
      state.isOpen = true
      state.selectedMemberId = action.payload
    },
    closeMemberDetail(state) {
      state.isOpen = false
      state.selectedMemberId = null
      state.member = null
      state.sessions = []
      state.sessionsMeta = null
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemberDetailData.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchMemberDetailData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.member = action.payload.member
        state.sessions = action.payload.sessions.data
        state.sessionsMeta = action.payload.sessions.meta
        state.error = null
      })
      .addCase(fetchMemberDetailData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message ?? 'Failed to load member details'
      })
  },
})

export const { openMemberDetail, closeMemberDetail } = memberDetailSlice.actions
export default memberDetailSlice.reducer
