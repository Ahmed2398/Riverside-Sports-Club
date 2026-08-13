import { useTranslation } from '../../i18n'
import styles from './StatusBadge.module.scss'

export type MemberStatus = 'active' | 'paused' | 'expired'

interface StatusBadgeProps {
  status: MemberStatus
}

const STATUS_CONFIG: Record<
  MemberStatus,
  { labelKey: string; className: string }
> = {
  active: { labelKey: 'members.statusActive', className: 'active' },
  paused: { labelKey: 'members.statusPaused', className: 'paused' },
  expired: { labelKey: 'members.statusExpired', className: 'expired' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useTranslation()
  const config = STATUS_CONFIG[status]
  const label = t(config.labelKey)

  return (
    <span
      className={`${styles.badge} ${styles[config.className]}`}
      role="status"
      aria-label={label}
    >
      <span className={styles.icon} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </span>
  )
}
