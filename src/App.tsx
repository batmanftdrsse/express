import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TrackingPage from './components/TrackingPage';
import HomePage from './pages/HomePage';
import { useAuth } from './hooks/useAuth';
import { ThemeProvider } from './contexts/ThemeContext';
import { DateProvider } from './contexts/DateContext';
import Navbar from './components/Navbar';
import EmailFunnelPage from './pages/dashboard/email-funnel';
import { AuthProvider } from './contexts/AuthContext';
import { useEffect } from 'react';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

function App() {
  return (
    <AuthProvider>
      <DateProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard/*"
                element={
                  <PrivateRoute>
                    <div>
                      <Navbar />
                      <Routes>
                        <Route index element={<DashboardPage />} />
                        <Route path="email-funnel" element={<EmailFunnelPage />} />
                      </Routes>
                    </div>
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<HomePage />} />
              <Route path="/tracking/:code" element={<TrackingPage />} />
            </Routes>
          </div>
        </ThemeProvider>
      </DateProvider>
    </AuthProvider>
  );
}

export default App;