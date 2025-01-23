import { Menu, X, Package } from 'lucide-react'
import { useState, useEffect } from 'react'
import DarkModeToggle from './DarkModeToggle'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">RastreioExpress</span>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium">Rastrear</a>
              <a href="#services" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium">Enviar</a>
              <a href="#about" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium">Receber</a>
              <a href="#contact" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium">Ajuda e Suporte</a>
              <DarkModeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <DarkModeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu overlay */}
        <div className={`
          fixed inset-0 bg-gray-900/50 dark:bg-gray-900/80 backdrop-blur-sm z-40
          transition-opacity duration-300 md:hidden
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `} onClick={() => setIsOpen(false)} />

        {/* Mobile menu panel */}
        <div className={`
          absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 
          dark:border-gray-700 md:hidden transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-y-0' : '-translate-y-full'}
        `}>
          <div className="px-4 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-base rounded-lg">Rastrear</a>
            <a href="#services" className="block px-3 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-base rounded-lg">Enviar</a>
            <a href="#about" className="block px-3 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-base rounded-lg">Receber</a>
            <a href="#contact" className="block px-3 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-base rounded-lg mb-2">Ajuda e Suporte</a>
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16" />
    </>
  )
}