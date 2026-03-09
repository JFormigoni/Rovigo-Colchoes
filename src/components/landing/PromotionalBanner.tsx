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
      className="section promo-banner"
      aria-labelledby="promo-heading"
    >
      <div className="promo-content">
        <h2 
          id="promo-heading"
          className="promo-title"
        >
          Oferta Especial
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8 text-white">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-white" aria-hidden="true" />
            <span className="text-xl text-white">Frete Grátis</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Tag className="w-8 h-8 text-white" aria-hidden="true" />
            <span className="text-xl text-white">Descontos Especiais</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Moon className="w-8 h-8 text-white" aria-hidden="true" />
            <span className="text-xl text-white">100 Noites de Teste</span>
          </div>
        </div>
        
        <button 
          onClick={handleWhatsAppClick}
          className="btn btn-whatsapp btn-lg"
          aria-label="Falar no WhatsApp sobre promoções"
        >
          <MessageCircle className="w-6 h-6" aria-hidden="true" />
          Falar no WhatsApp
        </button>
      </div>
    </section>
  )
}
