import styles from './StatusBadge.module.scss'

export type MemberStatus = 'active' | 'paused' | 'expired'

interface StatusBadgeProps {
  status: MemberStatus
}

const STATUS_CONFIG: Record<
  MemberStatus,
  { label: string; icon: string; className: string }
> = {
  active: { label: 'Active', icon: '\u25CF', className: 'active' },
  paused: { label: 'Paused', icon: '\u25D0', className: 'paused' },
  expired: { label: 'Expired', icon: '\u25CB', className: 'expired' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]

  return (
    <span
      className={`${styles.badge} ${styles[config.className]}`}
      role="status"
      aria-label={config.label}
    >
      <span className={styles.icon} aria-hidden="true">
        {config.icon}
      </span>
      <span className={styles.label}>{config.label}</span>
    </span>
  )
}
