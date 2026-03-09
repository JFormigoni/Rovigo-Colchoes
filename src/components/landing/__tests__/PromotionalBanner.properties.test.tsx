import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fc from 'fast-check'
import PromotionalBanner from '../PromotionalBanner'
import * as whatsappModule from '../../../lib/whatsapp'

// Mock the whatsapp module
vi.mock('../../../lib/whatsapp', () => ({
  openWhatsApp: vi.fn(),
  WHATSAPP_MESSAGES: {
    promo: 'Olá! Gostaria de saber mais sobre as promoções disponíveis.'
  }
}))

describe('PromotionalBanner - Property-Based Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  /**
   * **Validates: Requirements 6.4**
   * 
   * Property 1: WhatsApp CTA Behavior
   * For the promotional banner CTA button, when clicked, the system should 
   * open WhatsApp with a pre-filled promotional message.
   */
  it('Property 1: CTA button always opens WhatsApp with promo message', async () => {
    await fc.assert(
      fc.asyncProperty(fc.integer({ min: 1, max: 5 }), async (clickCount) => {
        vi.clearAllMocks()
        const user = userEvent.setup()
        const { unmount } = render(<PromotionalBanner />)
        
        const button = screen.getAllByRole('button', { name: /falar no whatsapp/i })[0]
        
        // Click the button multiple times
        for (let i = 0; i < clickCount; i++) {
          await user.click(button)
        }
        
        // Should call openWhatsApp with promo message for each click
        expect(whatsappModule.openWhatsApp).toHaveBeenCalledTimes(clickCount)
        expect(whatsappModule.openWhatsApp).toHaveBeenCalledWith(
          'Olá! Gostaria de saber mais sobre as promoções disponíveis.'
        )
        
        unmount()
      }),
      { numRuns: 5 }
    )
  }, 30000)

  /**
   * **Validates: Requirements 6.1, 6.2, 6.3**
   * 
   * Property 2: Promotional Benefits Display
   * The promotional banner should always display all three required benefits:
   * free shipping, special discounts, and trial period.
   */
  it('Property 2: Banner always displays all three promotional benefits', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { unmount } = render(<PromotionalBanner />)
        
        // Should display free shipping
        const freeShipping = screen.getByText('Frete Grátis')
        expect(freeShipping).toBeTruthy()
        
        // Should display special discounts
        const discounts = screen.getByText('Descontos Especiais')
        expect(discounts).toBeTruthy()
        
        // Should display trial period
        const trialPeriod = screen.getByText('100 Noites de Teste')
        expect(trialPeriod).toBeTruthy()
        
        unmount()
      }),
      { numRuns: 50 }
    )
  })

  /**
   * **Validates: Requirements 6.5**
   * 
   * Property 3: Contrasting Colors
   * The promotional banner should use contrasting colors (white text on blue gradient)
   * to stand out from other sections.
   */
  it('Property 3: Banner always uses contrasting colors for emphasis', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container, unmount } = render(<PromotionalBanner />)
        
        const section = container.firstChild as HTMLElement
        
        // Should have gradient background
        expect(section.className).toContain('bg-gradient-to-r')
        expect(section.className).toContain('from-blue-600')
        expect(section.className).toContain('to-blue-800')
        
        // Should have white text for contrast
        expect(section.className).toContain('text-white')
        
        unmount()
      }),
      { numRuns: 50 }
    )
  })

  /**
   * **Validates: Requirements 9.6, 14.4**
   * 
   * Property 4: CTA Touch Target Size
   * The CTA button should meet minimum touch target size requirements
   * for mobile accessibility (44px x 44px minimum).
   */
  it('Property 4: CTA button meets minimum touch target size', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { unmount } = render(<PromotionalBanner />)
        
        const button = screen.getAllByRole('button', { name: /falar no whatsapp/i })[0]
        
        // Check that button has adequate padding for touch targets
        // px-8 py-4 = 2rem horizontal, 1rem vertical padding
        // This ensures the button is large enough for touch interaction
        expect(button.className).toContain('px-8')
        expect(button.className).toContain('py-4')
        
        unmount()
      }),
      { numRuns: 50 }
    )
  })

  /**
   * **Validates: Requirements 14.5**
   * 
   * Property 5: Keyboard Accessibility
   * The CTA button should be keyboard navigable and display a visible
   * focus indicator when focused.
   */
  it('Property 5: CTA button is keyboard accessible with focus indicator', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { unmount } = render(<PromotionalBanner />)
        
        const button = screen.getAllByRole('button', { name: /falar no whatsapp/i })[0]
        
        // Should be focusable
        button.focus()
        expect(document.activeElement).toBe(button)
        
        // Should have focus ring classes
        expect(button.className).toContain('focus:ring')
        
        unmount()
      }),
      { numRuns: 50 }
    )
  })

  /**
   * **Validates: Requirements 14.7**
   * 
   * Property 6: ARIA Labels
   * Interactive elements should have appropriate ARIA labels for
   * screen reader compatibility.
   */
  it('Property 6: CTA button has proper ARIA label', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { unmount } = render(<PromotionalBanner />)
        
        const button = screen.getAllByRole('button', { name: /falar no whatsapp sobre promoções/i })[0]
        
        // Should have aria-label attribute
        const ariaLabel = button.getAttribute('aria-label')
        expect(ariaLabel).toBeTruthy()
        expect(ariaLabel && ariaLabel.length).toBeGreaterThan(0)
        
        unmount()
      }),
      { numRuns: 50 }
    )
  })

  /**
   * **Validates: Requirements 14.6**
   * 
   * Property 7: Semantic HTML
   * The promotional banner should use semantic HTML5 section element
   * with proper heading structure.
   */
  it('Property 7: Banner uses semantic HTML structure', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container, unmount } = render(<PromotionalBanner />)
        
        // Should use semantic section element
        const section = container.querySelector('section')
        expect(section).toBeTruthy()
        
        // Should have proper heading
        const heading = screen.getAllByRole('heading', { level: 2 })[0]
        expect(heading).toBeTruthy()
        
        // Section should have aria-labelledby
        expect(section?.getAttribute('aria-labelledby')).toBeTruthy()
        
        unmount()
      }),
      { numRuns: 50 }
    )
  })

  /**
   * **Validates: Requirements 9.2, 9.3**
   * 
   * Property 8: Responsive Layout
   * The banner should adapt its layout for different screen sizes,
   * using single column on mobile and multi-column on desktop.
   */
  it('Property 8: Banner has responsive layout classes', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container, unmount } = render(<PromotionalBanner />)
        
        // Benefits container should have responsive flex classes
        const benefitsContainer = container.querySelector('.flex')
        expect(benefitsContainer).toBeTruthy()
        
        // Should have mobile-first single column
        expect(benefitsContainer?.className).toContain('flex-col')
        
        // Should have desktop multi-column
        expect(benefitsContainer?.className).toContain('md:flex-row')
        
        unmount()
      }),
      { numRuns: 50 }
    )
  })
})
