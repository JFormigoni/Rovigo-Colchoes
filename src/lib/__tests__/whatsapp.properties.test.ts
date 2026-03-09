import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { formatWhatsAppURL, WHATSAPP_MESSAGES, type CTAType } from '../whatsapp'
import { WHATSAPP_NUMBER } from '../config'

// Feature: landing-page-colchoes, Property 7: WhatsApp Link Format
describe('Property 7: WhatsApp Link Format', () => {
  it('any WhatsApp link follows the correct format https://wa.me/[phone]?text=[encoded_message]', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 500 }),
        (message) => {
          const url = formatWhatsAppURL(message)
          
          // Should start with https://wa.me/
          expect(url).toMatch(/^https:\/\/wa\.me\//)
          
          // Should contain the phone number
          expect(url).toContain(WHATSAPP_NUMBER)
          
          // Should contain ?text= parameter
          expect(url).toContain('?text=')
          
          // Should follow the exact format
          const expectedPrefix = `https://wa.me/${WHATSAPP_NUMBER}?text=`
          expect(url).toMatch(new RegExp(`^${expectedPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`))
        }
      ),
      { numRuns: 100 }
    )
  })

  it('any message with special characters is properly URL encoded', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 200 }),
        (message) => {
          const url = formatWhatsAppURL(message)
          
          // Extract the text parameter from the URL
          const textParam = url.split('?text=')[1]
          
          // The text parameter should be URL encoded
          // Special characters that should NOT appear unencoded in URL
          const specialChars = ['!', '?', ' ', '#', '&', '=', '+', '@', '%', '\n', '\r']
          
          // If the original message contains special characters,
          // they should be encoded in the URL
          specialChars.forEach(char => {
            if (message.includes(char)) {
              // The character should be encoded (not appear as-is in the text parameter)
              // Exception: % might appear as part of encoding
              if (char !== '%') {
                // Check that the raw character doesn't appear unencoded
                // (it should appear as %XX format)
                const unEncodedPattern = new RegExp(`[^%]${char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`)
                if (char === ' ') {
                  // Space should be encoded as %20
                  expect(textParam).not.toContain(' ')
                }
              }
            }
          })
          
          // The encoded message should be decodable back to original
          const decodedMessage = decodeURIComponent(textParam)
          expect(decodedMessage).toBe(message)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('any message with emojis is properly URL encoded', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }),
        fc.constantFrom('😊', '👍', '❤️', '🎉', '✨', '🔥', '💯'),
        (message, emoji) => {
          const messageWithEmoji = `${message} ${emoji}`
          const url = formatWhatsAppURL(messageWithEmoji)
          
          // Should contain encoded emoji
          const textParam = url.split('?text=')[1]
          expect(textParam).toBeTruthy()
          
          // Should be decodable back to original
          const decodedMessage = decodeURIComponent(textParam)
          expect(decodedMessage).toBe(messageWithEmoji)
        }
      ),
      { numRuns: 50 }
    )
  })

  it('any message with line breaks is properly URL encoded', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1, maxLength: 50 }), { minLength: 2, maxLength: 5 }),
        (lines) => {
          const message = lines.join('\n')
          const url = formatWhatsAppURL(message)
          
          // Should contain encoded newline (%0A)
          const textParam = url.split('?text=')[1]
          expect(textParam).toContain('%0A')
          
          // Should not contain unencoded newline
          expect(textParam).not.toContain('\n')
          
          // Should be decodable back to original
          const decodedMessage = decodeURIComponent(textParam)
          expect(decodedMessage).toBe(message)
        }
      ),
      { numRuns: 50 }
    )
  })

  it('any CTA type generates a valid WhatsApp URL format', () => {
    fc.assert(
      fc.property(
        fc.constantFrom<CTAType>('hero', 'promo', 'final', 'floating'),
        (ctaType) => {
          const message = WHATSAPP_MESSAGES[ctaType]
          const url = formatWhatsAppURL(message)
          
          // Should follow the correct format
          expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=.+/)
          
          // Should contain the phone number
          expect(url).toContain(WHATSAPP_NUMBER)
          
          // Should have properly encoded message
          const textParam = url.split('?text=')[1]
          const decodedMessage = decodeURIComponent(textParam)
          expect(decodedMessage).toBe(message)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('any product name in product CTA generates a valid WhatsApp URL format', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }),
        (productName) => {
          const message = WHATSAPP_MESSAGES.product(productName)
          const url = formatWhatsAppURL(message)
          
          // Should follow the correct format
          expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=.+/)
          
          // Should contain the phone number
          expect(url).toContain(WHATSAPP_NUMBER)
          
          // Should have properly encoded message with product name
          const textParam = url.split('?text=')[1]
          const decodedMessage = decodeURIComponent(textParam)
          expect(decodedMessage).toBe(message)
          expect(decodedMessage).toContain(productName)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('any message with Portuguese special characters is properly encoded', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }),
        fc.constantFrom('á', 'é', 'í', 'ó', 'ú', 'ã', 'õ', 'â', 'ê', 'ô', 'ç', 'Á', 'É', 'Ç'),
        (message, specialChar) => {
          const messageWithSpecialChar = `${message} ${specialChar}`
          const url = formatWhatsAppURL(messageWithSpecialChar)
          
          // Should be properly encoded
          const textParam = url.split('?text=')[1]
          expect(textParam).toBeTruthy()
          
          // Should be decodable back to original
          const decodedMessage = decodeURIComponent(textParam)
          expect(decodedMessage).toBe(messageWithSpecialChar)
        }
      ),
      { numRuns: 50 }
    )
  })

  it('any message with currency symbols is properly encoded', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10000 }),
        (price) => {
          const message = `Preço: R$ ${price},00`
          const url = formatWhatsAppURL(message)
          
          // Should be properly encoded
          const textParam = url.split('?text=')[1]
          expect(textParam).toBeTruthy()
          
          // Should not contain unencoded special characters
          expect(textParam).not.toContain('$')
          expect(textParam).not.toContain(' ')
          
          // Should be decodable back to original
          const decodedMessage = decodeURIComponent(textParam)
          expect(decodedMessage).toBe(message)
        }
      ),
      { numRuns: 50 }
    )
  })

  it('any empty or whitespace-only message still generates valid URL format', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('', ' ', '  ', '\t', '\n', '   \n  '),
        (message) => {
          const url = formatWhatsAppURL(message)
          
          // Should still follow the correct format
          expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=/)
          
          // Should contain the phone number
          expect(url).toContain(WHATSAPP_NUMBER)
          
          // Should have the text parameter (even if empty or encoded whitespace)
          expect(url).toContain('?text=')
        }
      ),
      { numRuns: 20 }
    )
  })

  it('any very long message is properly encoded without truncation', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 500, maxLength: 1000 }),
        (longMessage) => {
          const url = formatWhatsAppURL(longMessage)
          
          // Should follow the correct format
          expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=/)
          
          // Should be decodable back to original without truncation
          const textParam = url.split('?text=')[1]
          const decodedMessage = decodeURIComponent(textParam)
          expect(decodedMessage).toBe(longMessage)
          expect(decodedMessage.length).toBe(longMessage.length)
        }
      ),
      { numRuns: 30 }
    )
  })
})
