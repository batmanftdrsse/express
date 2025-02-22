import { Routes as RouterRoutes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import EmailFunnelPage from './pages/dashboard/email-funnel'
import TrackingPage from './pages/tracking/[id]'
import PrivateRoute from './components/PrivateRoute'

// Componente de Rotas
const AppRoutes = () => {
  const isLoginPage = window.location.pathname === '/login'

  return (
    <div className={isLoginPage ? '' : 'pt-16'}>
      <RouterRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard/email-funnel"
          element={
            <PrivateRoute>
              <div className="bg-gray-50 dark:bg-gray-800 min-h-screen">
                <EmailFunnelPage />
              </div>
            </PrivateRoute>
          }
        />
        <Route path="/tracking/:code" element={<TrackingPage />} />
      </RouterRoutes>
    </div>
  )
}

export default AppRoutes 