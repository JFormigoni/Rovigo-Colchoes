import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react'

/**
 * Landing Footer component
 * 
 * Custom footer with company information, contact details, and social media links.
 * 
 * Validates Requirements:
 * - 11.1: Display company information
 * - 11.2: Display company address
 * - 11.3: Display social media links
 * - 11.4: Display support contact information
 * - 11.5: Use easily scannable layout
 * - 11.6: Maintain visual consistency with overall design
 */
export default function LandingFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Sobre Nós</h3>
            <p className="mb-4">
              Especialistas em sono há mais de 20 anos, oferecendo os melhores colchões para sua qualidade de vida.
            </p>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5" aria-hidden="true" />
                <span>Rua Exemplo, 123 - Centro</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5" aria-hidden="true" />
                <span>(47) 99779-4812</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5" aria-hidden="true" />
                <span>contato@colchoespremium.com.br</span>
              </p>
            </div>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Redes Sociais</h3>
            <p className="mb-4">Siga-nos nas redes sociais e fique por dentro das novidades e promoções</p>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2024 Colchões Premium. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
