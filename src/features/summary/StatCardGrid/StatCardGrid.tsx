import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useTranslation } from '../../../shared/i18n'
import { fetchClubSummary } from '../summarySlice'
import { StatCard } from '../StatCard/StatCard'
import styles from './StatCardGrid.module.scss'

export function StatCardGrid() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { data, status } = useAppSelector((s) => s.summary)

  const handleRetry = useCallback(() => {
    dispatch(fetchClubSummary())
  }, [dispatch])

  const isLoading = status === 'loading' || status === 'idle'
  const isFailed = status === 'failed'

  return (
    <div className={styles.grid}>
      <StatCard
        label={t('stats.totalMembers')}
        value={data?.totalMembers}
        loading={isLoading}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        }
      />
      <StatCard
        label={t('stats.activeMembers')}
        value={data?.activeMembers}
        loading={isLoading}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        }
      />
      <StatCard
        label={t('stats.sessionsThisMonth')}
        value={data?.sessionsThisMonth}
        loading={isLoading}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        }
      />
      <StatCard
        label={t('stats.avgSessions')}
        value={data?.averageSessionsPerMember}
        loading={isLoading}
        variant={isFailed ? 'error' : 'default'}
        onRetry={isFailed ? handleRetry : undefined}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        }
      />
    </div>
  )
}
