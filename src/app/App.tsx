import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { useAuth } from '../features/auth/hooks'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { AppShell } from './layout/AppShell/AppShell'
import { DashboardPage } from '../features/summary/pages/DashboardPage'
import { MembersPage } from '../features/members/pages/MembersPage'

function ProtectedLayout() {
  const { isAuthenticated, status } = useAuth()

  if (status === 'loading') {
    return <div>Loading…</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<ProtectedLayout />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
