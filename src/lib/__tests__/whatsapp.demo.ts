/**
 * Demonstration of WhatsApp helper functions
 * This file shows example usage of the whatsapp.ts helper functions
 */

import { formatWhatsAppURL, WHATSAPP_MESSAGES } from '../whatsapp'

// Example 1: Format URL for hero CTA
console.log('Hero CTA URL:')
console.log(formatWhatsAppURL(WHATSAPP_MESSAGES.hero))
console.log()

// Example 2: Format URL for product CTA
console.log('Product CTA URL (Colchão Premium):')
console.log(formatWhatsAppURL(WHATSAPP_MESSAGES.product('Colchão Premium')))
console.log()

// Example 3: Format URL for promo CTA
console.log('Promo CTA URL:')
console.log(formatWhatsAppURL(WHATSAPP_MESSAGES.promo))
console.log()

// Example 4: Format URL for final CTA
console.log('Final CTA URL:')
console.log(formatWhatsAppURL(WHATSAPP_MESSAGES.final))
console.log()

// Example 5: Format URL for floating button
console.log('Floating Button URL:')
console.log(formatWhatsAppURL(WHATSAPP_MESSAGES.floating))
console.log()

// Example 6: Test special character encoding
console.log('Special characters encoding test:')
const specialMessage = 'Olá! Como está? Preço: R$ 1.000,00 😊'
console.log('Original:', specialMessage)
console.log('Encoded URL:', formatWhatsAppURL(specialMessage))
console.log()

// Example 7: Usage in React component (pseudo-code)
console.log('React component usage example:')
console.log(`
// In a React component:
import { openWhatsAppWithTemplate } from '@/lib/whatsapp'

// Hero section button
<button onClick={() => openWhatsAppWithTemplate('hero')}>
  Falar com vendedor
</button>

// Product card button
<button onClick={() => openWhatsAppWithTemplate('product', 'Colchão Premium')}>
  Consultar no WhatsApp
</button>

// Promotional banner button
<button onClick={() => openWhatsAppWithTemplate('promo')}>
  Falar no WhatsApp
</button>

// Final CTA button
<button onClick={() => openWhatsAppWithTemplate('final')}>
  Falar com especialista
</button>

// Floating button
<button onClick={() => openWhatsAppWithTemplate('floating')}>
  <WhatsAppIcon />
</button>
`)
