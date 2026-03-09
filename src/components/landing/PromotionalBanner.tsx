import { Truck, Tag, Moon, MessageCircle } from 'lucide-react'
import { openWhatsApp, WHATSAPP_MESSAGES } from '../../lib/whatsapp'

/**
 * PromotionalBanner Component
 * 
 * Displays promotional benefits with a prominent WhatsApp CTA.
 * Features a gradient background for visual emphasis and includes
 * icons for free shipping, special discounts, and trial period.
 * 
 * Validates Requirements: 6.1, 6.2, 6.3, 6.4, 6.5
 */
export default function PromotionalBanner() {
  const handleWhatsAppClick = () => {
    openWhatsApp(WHATSAPP_MESSAGES.promo)
  }

  return (
    <section 
      className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
      aria-labelledby="promo-heading"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 
          id="promo-heading"
          className="text-4xl font-bold mb-6"
        >
          Oferta Especial
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8" aria-hidden="true" />
            <span className="text-xl">Frete Grátis</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Tag className="w-8 h-8" aria-hidden="true" />
            <span className="text-xl">Descontos Especiais</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Moon className="w-8 h-8" aria-hidden="true" />
            <span className="text-xl">100 Noites de Teste</span>
          </div>
        </div>
        
        <button 
          onClick={handleWhatsAppClick}
          className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-green-300"
          aria-label="Falar no WhatsApp sobre promoções"
        >
          <MessageCircle className="w-6 h-6" aria-hidden="true" />
          Falar no WhatsApp
        </button>
      </div>
    </section>
  )
}
