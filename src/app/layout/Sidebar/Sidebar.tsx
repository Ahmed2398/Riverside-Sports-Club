import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.scss'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/' },
  { label: 'Members', path: '/members' },
  { label: 'Classes', path: '/classes' },
  { label: 'Settings', path: '/settings' },
]

export function Sidebar({ open, onClose }: SidebarProps) {
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
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
