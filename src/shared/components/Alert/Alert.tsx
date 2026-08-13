import type { ReactNode } from 'react'
import styles from './Alert.module.scss'

type AlertVariant = 'error' | 'success' | 'info'

interface AlertProps {
  variant?: AlertVariant
  children: ReactNode
  className?: string
}

export function Alert({ variant = 'info', children, className }: AlertProps) {
  return (
    <div
      className={[styles.alert, styles[variant], className]
        .filter(Boolean)
        .join(' ')}
      role="alert"
    >
      {children}
    </div>
  )
}
