import styles from './TierBadge.module.scss'

export type Tier = 'basic' | 'standard' | 'premium'

interface TierBadgeProps {
  tier: Tier
}

const TIER_CONFIG: Record<
  Tier,
  { label: string; icon: string; className: string }
> = {
  basic: { label: 'Basic', icon: '\u25CB', className: 'basic' },
  standard: { label: 'Standard', icon: '\u25D0', className: 'standard' },
  premium: { label: 'Premium', icon: '\u25CF', className: 'premium' },
}

export function TierBadge({ tier }: TierBadgeProps) {
  const config = TIER_CONFIG[tier]

  return (
    <span
      className={`${styles.badge} ${styles[config.className]}`}
      aria-label={`Tier: ${config.label}`}
    >
      <span className={styles.icon} aria-hidden="true">
        {config.icon}
      </span>
      <span className={styles.label}>{config.label}</span>
    </span>
  )
}
