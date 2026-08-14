import { NavLink } from 'react-router-dom'
import { useTranslation } from '../../../shared/i18n'
import styles from './Sidebar.module.scss'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const NAV_ITEMS = [
  { 
    key: 'dashboard',
    path: '/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    )
  },
  { 
    key: 'members',
    path: '/members',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  },
]

export function Sidebar({ open, onClose }: SidebarProps) {
  const { t } = useTranslation()

  return (
    <>
      {open && <div className={styles.overlay} onClick={onClose} aria-hidden="true" />}
      <aside
        className={`${styles.sidebar} ${open ? styles.open : ''}`}
        aria-label="Main navigation"
      >
        <div className={styles.brand}>
          <span className={styles.brandMark}>RSC</span>
        </div>
        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
              onClick={onClose}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{t(`nav.${item.key}`)}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
