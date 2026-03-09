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
      className={`floating-whatsapp ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
    >
      <MessageCircle className="w-8 h-8 relative z-10" />
    </button>
  )
}
