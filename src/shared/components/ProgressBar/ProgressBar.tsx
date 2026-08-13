import styles from './ProgressBar.module.scss'

interface ProgressBarProps {
  current: number
  goal: number
  label?: string
}

export function ProgressBar({ current, goal, label }: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((current / goal) * 100))

  return (
    <div className={styles.container}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={goal}
          aria-label={label || `${current} of ${goal}`}
        />
      </div>
      <span className={styles.text}>
        {current} of {goal}
      </span>
    </div>
  )
}
