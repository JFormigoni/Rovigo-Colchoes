import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold">
            ColchõesTop
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-primary-400 transition-colors">
              Home
            </Link>
            <Link to="/produtos" className="hover:text-primary-400 transition-colors">
              Produtos
            </Link>
            <Link to="/sobre" className="hover:text-primary-400 transition-colors">
              Sobre Nós
            </Link>
            <Link to="/admin" className="hover:text-primary-400 transition-colors">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-700"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className="block px-4 py-2 rounded-lg hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/produtos"
              className="block px-4 py-2 rounded-lg hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Produtos
            </Link>
            <Link
              to="/sobre"
              className="block px-4 py-2 rounded-lg hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Sobre Nós
            </Link>
            <Link
              to="/admin"
              className="block px-4 py-2 rounded-lg hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
