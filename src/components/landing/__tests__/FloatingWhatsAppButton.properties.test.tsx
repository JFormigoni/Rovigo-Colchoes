import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import fc from 'fast-check'
import FloatingWhatsAppButton from '../FloatingWhatsAppButton'
import * as whatsappModule from '../../../lib/whatsapp'

// Mock the whatsapp module
vi.mock('../../../lib/whatsapp', () => ({
  openWhatsAppWithTemplate: vi.fn()
}))

describe('FloatingWhatsAppButton - Property-Based Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  // **Validates: Requirements 8.5**
  it('Property: clicking the button always calls openWhatsAppWithTemplate with "floating"', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 5 }), (clickCount) => {
        vi.clearAllMocks()
        cleanup()
        render(<FloatingWhatsAppButton />)
        const button = screen.getByRole('button', { name: /falar no whatsapp/i })

        // Click the button multiple times
        for (let i = 0; i < clickCount; i++) {
          fireEvent.click(button)
        }

        expect(whatsappModule.openWhatsAppWithTemplate).toHaveBeenCalledTimes(clickCount)
        
        // Verify all calls used 'floating' template
        const calls = (whatsappModule.openWhatsAppWithTemplate as any).mock.calls
        calls.forEach((call: any[]) => {
          expect(call[0]).toBe('floating')
        })
      }),
      { numRuns: 10 }
    )
  })

  // **Validates: Requirements 8.2, 8.7**
  it('Property: button visibility is determined by scroll position relative to 300px threshold', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 2000 }), (scrollPosition) => {
        cleanup()
        render(<FloatingWhatsAppButton />)
        const button = screen.getByRole('button', { name: /falar no whatsapp/i })

        // Set scroll position
        Object.defineProperty(window, 'pageYOffset', {
          writable: true,
          configurable: true,
          value: scrollPosition
        })
        fireEvent.scroll(window)

        // Button should be visible if scroll > 300px
        if (scrollPosition > 300) {
          expect(button.className).toContain('opacity-100')
          expect(button.className).not.toContain('pointer-events-none')
        } else {
          expect(button.className).toContain('opacity-0')
          expect(button.className).toContain('pointer-events-none')
        }
      }),
      { numRuns: 50 }
    )
  })

  // **Validates: Requirements 8.1, 8.3, 8.6**
  it('Property: button always has fixed positioning in bottom-right corner', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 1000 }), (scrollPosition) => {
        cleanup()
        render(<FloatingWhatsAppButton />)
        const button = screen.getByRole('button', { name: /falar no whatsapp/i })

        // Simulate scroll
        Object.defineProperty(window, 'pageYOffset', {
          writable: true,
          configurable: true,
          value: scrollPosition
        })
        fireEvent.scroll(window)

        // Position should remain fixed regardless of scroll
        expect(button.className).toContain('fixed')
        expect(button.className).toContain('bottom-6')
        expect(button.className).toContain('right-6')
      }),
      { numRuns: 50 }
    )
  })

  // **Validates: Requirements 8.4**
  it('Property: button always has high z-index to stay above other elements', { timeout: 10000 }, () => {
    fc.assert(
      fc.property(fc.boolean(), (isVisible) => {
        cleanup()
        render(<FloatingWhatsAppButton />)
        const button = screen.getByRole('button', { name: /falar no whatsapp/i })

        // Simulate visibility state
        const scrollPos = isVisible ? 400 : 100
        Object.defineProperty(window, 'pageYOffset', {
          writable: true,
          configurable: true,
          value: scrollPos
        })
        fireEvent.scroll(window)

        // z-index should be high regardless of visibility
        expect(button.className).toContain('z-50')
      }),
      { numRuns: 50 }
    )
  })

  // **Validates: Requirements 9.6**
  it('Property: button always meets minimum touch target size of 44px x 44px', () => {
    fc.assert(
      fc.property(fc.boolean(), (_isVisible) => {
        cleanup()
        render(<FloatingWhatsAppButton />)
        const button = screen.getByRole('button', { name: /falar no whatsapp/i })

        // Check minimum size via inline styles (56px > 44px requirement)
        expect(button.style.minWidth).toBe('56px')
        expect(button.style.minHeight).toBe('56px')
        
        // Verify the button has flex layout to center icon
        expect(button.className).toContain('flex')
        expect(button.className).toContain('items-center')
        expect(button.className).toContain('justify-center')
      }),
      { numRuns: 50 }
    )
  })

  // **Validates: Requirements 8.2**
  it('Property: button has smooth transition animation for all visibility changes', { timeout: 10000 }, () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer({ min: 0, max: 1000 }), { minLength: 2, maxLength: 5 }),
        (scrollPositions) => {
          cleanup()
          render(<FloatingWhatsAppButton />)
          const button = screen.getByRole('button', { name: /falar no whatsapp/i })

          // Simulate multiple scroll position changes
          scrollPositions.forEach((position) => {
            Object.defineProperty(window, 'pageYOffset', {
              writable: true,
              configurable: true,
              value: position
            })
            fireEvent.scroll(window)
          })

          // Transition classes should always be present
          expect(button.className).toContain('transition-all')
          expect(button.className).toContain('duration-300')
        }
      ),
      { numRuns: 30 }
    )
  })

  // **Validates: Requirements 14.7**
  it('Property: button always has accessible ARIA label', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 1000 }), (_scrollPosition) => {
        cleanup()
        render(<FloatingWhatsAppButton />)
        const button = screen.getByRole('button', { name: /falar no whatsapp/i })

        // ARIA label should be present regardless of state
        expect(button.getAttribute('aria-label')).toBe('Falar no WhatsApp')
        expect(button.getAttribute('title')).toBe('Falar no WhatsApp')
      }),
      { numRuns: 50 }
    )
  })

  // **Validates: Requirements 8.3**
  it('Property: button always displays WhatsApp icon', () => {
    fc.assert(
      fc.property(fc.boolean(), (_isVisible) => {
        cleanup()
        render(<FloatingWhatsAppButton />)
        const button = screen.getByRole('button', { name: /falar no whatsapp/i })

        // Icon should be present (MessageCircle from lucide-react)
        const icon = button.querySelector('svg')
        expect(icon).toBeTruthy()
        
        // Check icon classes
        const iconClasses = icon?.getAttribute('class') || ''
        expect(iconClasses).toContain('w-8')
        expect(iconClasses).toContain('h-8')
      }),
      { numRuns: 50 }
    )
  })
})
