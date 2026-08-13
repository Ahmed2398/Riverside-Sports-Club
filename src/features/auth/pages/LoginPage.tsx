import { Navigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { useAuth } from '../hooks'
import styles from './LoginPage.module.scss'

export function LoginPage() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Riverside Sports Club</h1>
          <p className={styles.subtitle}>Admin Dashboard</p>
        </div>
        <LoginForm />
        <p className={styles.hint}>
          Demo: admin@riverside.example / Passw0rd!
        </p>
      </div>
    </div>
  )
}
