import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { openWhatsAppWithTemplate } from '../../lib/whatsapp'

/**
 * FloatingWhatsAppButton Component
 * 
 * A fixed button that appears in the bottom-right corner after scrolling 300px.
 * Provides quick access to WhatsApp contact throughout the landing page.
 * 
 * Features:
 * - Appears after 300px scroll
 * - Fixed positioning in bottom-right corner
 * - High z-index to stay above other elements
 * - Smooth transition animation
 * - Minimum 44px x 44px touch target size
 * - Accessible with ARIA label
 * 
 * Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 9.6
 */
export default function FloatingWhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Check initial scroll position
    toggleVisibility()

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const handleClick = () => {
    openWhatsAppWithTemplate('floating')
  }

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center justify-center ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      style={{ minWidth: '56px', minHeight: '56px' }}
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </button>
  )
}
