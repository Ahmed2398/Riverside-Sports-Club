import { StatCard } from '../StatCard/StatCard'
import styles from './StatCardGrid.module.scss'

interface StatCardGridProps {
  onRetry?: () => void
}

export function StatCardGrid({ onRetry }: StatCardGridProps) {
  return (
    <div className={styles.grid}>
      <StatCard label="Members" />
      <StatCard label="Active" />
      <StatCard label="Sessions" />
      <StatCard label="Avg Sessions" variant="error" onRetry={onRetry} />
    </div>
  )
}
