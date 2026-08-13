import { useAppSelector } from '../../hooks'
import { useLocale } from '../../../shared/contexts/LocaleContext'
import styles from './Topbar.module.scss'

interface TopbarProps {
  title: string
  onMenuClick: () => void
}

export function Topbar({ title, onMenuClick }: TopbarProps) {
  const user = useAppSelector((s) => s.auth.user)
  const { locale, setLocale } = useLocale()

  const handleLanguageToggle = () => {
    setLocale(locale === 'en' ? 'ar' : 'en')
  }

  const userName = user?.name[locale] || user?.name.en || 'User'

  return (
    <header className={styles.topbar}>
      <div className={styles.start}>
        <button
          className={styles.hamburger}
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.end}>
        <button 
          className={styles.control} 
          type="button"
          onClick={handleLanguageToggle}
          aria-label={`Switch to ${locale === 'en' ? 'Arabic' : 'English'}`}
        >
          {locale === 'en' ? 'EN' : 'AR'}
        </button>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>{userName}</span>
            {user?.email && (
              <span className={styles.userEmail}>{user.email}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
