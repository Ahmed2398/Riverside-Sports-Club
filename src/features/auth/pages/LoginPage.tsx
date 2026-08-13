import { LoginForm } from '../components/LoginForm'
import styles from './LoginPage.module.scss'

export function LoginPage() {
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
