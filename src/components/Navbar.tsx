import { Link, useLocation } from 'react-router-dom'
import { Menu, X, MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { openWhatsAppWithTemplate } from '@/lib/whatsapp'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleWhatsAppClick = () => {
    openWhatsAppWithTemplate('hero')
    setIsOpen(false)
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-neutral-900 hover:text-blue-600 transition-colors"
          >
            Colchões Premium
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600' 
                  : 'text-neutral-700 hover:text-blue-600'
              }`}
              onClick={() => window.scrollTo(0, 0)}
            >
              Home
            </Link>
            <Link
              to="/produtos"
              className={`font-medium transition-colors ${
                isActive('/produtos') 
                  ? 'text-blue-600' 
                  : 'text-neutral-700 hover:text-blue-600'
              }`}
              onClick={() => window.scrollTo(0, 0)}
            >
              Produtos
            </Link>
            <Link
              to="/sobre"
              className={`font-medium transition-colors ${
                isActive('/sobre') 
                  ? 'text-blue-600' 
                  : 'text-neutral-700 hover:text-blue-600'
              }`}
              onClick={() => window.scrollTo(0, 0)}
            >
              Sobre
            </Link>
            <button
              onClick={handleWhatsAppClick}
              className="btn btn-whatsapp btn-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Contato
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-neutral-900 hover:text-blue-600 transition-colors"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className={`text-left font-medium py-2 transition-colors ${
                  isActive('/') 
                    ? 'text-blue-600' 
                    : 'text-neutral-700 hover:text-blue-600'
                }`}
                onClick={() => {
                  setIsOpen(false)
                  window.scrollTo(0, 0)
                }}
              >
                Home
              </Link>
              <Link
                to="/produtos"
                className={`text-left font-medium py-2 transition-colors ${
                  isActive('/produtos') 
                    ? 'text-blue-600' 
                    : 'text-neutral-700 hover:text-blue-600'
                }`}
                onClick={() => {
                  setIsOpen(false)
                  window.scrollTo(0, 0)
                }}
              >
                Produtos
              </Link>
              <Link
                to="/sobre"
                className={`text-left font-medium py-2 transition-colors ${
                  isActive('/sobre') 
                    ? 'text-blue-600' 
                    : 'text-neutral-700 hover:text-blue-600'
                }`}
                onClick={() => {
                  setIsOpen(false)
                  window.scrollTo(0, 0)
                }}
              >
                Sobre
              </Link>
              <button
                onClick={handleWhatsAppClick}
                className="btn btn-whatsapp w-full justify-center"
              >
                <MessageCircle className="w-4 h-4" />
                Contato WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
