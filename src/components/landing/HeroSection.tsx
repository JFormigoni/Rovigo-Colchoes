import { MessageCircle } from 'lucide-react'
import { openWhatsAppWithTemplate } from '@/lib/whatsapp'

export default function HeroSection() {
  const handleWhatsAppClick = () => {
    openWhatsAppWithTemplate('hero')
  }

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop)'
      }}
    >
      {/* Overlay for text legibility */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Durma Melhor, Viva Melhor
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-100">
          Conforto excepcional, tecnologia avançada e garantia de qualidade para suas noites de sono perfeitas
        </p>
        
        <button
          onClick={handleWhatsAppClick}
          className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          aria-label="Falar com um vendedor no WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          Falar com um vendedor no WhatsApp
        </button>
      </div>
    </section>
  )
}
