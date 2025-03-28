import { useState, useEffect } from 'react'
import { Menu, X, Package, Moon, Sun } from 'lucide-react'
import Logo from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { useDarkMode } from '../contexts/DarkModeContext'

export const PublicNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isTrackingPage, setIsTrackingPage] = useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  useEffect(() => {
    // Verifica se estamos na página de tracking (URL começa com /tracking/)
    setIsTrackingPage(window.location.pathname.startsWith('/tracking/'))

    // Atualiza quando a URL mudar
    const handleLocationChange = () => {
      setIsTrackingPage(window.location.pathname.startsWith('/tracking/'))
    }

    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center">
              <Logo />
            </a>
          </div>

          {/* Links para desktop */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {isTrackingPage ? (
              // Links para a página de tracking
              <>
                <a 
                  href="/#track" 
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Rastrear Outro Pacote
                </a>
              </>
            ) : (
              // Links para a página inicial
              <>
                <a 
                  href="#track" 
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Rastrear
                </a>
                <a 
                  href="#about" 
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sobre Nós
                </a>
                <a 
                  href="#features" 
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Recursos
                </a>
                <a 
                  href="#help" 
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Ajuda e Suporte
                </a>
              </>
            )}

            {/* Botão de alternar tema */}
            <ThemeToggle />
          </div>

          {/* Botão de menu mobile com toggle de tema */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              aria-label={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Abrir menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 shadow-lg">
            {isTrackingPage ? (
              // Links mobile para a página de tracking
              <>
                <a
                  href="/#track"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Rastrear Outro Pacote
                </a>
              </>
            ) : (
              // Links mobile para a página inicial
              <>
                <a
                  href="#track"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Rastrear
                </a>
                <a
                  href="#about"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sobre Nós
                </a>
                <a
                  href="#features"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Recursos
                </a>
                <a
                  href="#help"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ajuda e Suporte
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}; 