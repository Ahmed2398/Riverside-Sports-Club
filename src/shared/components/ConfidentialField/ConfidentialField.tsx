import styles from './ConfidentialField.module.scss'

interface ConfidentialFieldProps {
  label: string
  value: string
  revealed?: boolean
}

/**
 * Confidential field with opaque hatched overlay.
 * 
 * Design decision: Confidential data (phone, emergency contact, medical notes)
 * is present in the DOM but visually obscured by a 92% opaque white overlay with
 * a diagonal hatch pattern. This approach:
 * 
 * 1. Prevents casual viewing - staff cannot read sensitive data at a glance
 * 2. Signals intentionality - the hatched pattern clearly indicates hidden content
 * 3. Requires explicit action - user must click "Show confidential details" to reveal
 * 4. Maintains accessibility - screen readers can access the content if needed
 * 5. Preserves data in DOM - no re-fetch required when revealing
 * 
 * The overlay uses a ::before pseudo-element that fades out when revealed=true,
 * providing a smooth transition without layout shift.
 * 
 * Alternative considered: Rendering placeholder text (••••) and only injecting real
 * values when revealed. This would be more secure (data never in DOM until requested)
 * but requires more complex state management. Current approach balances security with
 * UX - the data is present but functionally protected from casual exposure.
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
