import { describe, it, expect } from 'vitest'
import membersReducer, {
  fetchMemberList,
  setSearch,
  setTier,
  setStatus,
  setSort,
  setPage,
  type MembersState,
} from './membersSlice'

describe('membersSlice', () => {
  const initialState: MembersState = {
    data: [],
    meta: null,
    params: {
      page: 1,
      per_page: 25,
      search: '',
      tier: undefined,
      status: undefined,
      sort: 'name',
      dir: 'asc',
    },
    status: 'idle',
    error: null,
  }

  describe('setSearch', () => {
    it('sets search and resets page to 1', () => {
      const state: MembersState = {
        ...initialState,
        params: { ...initialState.params, page: 3 },
      }
      const result = membersReducer(state, setSearch('john'))
      expect(result.params.search).toBe('john')
      expect(result.params.page).toBe(1)
    })
  })

  describe('setTier', () => {
    it('sets tier and resets page to 1', () => {
      const state: MembersState = {
        ...initialState,
        params: { ...initialState.params, page: 5 },
      }
      const result = membersReducer(state, setTier('premium'))
      expect(result.params.tier).toBe('premium')
      expect(result.params.page).toBe(1)
    })

    it('clears tier when undefined', () => {
      const state: MembersState = {
        ...initialState,
        params: { ...initialState.params, tier: 'basic' },
      }
      const result = membersReducer(state, setTier(undefined))
      expect(result.params.tier).toBeUndefined()
    })
  })

  describe('setStatus', () => {
    it('sets status and resets page to 1', () => {
      const result = membersReducer(initialState, setStatus('active'))
      expect(result.params.status).toBe('active')
      expect(result.params.page).toBe(1)
    })
  })

  describe('setSort', () => {
    it('sets sort column and defaults to asc for new column', () => {
      const result = membersReducer(initialState, setSort('sessionsThisMonth'))
      expect(result.params.sort).toBe('sessionsThisMonth')
      expect(result.params.dir).toBe('asc')
    })

    it('toggles direction when same column is clicked', () => {
      const state: MembersState = {
        ...initialState,
        params: { ...initialState.params, sort: 'name', dir: 'asc' },
      }
      const result = membersReducer(state, setSort('name'))
      expect(result.params.dir).toBe('desc')
    })

    it('toggles back to asc on second click', () => {
      const state: MembersState = {
        ...initialState,
        params: { ...initialState.params, sort: 'name', dir: 'desc' },
      }
      const result = membersReducer(state, setSort('name'))
      expect(result.params.dir).toBe('asc')
    })
  })

  describe('setPage', () => {
    it('sets the page number', () => {
      const result = membersReducer(initialState, setPage(3))
      expect(result.params.page).toBe(3)
    })
  })

  describe('fetchMemberList.pending', () => {
    it('sets status to loading and clears error', () => {
      const state: MembersState = { ...initialState, error: 'old error' }
      const action = { type: fetchMemberList.pending.type }
      const result = membersReducer(state, action)
      expect(result.status).toBe('loading')
      expect(result.error).toBeNull()
    })
  })

  describe('fetchMemberList.fulfilled', () => {
    it('stores data and meta, sets succeeded', () => {
      const payload = {
        data: [
          {
            id: 1,
            memberNumber: 'RSC-0001',
            name: { ar: 'أحمد', en: 'Ahmed' },
            tier: 'basic' as const,
            status: 'active' as const,
            sessionsThisMonth: 12,
            monthlyGoal: 20,
            totalSessions: 150,
          },
        ],
        meta: { page: 1, per_page: 25, total: 2000, last_page: 80 },
      }
      const action = { type: fetchMemberList.fulfilled.type, payload }
      const result = membersReducer(initialState, action)
      expect(result.status).toBe('succeeded')
      expect(result.data).toHaveLength(1)
      expect(result.meta).toEqual(payload.meta)
      expect(result.error).toBeNull()
    })
  })

  describe('fetchMemberList.rejected', () => {
    it('sets error and failed status for non-cancelled errors', () => {
      const action = {
        type: fetchMemberList.rejected.type,
        payload: { message: 'Network error', code: 'NETWORK_ERROR' },
      }
      const result = membersReducer(initialState, action)
      expect(result.status).toBe('failed')
      expect(result.error).toBe('Network error')
    })

    it('ignores cancelled requests', () => {
      const state: MembersState = { ...initialState, status: 'loading' }
      const action = {
        type: fetchMemberList.rejected.type,
        payload: { message: 'cancelled', code: 'CANCELLED' },
      }
      const result = membersReducer(state, action)
      expect(result.status).toBe('loading')
    })
  })
})
