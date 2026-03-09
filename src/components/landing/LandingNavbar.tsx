import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, MessageCircle } from 'lucide-react'
import { openWhatsAppWithTemplate } from '@/lib/whatsapp'

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleWhatsAppClick = () => {
    openWhatsAppWithTemplate('hero')
    setIsMobileMenuOpen(false)
  }

  const handleNavigation = (path: string) => {
    navigate(path)
    setIsMobileMenuOpen(false)
    window.scrollTo(0, 0)
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-neutral-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/produtos"
              className="text-neutral-700 hover:text-blue-600 transition-colors font-medium"
            >
              Produtos
            </Link>
            <Link
              to="/sobre"
              className="text-neutral-700 hover:text-blue-600 transition-colors font-medium"
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
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neutral-900 hover:text-blue-600 transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleNavigation('/')}
                className="text-left text-neutral-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation('/produtos')}
                className="text-left text-neutral-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Produtos
              </button>
              <button
                onClick={() => handleNavigation('/sobre')}
                className="text-left text-neutral-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Sobre
              </button>
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
