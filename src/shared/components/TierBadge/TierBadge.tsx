import { useTranslation } from '../../i18n'
import styles from './TierBadge.module.scss'

export type Tier = 'basic' | 'standard' | 'premium'

interface TierBadgeProps {
  tier: Tier
}

const TIER_CONFIG: Record<
  Tier,
  { labelKey: string; className: string }
> = {
  basic: { labelKey: 'members.tierBasic', className: 'basic' },
  standard: { labelKey: 'members.tierStandard', className: 'standard' },
  premium: { labelKey: 'members.tierPremium', className: 'premium' },
}

export function TierBadge({ tier }: TierBadgeProps) {
  const { t } = useTranslation()
  const config = TIER_CONFIG[tier]
  const label = t(config.labelKey)

  return (
    <span
      className={`${styles.badge} ${styles[config.className]}`}
      aria-label={`Tier: ${label}`}
    >
      <span className={styles.icon} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </span>
  )
}
