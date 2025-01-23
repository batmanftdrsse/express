import { Menu, X, Package } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import DarkModeToggle from './DarkModeToggle'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

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

  // Handle clicks outside of menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
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
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
        )}

        {/* Mobile menu */}
        <div
          ref={menuRef}
          className={`
            fixed inset-x-0 top-16 bg-white dark:bg-gray-900 z-40 md:hidden
            transform transition-all duration-300 ease-in-out
            ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
            max-h-[calc(100vh-4rem)] overflow-y-auto
          `}
        >
          <div className="flex flex-col items-center py-6 space-y-4">
            <a 
              href="#" 
              className="w-full text-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 
                       hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Rastrear
            </a>
            <a 
              href="#services" 
              className="w-full text-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 
                       hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Enviar
            </a>
            <a 
              href="#about" 
              className="w-full text-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 
                       hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Receber
            </a>
            <a 
              href="#contact" 
              className="w-full text-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 
                       hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Ajuda e Suporte
            </a>
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16" />
    </>
  )
}