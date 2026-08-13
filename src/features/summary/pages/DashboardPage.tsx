import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useDebouncedValue } from '../../../shared/hooks'
import { fetchClubSummary } from '../summarySlice'
import { fetchMemberList } from '../../members/membersSlice'
import { StatCardGrid } from '../StatCardGrid/StatCardGrid'
import { MemberFilterBar } from '../../members/MemberFilterBar/MemberFilterBar'
import { MemberTable } from '../../members/MemberTable/MemberTable'
import { Pagination } from '../../members/Pagination/Pagination'
import styles from './DashboardPage.module.scss'

const SEARCH_DEBOUNCE_MS = 300

export function DashboardPage() {
  const dispatch = useAppDispatch()
  const memberParams = useAppSelector((s) => s.members.params)
  const debouncedSearch = useDebouncedValue(memberParams.search, SEARCH_DEBOUNCE_MS)

  // Fetch summary on mount
  useEffect(() => {
    dispatch(fetchClubSummary())
  }, [dispatch])

  // Fetch members whenever debounced search or other params change.
  // The thunk uses AbortController internally to cancel stale requests,
  // so rapid typing won't cause out-of-order responses.
  useEffect(() => {
    dispatch(
      fetchMemberList({
        ...memberParams,
        search: debouncedSearch,
      }),
    )
  }, [dispatch, debouncedSearch, memberParams.tier, memberParams.status, memberParams.sort, memberParams.dir, memberParams.page])

  return (
    <div className={styles.page}>
      <StatCardGrid />
      <MemberFilterBar />
      <MemberTable />
      <Pagination />
    </div>
  )
}
