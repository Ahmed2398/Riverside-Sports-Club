import styles from './ConfidentialField.module.scss'

interface ConfidentialFieldProps {
  label: string
  value: string
  revealed?: boolean
  fullWidth?: boolean
}

export function ConfidentialField({ label, value, revealed = false, fullWidth = false }: ConfidentialFieldProps) {
  return (
    <div className={`${styles.field} ${fullWidth ? styles.fullWidth : ''}`}>
      <span className={styles.label}>{label}</span>
      <div className={`${styles.valueBox} ${revealed ? styles.revealed : ''}`}>
        <span className={styles.value}>{value}</span>
        {!revealed && (
          <span className={styles.lockIcon} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
        )}
      </div>
    </div>
  )
}
