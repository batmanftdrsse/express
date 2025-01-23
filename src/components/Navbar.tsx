import { Menu, X, Package } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import DarkModeToggle from './DarkModeToggle'

const navItems = [
  { href: '#track', label: 'Rastrear' },
  { href: '#features', label: 'Recursos' },
  { href: '#about', label: 'Sobre Nós' },
  { href: '#help', label: 'Ajuda e Suporte' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Prevent body scroll when menu is open
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute('href')
    if (!href) return

    setIsOpen(false) // Close menu when clicking a link

    const element = document.querySelector(href)
    if (element) {
      const navHeight = 64 // height of navbar in pixels
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">RastreioExpress</span>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 
                         text-sm font-medium transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            {/* Mobile menu button */}
            <button
              ref={menuRef}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md 
                       text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400
                       focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Main menu"
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}
      
      {/* Mobile menu panel */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`
          absolute top-16 inset-x-0 md:hidden bg-white dark:bg-gray-900 
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
          shadow-lg border-b border-gray-200 dark:border-gray-700
        `}
        aria-label="Mobile menu"
      >
        <div className="pt-2 pb-3 space-y-1 px-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-md text-base font-medium 
                       text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 
                       hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}