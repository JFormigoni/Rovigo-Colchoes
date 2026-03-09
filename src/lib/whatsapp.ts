// WhatsApp integration helper functions for landing page
import { WHATSAPP_NUMBER } from './config'

/**
 * Message templates for different CTA types on the landing page
 */
export const WHATSAPP_MESSAGES = {
  hero: 'Olá! Vim pela página inicial do site e gostaria de saber mais sobre os colchões.',
  product: (productName: string) => 
    `Olá! Tenho interesse no modelo ${productName}. Gostaria de mais informações.`,
  promo: 'Olá! Vim pelo site e gostaria de saber mais sobre as promoções disponíveis.',
  final: 'Olá! Acabei de acessar o site e quero melhorar meu sono. Poderia falar com um especialista sobre os colchões?',
  floating: 'Olá! Estou navegando pelo site e gostaria de mais informações sobre os colchões.'
} as const

export type CTAType = keyof typeof WHATSAPP_MESSAGES

/**
 * Formats a WhatsApp URL with proper encoding
 * @param message - The message to be sent via WhatsApp
 * @returns Formatted WhatsApp URL with encoded message
 */
export function formatWhatsAppURL(message: string): string {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

/**
 * Opens WhatsApp with a pre-filled message
 * Works on both mobile (opens app) and desktop (opens WhatsApp Web)
 * @param message - The message to be sent via WhatsApp
 */
export function openWhatsApp(message: string): void {
  const url = formatWhatsAppURL(message)
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Opens WhatsApp with a message template for a specific CTA type
 * @param ctaType - The type of CTA (hero, product, promo, final, floating)
 * @param productName - Optional product name (required for 'product' CTA type)
 */
export function openWhatsAppWithTemplate(
  ctaType: CTAType,
  productName?: string
): void {
  let message: string

  if (ctaType === 'product') {
    if (!productName) {
      throw new Error('Product name is required for product CTA type')
    }
    message = WHATSAPP_MESSAGES.product(productName)
  } else {
    message = WHATSAPP_MESSAGES[ctaType]
  }

  openWhatsApp(message)
}
