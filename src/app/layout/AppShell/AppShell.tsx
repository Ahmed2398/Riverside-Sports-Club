import { useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Sidebar } from '../Sidebar/Sidebar'
import { Topbar } from '../Topbar/Topbar'
import styles from './AppShell.module.scss'

interface AppShellProps {
  children: ReactNode
}

const PAGE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/members': 'Members',
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const title = PAGE_TITLES[location.pathname] || 'Dashboard'

  return (
    <div className={styles.shell}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={styles.mainColumn}>
        <Topbar
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  )
}
