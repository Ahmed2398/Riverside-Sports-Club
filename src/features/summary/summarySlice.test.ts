import { describe, it, expect } from 'vitest'
import summaryReducer, {
  fetchClubSummary,
  type SummaryState,
} from './summarySlice'

describe('summarySlice', () => {
  const initialState: SummaryState = {
    data: null,
    status: 'idle',
    error: null,
  }

  describe('fetchClubSummary.pending', () => {
    it('sets status to loading and clears error', () => {
      const state: SummaryState = { ...initialState, error: 'old error' }
      const action = { type: fetchClubSummary.pending.type }
      const result = summaryReducer(state, action)
      expect(result.status).toBe('loading')
      expect(result.error).toBeNull()
    })
  })

  describe('fetchClubSummary.fulfilled', () => {
    it('stores summary data and sets succeeded', () => {
      const payload = {
        totalMembers: 2000,
        activeMembers: 1333,
        sessionsThisMonth: 8000,
        averageSessionsPerMember: 6.0,
        changeVsLastMonth: 4.7,
      }
      const action = { type: fetchClubSummary.fulfilled.type, payload }
      const result = summaryReducer(initialState, action)
      expect(result.status).toBe('succeeded')
      expect(result.data).toEqual(payload)
      expect(result.error).toBeNull()
    })
  })

  describe('fetchClubSummary.rejected', () => {
    it('sets error message and failed status', () => {
      const action = {
        type: fetchClubSummary.rejected.type,
        payload: {
          message: 'Summary service temporarily unavailable.',
          code: 'UPSTREAM_ERROR',
        },
      }
      const result = summaryReducer(initialState, action)
      expect(result.status).toBe('failed')
      expect(result.data).toBeNull()
      expect(result.error).toBe('Summary service temporarily unavailable.')
    })

    it('uses fallback message when payload is missing', () => {
      const action = { type: fetchClubSummary.rejected.type }
      const result = summaryReducer(initialState, action)
      expect(result.status).toBe('failed')
      expect(result.error).toBe('Failed to load summary')
    })
  })
})
