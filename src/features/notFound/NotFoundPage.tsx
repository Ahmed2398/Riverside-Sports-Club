import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../shared/i18n'
import { Button } from '../../shared/components'
import styles from './NotFoundPage.module.scss'

export function NotFoundPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.illustration} aria-hidden="true">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="8" y1="15" x2="16" y2="15" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      </div>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>{t('notFound.title')}</h1>
      <p className={styles.description}>{t('notFound.description')}</p>
      <div className={styles.actions}>
        <Button variant="primary" size="md" onClick={() => navigate('/')}>
          {t('notFound.goHome')}
        </Button>
        <Button variant="secondary" size="md" onClick={() => navigate(-1)}>
          {t('notFound.goBack')}
        </Button>
      </div>
    </div>
  )
}
