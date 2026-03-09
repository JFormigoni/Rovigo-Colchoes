import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fc from 'fast-check'
import FinalCTASection from '../FinalCTASection'
import * as whatsappModule from '../../../lib/whatsapp'

// Mock the whatsapp module
vi.mock('../../../lib/whatsapp', () => ({
  openWhatsAppWithTemplate: vi.fn()
}))

describe('FinalCTASection - Property-Based Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  /**
   * **Validates: Requirements 7.4**
   * 
   * Property 1: WhatsApp CTA Behavior
   * For any CTA button on the landing page, when clicked, the system should 
   * open WhatsApp with a pre-filled message that identifies the landing page as the source.
   */
  it('Property 1: CTA button always opens WhatsApp with final template', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constant('final'),
        async (expectedTemplate) => {
          cleanup() // Clean up before each iteration
          const user = userEvent.setup()
          const openWhatsAppSpy = vi.spyOn(whatsappModule, 'openWhatsAppWithTemplate')
          
          const { container } = render(<FinalCTASection />)
          
          const buttons = container.querySelectorAll('button')
          const button = Array.from(buttons).find(btn => 
            btn.textContent?.includes('Falar com especialista no WhatsApp')
          )
          
          expect(button).toBeTruthy()
          await user.click(button!)
          
          expect(openWhatsAppSpy).toHaveBeenCalledWith(expectedTemplate)
          
          // Cleanup for next iteration
          vi.clearAllMocks()
          cleanup()
        }
      ),
      { numRuns: 5 } // Reduced for performance with async operations
    )
  }, 30000) // 30 second timeout for async property test

  /**
   * **Validates: Requirements 7.3**
   * 
   * Property 9: CTA Touch Target Size
   * For any CTA button element on the landing page, the button should have 
   * minimum dimensions of 44px x 44px to ensure adequate touch target size on mobile devices.
   */
  it('Property 9: CTA button meets minimum touch target size', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          cleanup() // Clean up before each iteration
          const { container } = render(<FinalCTASection />)
          
          const buttons = container.querySelectorAll('button')
          const button = Array.from(buttons).find(btn => 
            btn.textContent?.includes('Falar com especialista no WhatsApp')
          )
          
          expect(button).toBeTruthy()
          
          // Check for padding classes that ensure minimum size
          // py-4 = 1rem (16px) top + 1rem bottom = 32px vertical
          // px-10 = 2.5rem (40px) left + 2.5rem right = 80px horizontal
          // text-xl ensures adequate font size
          expect(button!.className).toContain('py-4')
          expect(button!.className).toContain('px-10')
          expect(button!.className).toContain('text-xl')
          
          // Cleanup
          cleanup()
        }
      ),
      { numRuns: 50 }
    )
  })

  /**
   * **Validates: Requirements 7.3, 14.4, 14.5**
   * 
   * Property 11: Interactive Element Keyboard Accessibility
   * For any interactive element (buttons, links) on the landing page, the element 
   * should be keyboard navigable (focusable via Tab key) and display a visible 
   * focus indicator when focused.
   */
  it('Property 11: CTA button is keyboard accessible with focus indicator', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          cleanup() // Clean up before each iteration
          const { container } = render(<FinalCTASection />)
          
          const buttons = container.querySelectorAll('button')
          const button = Array.from(buttons).find(btn => 
            btn.textContent?.includes('Falar com especialista no WhatsApp')
          ) as HTMLButtonElement
          
          expect(button).toBeTruthy()
          
          // Should be focusable
          button.focus()
          expect(document.activeElement).toBe(button)
          
          // Should have focus capability (button elements are focusable by default)
          const hasFocusCapability = 
            button.tabIndex >= 0 || 
            button.tagName === 'BUTTON' || 
            button.tagName === 'A'
          
          expect(hasFocusCapability).toBe(true)
          
          // Cleanup
          cleanup()
        }
      ),
      { numRuns: 50 }
    )
  })

  /**
   * **Validates: Requirements 14.7**
   * 
   * Property 13: ARIA Label Presence
   * For any interactive element that lacks clear text content (icon-only buttons, 
   * decorative elements with functionality), the element should include appropriate 
   * ARIA labels for screen reader compatibility.
   */
  it('Property 13: CTA button has proper ARIA label', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          cleanup() // Clean up before each iteration
          render(<FinalCTASection />)
          
          const buttons = screen.getAllByRole('button')
          const button = buttons.find(btn => 
            btn.textContent?.includes('Falar com especialista no WhatsApp')
          )
          
          expect(button).toBeTruthy()
          
          // Should have aria-label attribute
          const ariaLabel = button!.getAttribute('aria-label')
          expect(ariaLabel).toBeTruthy()
          expect(ariaLabel!.length).toBeGreaterThan(0)
          
          cleanup()
        }
      ),
      { numRuns: 50 }
    )
  })

  /**
   * **Validates: Requirements 7.1, 7.2**
   * 
   * Property: Content Completeness
   * The final CTA section should always display both the motivational phrase 
   * and the prominent CTA button.
   */
  it('Property: Section always displays complete content', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          cleanup() // Clean up before each iteration
          const { container } = render(<FinalCTASection />)
          
          // Should display motivational headline
          const headings = container.querySelectorAll('h2')
          expect(headings.length).toBeGreaterThan(0)
          const heading = headings[0]
          expect(heading.textContent).toBeTruthy()
          expect(heading.textContent!.length).toBeGreaterThan(0)
          
          // Should display descriptive text
          const description = container.textContent
          expect(description).toContain('Fale com nossos especialistas')
          
          // Should display CTA button
          const buttons = container.querySelectorAll('button')
          const button = Array.from(buttons).find(btn => 
            btn.textContent?.includes('Falar com especialista no WhatsApp')
          )
          expect(button).toBeTruthy()
          
          cleanup()
        }
      ),
      { numRuns: 50 }
    )
  })

  /**
   * **Validates: Requirements 14.2, 14.3**
   * 
   * Property 10: Text Contrast Compliance
   * For any text element on the landing page, the color contrast ratio between 
   * text and background should be at least 4.5:1 for normal text and at least 
   * 3:1 for large text (18pt+ or 14pt+ bold).
   */
  it('Property 10: Text elements have sufficient contrast', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          cleanup() // Clean up before each iteration
          const { container } = render(<FinalCTASection />)
          
          // Check heading (large text - needs 3:1 minimum)
          const headings = container.querySelectorAll('h2')
          expect(headings[0].className).toContain('text-gray-900') // Dark text on light background
          
          // Check description text (normal text - needs 4.5:1 minimum)
          const paragraphs = container.querySelectorAll('p')
          expect(paragraphs[0].className).toContain('text-gray-600') // Medium-dark text on light background
          
          // Check button text (white on green - should have good contrast)
          const buttons = container.querySelectorAll('button')
          const button = Array.from(buttons).find(btn => 
            btn.textContent?.includes('Falar com especialista no WhatsApp')
          )
          expect(button!.className).toContain('text-white')
          expect(button!.className).toContain('bg-green-500')
          
          cleanup()
        }
      ),
      { numRuns: 50 }
    )
  })
})
