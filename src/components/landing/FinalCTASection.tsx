import { MessageCircle } from 'lucide-react'
import { openWhatsAppWithTemplate } from '@/lib/whatsapp'

/**
 * Final Call-to-Action section component for landing page
 * 
 * Provides a last opportunity for conversion before the footer.
 * 
 * Validates Requirements:
 * - 7.1: Display motivational phrase
 * - 7.2: Display large, prominent CTA button
 * - 7.3: Use visual emphasis to draw attention
 * - 7.4: Open WhatsApp with pre-filled message on click
 */
export default function FinalCTASection() {
  const handleWhatsAppClick = () => {
    openWhatsAppWithTemplate('final')
  }

  return (
    <section className="section-lg bg-neutral-50">
      <div className="container-custom text-center">
        <h2 className="text-5xl font-bold mb-6 text-neutral-900">
          Pronto para dormir melhor?
        </h2>
        <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
          Fale com nossos especialistas e encontre o colchão perfeito para você
        </p>
        
        <button 
          onClick={handleWhatsAppClick} 
          className="btn btn-whatsapp btn-lg"
          aria-label="Falar com especialista no WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
          Falar com especialista no WhatsApp
        </button>
      </div>
    </section>
  )
}
