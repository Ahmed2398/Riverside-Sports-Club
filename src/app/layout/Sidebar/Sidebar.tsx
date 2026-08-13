import styles from './Sidebar.module.scss'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const NAV_ITEMS = [
  { label: 'Dashboard', active: true },
  { label: 'Members', active: false },
  { label: 'Classes', active: false },
  { label: 'Settings', active: false },
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
            <button
              key={item.label}
              className={`${styles.navItem} ${item.active ? styles.active : ''}`}
              aria-current={item.active ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  )
}
