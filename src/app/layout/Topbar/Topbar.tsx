import { useAppSelector } from '../../hooks'
import { useLocale } from '../../../shared/contexts/LocaleContext'
import { useTheme } from '../../../shared/contexts/ThemeContext'
import { useTranslation } from '../../../shared/i18n'
import styles from './Topbar.module.scss'

interface TopbarProps {
  title: string
  onMenuClick: () => void
}

export function Topbar({ title, onMenuClick }: TopbarProps) {
  const user = useAppSelector((s) => s.auth.user)
  const { locale, setLocale } = useLocale()
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()

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
          onClick={toggleTheme}
          aria-label={theme === 'light' ? t('a11y.switchToDark') : t('a11y.switchToLight')}
          title={theme === 'light' ? t('a11y.darkMode') : t('a11y.lightMode')}
        >
          {theme === 'light' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          )}
        </button>
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
