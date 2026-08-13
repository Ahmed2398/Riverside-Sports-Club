import styles from './StatCard.module.scss'

interface StatCardProps {
  label: string
  value?: string | number
  loading?: boolean
  variant?: 'default' | 'error'
  onRetry?: () => void
}

export function StatCard({
  label,
  value,
  loading = false,
  variant = 'default',
  onRetry,
}: StatCardProps) {
  if (variant === 'error') {
    return (
      <div className={`${styles.card} ${styles.error}`} role="status">
        <span className={styles.label}>{label}</span>
        <div className={styles.errorBody}>
          <span className={styles.errorIcon} aria-hidden="true">{'\u26A0'}</span>
          <span className={styles.errorText}>Failed</span>
          {onRetry && (
            <button
              type="button"
              className={styles.retry}
              onClick={onRetry}
            >
              {'\u00B7'} Retry
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      {loading || value === undefined ? (
        <div className={styles.skeleton} />
      ) : (
        <span className={styles.value}>{value}</span>
      )}
    </div>
  )
}
