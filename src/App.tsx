import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import EmailFunnelPage from './pages/dashboard/email-funnel'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import TrackingPage from './pages/tracking/[id]'

function App() {
  // Verifica se está na página de login
  const isLoginPage = window.location.pathname === '/login'

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Só mostra a Navbar se não estiver na página de login */}
        {!isLoginPage && <Navbar />}
        
        <div className={isLoginPage ? '' : 'pt-16'}>
          <Routes>
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
            <Route path="/tracking/:id" element={<TrackingPage />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App