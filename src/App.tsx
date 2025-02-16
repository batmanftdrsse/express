import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import AppRoutes from './Routes'

function App() {
  // Verifica se está na página de login
  const isLoginPage = window.location.pathname === '/login'

  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {!isLoginPage && <Navbar />}
          <AppRoutes />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App