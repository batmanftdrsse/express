import { Link } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import Logo from './Logo'
import { Moon, Sun, LogOut, Settings, Menu, X } from 'lucide-react'
import { useDarkMode } from '../contexts/DarkModeContext'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'

const Navbar = () => {
  const { toggleDarkMode } = useDarkMode()
  const { logout, isMaster } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center">
              <Logo />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                to="/dashboard" 
                className="border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              {isMaster() && (
                <Link 
                  to="/configuracoes" 
                  className="border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Usuários
                </Link>
              )}
              {isMaster() && (
                <Link 
                  to="/api-config" 
                  className="border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  API
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Menu hamburger para dispositivos móveis */}
            <button
              onClick={toggleMobileMenu}
              className="sm:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {isMaster() && (
              <Link
                to="/configuracoes"
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 sm:inline-block hidden"
                aria-label="Usuários"
              >
                <Settings className="h-5 w-5" />
              </Link>
            )}
            
            <ThemeToggle />
            
            <button
              onClick={logout}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              aria-label="Sair"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg p-4 z-50 flex flex-col space-y-3">
          <Link
            to="/dashboard"
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-2 py-1 rounded"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          {isMaster() && (
            <Link
              to="/configuracoes"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-2 py-1 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Usuários
            </Link>
          )}
          {isMaster() && (
            <Link
              to="/api-config"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-2 py-1 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              API
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar