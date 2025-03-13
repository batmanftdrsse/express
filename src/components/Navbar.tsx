import { Link } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import Logo from './Logo'
import { Moon, Sun, LogOut } from 'lucide-react'
import { useDarkMode } from '../contexts/DarkModeContext'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const { logout } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo />
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
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
    </nav>
  )
}

export default Navbar