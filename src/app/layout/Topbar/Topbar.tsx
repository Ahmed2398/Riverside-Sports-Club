import styles from './Topbar.module.scss'

interface TopbarProps {
  title: string
  onMenuClick: () => void
}

export function Topbar({ title, onMenuClick }: TopbarProps) {
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
        <button className={styles.control} type="button">EN</button>
        <button className={styles.control} type="button">User</button>
      </div>
    </header>
  )
}
