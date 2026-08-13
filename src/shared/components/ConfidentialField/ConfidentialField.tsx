import styles from './ConfidentialField.module.scss'

interface ConfidentialFieldProps {
  label: string
  value: string
}

export function ConfidentialField({ label, value }: ConfidentialFieldProps) {
  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      <div className={styles.valueBox}>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  )
}
