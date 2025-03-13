import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TrackingPage from './components/TrackingPage';
import HomePage from './pages/HomePage';
import { useAuth } from './hooks/useAuth';
import { ThemeProvider } from './contexts/ThemeContext';
import { DateProvider } from './contexts/DateContext';
import Navbar from './components/Navbar';
import EmailFunnelPage from './pages/dashboard/email-funnel';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const isLoginPage = window.location.pathname === '/login';

  return (
    <DateProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          {!isLoginPage && <Navbar />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tracking/:code" element={<TrackingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
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
          </Routes>
        </div>
      </ThemeProvider>
    </DateProvider>
  );
}

export default App;