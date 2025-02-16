import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Routes from './Routes'

function App() {
  // Verifica se está na página de login
  const isLoginPage = window.location.pathname === '/login'

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {!isLoginPage && <Navbar />}
      <Routes />
    </div>
  )
}

export default App