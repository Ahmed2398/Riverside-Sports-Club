import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { useAuth } from '../features/auth/hooks'
import { LoginPage } from '../features/auth/pages/LoginPage'

function ProtectedLayout() {
  const { isAuthenticated, status } = useAuth()

  if (status === 'loading') {
    return <div>Loading…</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div>
      <h1>Dashboard — authenticated</h1>
    </div>
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
