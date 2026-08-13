import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { fetchClubSummary } from '../summarySlice'
import { StatCard } from '../StatCard/StatCard'
import styles from './StatCardGrid.module.scss'

export function StatCardGrid() {
  const dispatch = useAppDispatch()
  const { data, status } = useAppSelector((s) => s.summary)

  const handleRetry = useCallback(() => {
    dispatch(fetchClubSummary())
  }, [dispatch])

  const isLoading = status === 'loading' || status === 'idle'
  const isFailed = status === 'failed'

  return (
    <div className={styles.grid}>
      <StatCard
        label="Members"
        value={data?.totalMembers}
        loading={isLoading}
      />
      <StatCard
        label="Active"
        value={data?.activeMembers}
        loading={isLoading}
      />
      <StatCard
        label="Sessions"
        value={data?.sessionsThisMonth}
        loading={isLoading}
      />
      <StatCard
        label="Avg Sessions"
        value={data?.averageSessionsPerMember}
        loading={isLoading}
        variant={isFailed ? 'error' : 'default'}
        onRetry={isFailed ? handleRetry : undefined}
      />
    </div>
  )
}
