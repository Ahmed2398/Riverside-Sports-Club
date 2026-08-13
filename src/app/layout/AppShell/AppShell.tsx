import { useState, type ReactNode } from 'react'
import { Sidebar } from '../Sidebar/Sidebar'
import { Topbar } from '../Topbar/Topbar'
import styles from './AppShell.module.scss'

interface AppShellProps {
  children: ReactNode
  title?: string
}

export function AppShell({ children, title = 'Dashboard' }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
