import { Moon, Sun } from 'lucide-react'
import { useDarkMode } from '../contexts/DarkModeContext'

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      ) : (
        <Moon className="h-5 w-5 text-gray-500" />
      )}
    </button>
  )
} 