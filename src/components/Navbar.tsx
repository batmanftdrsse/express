import { Menu, X, Package } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">ShipTrack</span>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium">Track</a>
            <a href="#services" className="px-4 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium">Send</a>
            <a href="#about" className="px-4 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium">Receive</a>
            <a href="#contact" className="px-4 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium">Help & Support</a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 text-base">Track</a>
              <a href="#services" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 text-base">Send</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 text-base">Receive</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 text-base">Help & Support</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}