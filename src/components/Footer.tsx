import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer section">
      <div className="container-custom text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Sobre Nós</h3>
            <p className="mb-4 text-white">
              Especialistas em sono há mais de 2 anos, oferecendo os melhores colchões para sua qualidade de vida.
            </p>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-2 text-white">
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white" aria-hidden="true" />
                <span className="text-white">Rua Luís Franceschi, 1565 - Thomaz Coelho, Araucária - PR, 83707-072</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-white" aria-hidden="true" />
                <span className="text-white">(41) 99554-3296</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-white" aria-hidden="true" />
                <span className="text-white">rovigocolchoes@gmail.com</span>
              </p>
            </div>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Redes Sociais</h3>
            <p className="mb-4 text-white">Siga-nos nas redes sociais e fique por dentro das novidades e promoções</p>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6 text-white" />
              </a>
              <a 
                href="https://www.instagram.com/geisa.rovigo66?igsh=MTBsbHoxdzN0a3U5MQ==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 text-white" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-white">
          <p className="text-white">&copy; {new Date().getFullYear()} Rovigo Colchões. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
