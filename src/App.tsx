import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import RoutesComponent from './Routes'

function App() {
  // Verifica se está na página de login
  const isLoginPage = window.location.pathname === '/login'

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {!isLoginPage && <Navbar />}
        <RoutesComponent />
      </div>
    </ThemeProvider>
  )
}

export default App