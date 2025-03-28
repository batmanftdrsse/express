import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TrackingPage from './components/TrackingPage';
import HomePage from './pages/HomePage';
import { useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { DateProvider } from './contexts/DateContext';
import Navbar from './components/Navbar';
import { PublicNavbar } from './components/PublicNavbar';
import EmailFunnelPage from './pages/dashboard/email-funnel';
import { AuthProvider } from './contexts/AuthContext';
import { useEffect } from 'react';
import RecursosPage from './pages/RecursosPage';
import SobrePage from './pages/SobrePage';
import AjudaPage from './pages/AjudaPage';
import ContatoPage from './pages/ContatoPage';
import FaqPage from './pages/FaqPage';
import PrivacidadePage from './pages/PrivacidadePage';
import TermosPage from './pages/TermosPage';
import TermosEnvioPage from './pages/TermosEnvioPage';
import EmConstrucaoPage from './pages/EmConstrucaoPage';
import ConfiguracoesPage from './pages/ConfiguracoesPage';
import ApiConfigPage from './pages/ApiConfigPage';

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

function MasterRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isMaster } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    } else if (!isMaster()) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isMaster, navigate]);

  return isAuthenticated && isMaster() ? children : null;
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
              <Route
                path="/configuracoes"
                element={
                  <MasterRoute>
                    <div>
                      <Navbar />
                      <ConfiguracoesPage />
                    </div>
                  </MasterRoute>
                }
              />
              <Route
                path="/api-config"
                element={
                  <MasterRoute>
                    <div>
                      <Navbar />
                      <ApiConfigPage />
                    </div>
                  </MasterRoute>
                }
              />
              <Route path="/" element={
                <>
                  <PublicNavbar />
                  <HomePage />
                </>
              } />
              <Route path="/tracking/:code" element={
                <>
                  <PublicNavbar />
                  <TrackingPage />
                </>
              } />
              <Route path="/recursos" element={<RecursosPage />} />
              <Route path="/sobre" element={<SobrePage />} />
              <Route path="/ajuda" element={<AjudaPage />} />
              <Route path="/contato" element={<ContatoPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/privacidade" element={<PrivacidadePage />} />
              <Route path="/termos" element={<TermosPage />} />
              <Route path="/termos-envio" element={<TermosEnvioPage />} />
            </Routes>
          </div>
        </ThemeProvider>
      </DateProvider>
    </AuthProvider>
  );
}

export default App;