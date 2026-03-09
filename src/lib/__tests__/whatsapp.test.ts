import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  WHATSAPP_MESSAGES,
  formatWhatsAppURL,
  openWhatsApp,
  openWhatsAppWithTemplate,
  type CTAType
} from '../whatsapp'
import { WHATSAPP_NUMBER } from '../config'

describe('whatsapp helper functions', () => {
  describe('WHATSAPP_MESSAGES', () => {
    it('should have all required message templates', () => {
      expect(WHATSAPP_MESSAGES).toHaveProperty('hero')
      expect(WHATSAPP_MESSAGES).toHaveProperty('product')
      expect(WHATSAPP_MESSAGES).toHaveProperty('promo')
      expect(WHATSAPP_MESSAGES).toHaveProperty('final')
      expect(WHATSAPP_MESSAGES).toHaveProperty('floating')
    })

    it('should have string messages for non-product CTAs', () => {
      expect(typeof WHATSAPP_MESSAGES.hero).toBe('string')
      expect(typeof WHATSAPP_MESSAGES.promo).toBe('string')
      expect(typeof WHATSAPP_MESSAGES.final).toBe('string')
      expect(typeof WHATSAPP_MESSAGES.floating).toBe('string')
    })

    it('should have function message for product CTA', () => {
      expect(typeof WHATSAPP_MESSAGES.product).toBe('function')
    })

    it('should generate product message with product name', () => {
      const productName = 'Colchão Premium'
      const message = WHATSAPP_MESSAGES.product(productName)
      expect(message).toContain(productName)
      expect(message).toContain('Olá!')
    })
  })

  describe('formatWhatsAppURL', () => {
    it('should format URL with correct structure', () => {
      const message = 'Test message'
      const url = formatWhatsAppURL(message)
      
      expect(url).toContain('https://wa.me/')
      expect(url).toContain(WHATSAPP_NUMBER)
      expect(url).toContain('?text=')
    })

    it('should properly encode simple messages', () => {
      const message = 'Hello World'
      const url = formatWhatsAppURL(message)
      
      expect(url).toBe(`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20World`)
    })

    it('should properly encode messages with special characters', () => {
      const message = 'Olá! Como está?'
      const url = formatWhatsAppURL(message)
      
      // Should contain the encoded message
      expect(url).toContain(encodeURIComponent(message))
      
      // Spaces should be encoded
      expect(url).not.toContain(' ')
      
      // The message should be decodable back to original
      const textParam = url.split('?text=')[1]
      expect(decodeURIComponent(textParam)).toBe(message)
    })

    it('should properly encode messages with line breaks', () => {
      const message = 'Line 1\nLine 2'
      const url = formatWhatsAppURL(message)
      
      expect(url).toContain('%0A') // encoded newline
    })

    it('should properly encode messages with emojis', () => {
      const message = 'Hello 😊'
      const url = formatWhatsAppURL(message)
      
      expect(url).toContain(encodeURIComponent(message))
    })
  })

  describe('openWhatsApp', () => {
    let windowOpenSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
      windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    })

    afterEach(() => {
      windowOpenSpy.mockRestore()
    })

    it('should call window.open with formatted URL', () => {
      const message = 'Test message'
      openWhatsApp(message)
      
      expect(windowOpenSpy).toHaveBeenCalledWith(
        formatWhatsAppURL(message),
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('should open WhatsApp with encoded message', () => {
      const message = 'Olá! Como está?'
      openWhatsApp(message)
      
      const expectedURL = formatWhatsAppURL(message)
      expect(windowOpenSpy).toHaveBeenCalledWith(
        expectedURL,
        '_blank',
        'noopener,noreferrer'
      )
    })
  })

  describe('openWhatsAppWithTemplate', () => {
    let windowOpenSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
      windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    })

    afterEach(() => {
      windowOpenSpy.mockRestore()
    })

    it('should open WhatsApp with hero template', () => {
      openWhatsAppWithTemplate('hero')
      
      const expectedURL = formatWhatsAppURL(WHATSAPP_MESSAGES.hero)
      expect(windowOpenSpy).toHaveBeenCalledWith(
        expectedURL,
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('should open WhatsApp with promo template', () => {
      openWhatsAppWithTemplate('promo')
      
      const expectedURL = formatWhatsAppURL(WHATSAPP_MESSAGES.promo)
      expect(windowOpenSpy).toHaveBeenCalledWith(
        expectedURL,
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('should open WhatsApp with final template', () => {
      openWhatsAppWithTemplate('final')
      
      const expectedURL = formatWhatsAppURL(WHATSAPP_MESSAGES.final)
      expect(windowOpenSpy).toHaveBeenCalledWith(
        expectedURL,
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('should open WhatsApp with floating template', () => {
      openWhatsAppWithTemplate('floating')
      
      const expectedURL = formatWhatsAppURL(WHATSAPP_MESSAGES.floating)
      expect(windowOpenSpy).toHaveBeenCalledWith(
        expectedURL,
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('should open WhatsApp with product template and product name', () => {
      const productName = 'Colchão Premium'
      openWhatsAppWithTemplate('product', productName)
      
      const expectedMessage = WHATSAPP_MESSAGES.product(productName)
      const expectedURL = formatWhatsAppURL(expectedMessage)
      expect(windowOpenSpy).toHaveBeenCalledWith(
        expectedURL,
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('should throw error when product CTA is used without product name', () => {
      expect(() => {
        openWhatsAppWithTemplate('product')
      }).toThrow('Product name is required for product CTA type')
    })

    it('should include product name in the message', () => {
      const productName = 'Colchão Ortopédico'
      openWhatsAppWithTemplate('product', productName)
      
      const callArgs = windowOpenSpy.mock.calls[0]
      const url = callArgs[0] as string
      
      expect(url).toContain(encodeURIComponent(productName))
    })
  })

  describe('integration tests', () => {
    let windowOpenSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
      windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    })

    afterEach(() => {
      windowOpenSpy.mockRestore()
    })

    it('should generate valid WhatsApp URLs for all CTA types', () => {
      const ctaTypes: CTAType[] = ['hero', 'promo', 'final', 'floating']
      
      ctaTypes.forEach(ctaType => {
        windowOpenSpy.mockClear()
        openWhatsAppWithTemplate(ctaType)
        
        const callArgs = windowOpenSpy.mock.calls[0]
        const url = callArgs[0] as string
        
        expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=.+/)
        expect(url).toContain(WHATSAPP_NUMBER)
      })
    })

    it('should handle product CTA with various product names', () => {
      const productNames = [
        'Colchão Premium',
        'Colchão Ortopédico',
        'Colchão King Size',
        'Colchão com Molas'
      ]
      
      productNames.forEach(productName => {
        windowOpenSpy.mockClear()
        openWhatsAppWithTemplate('product', productName)
        
        const callArgs = windowOpenSpy.mock.calls[0]
        const url = callArgs[0] as string
        
        expect(url).toContain(encodeURIComponent(productName))
      })
    })
  })
})
