import styles from './ConfidentialField.module.scss'

interface ConfidentialFieldProps {
  label: string
  value: string
  revealed?: boolean
}

/**
 * Confidential field with hatched overlay.
 * 
 * Design decision: Confidential data (phone, emergency contact, medical notes)
 * is acknowledged as present without being casually visible. The hatched overlay
 * indicates sensitive information and requires an explicit user action to reveal.
 * This prevents accidental exposure while maintaining data transparency.
 */
export function ConfidentialField({ label, value, revealed = false }: ConfidentialFieldProps) {
  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      <div className={`${styles.valueBox} ${revealed ? styles.revealed : ''}`}>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  )
}
