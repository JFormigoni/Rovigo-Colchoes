import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fc from 'fast-check'
import ProductCardLanding from '../ProductCardLanding'
import type { ProductLanding } from '@/types/landing'
import * as whatsappModule from '@/lib/whatsapp'

// Mock the whatsapp module
vi.mock('@/lib/whatsapp', () => ({
  openWhatsApp: vi.fn(),
  WHATSAPP_MESSAGES: {
    product: (name: string) => `Olá! Tenho interesse no modelo ${name}. Gostaria de mais informações.`
  }
}))

// Feature: landing-page-colchoes, Property 2: Product Card Completeness
describe('Property 2: Product Card Completeness', () => {
  // Custom arbitraries for more realistic product data
  const productNameArb = fc.string({ minLength: 5, maxLength: 100 }).filter(s => s.trim().length >= 5)
  const productDescriptionArb = fc.string({ minLength: 20, maxLength: 500 }).filter(s => s.trim().length >= 20)
  const productHighlightArb = fc.string({ minLength: 5, maxLength: 100 }).filter(s => s.trim().length >= 5)

  it('any product card displays all required fields: image, name, description, rating, highlights, and CTA button', { timeout: 60000 }, () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          name: productNameArb,
          description: productDescriptionArb,
          image: fc.webUrl(),
          rating: fc.integer({ min: 1, max: 5 }),
          highlights: fc.array(productHighlightArb, { minLength: 1, maxLength: 5 })
        }),
        (product: ProductLanding) => {
          cleanup() // Clean up before each render
          const { container } = render(<ProductCardLanding product={product} />)
          
          // Requirement 3.4: Product image must be displayed
          const img = screen.getByRole('img') as HTMLImageElement
          expect(img).toBeTruthy()
          expect(img.getAttribute('alt')).toBe(product.name)
          expect(img.src).toBeTruthy()
          
          // Requirement 3.2: Product name must be displayed
          // Use heading role to specifically target the name
          const heading = screen.getByRole('heading', { level: 3 })
          expect(heading.textContent).toBe(product.name)
          
          // Requirement 3.3: Product description must be displayed
          // Description is in a paragraph with specific class
          const description = container.querySelector('.line-clamp-3')
          expect(description).toBeTruthy()
          expect(description?.textContent).toBe(product.description)
          
          // Requirement 3.5: Product rating must be displayed
          // Should display 5 stars total
          const stars = screen.getAllByTestId('star-icon')
          expect(stars).toHaveLength(5)
          
          // Should display rating value text
          const ratingText = screen.getByText(`(${product.rating}/5)`)
          expect(ratingText).toBeTruthy()
          
          // Should have accessible rating label
          const ratingContainer = screen.getByLabelText(`Avaliação: ${product.rating} de 5 estrelas`)
          expect(ratingContainer).toBeTruthy()
          
          // Verify correct number of filled stars
          const starElements = container.querySelectorAll('[data-testid="star-icon"]')
          let filledStars = 0
          let emptyStars = 0
          
          starElements.forEach((star) => {
            if (star.classList.contains('fill-yellow-400')) {
              filledStars++
            } else if (star.classList.contains('fill-gray-200')) {
              emptyStars++
            }
          })
          
          expect(filledStars).toBe(product.rating)
          expect(emptyStars).toBe(5 - product.rating)
          
          // Requirement 3.6: Product highlights must be displayed
          // Highlights are in a ul element
          const highlightsList = container.querySelector('ul')
          expect(highlightsList).toBeTruthy()
          
          // At least one highlight should be visible (up to 3 are shown)
          const highlightItems = highlightsList?.querySelectorAll('li')
          const visibleHighlightsCount = Math.min(product.highlights.length, 3)
          expect(highlightItems?.length).toBe(visibleHighlightsCount)
          
          // Requirement 3.6: CTA button must be displayed
          // Check that button exists with WhatsApp text (sufficient for completeness property)
          const ctaButton = screen.getByRole('button', { name: /consultar.*whatsapp/i })
          expect(ctaButton).toBeTruthy()
          
          // Verify button has aria-label attribute (accessibility requirement)
          expect(ctaButton.getAttribute('aria-label')).toBeTruthy()
          expect(ctaButton.getAttribute('aria-label')).toContain('Consultar')
          expect(ctaButton.getAttribute('aria-label')).toContain('WhatsApp')
        }
      ),
      { numRuns: 10 }
    )
  })

  it('any product with minimal highlights still displays all required fields', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          name: productNameArb,
          description: productDescriptionArb,
          image: fc.webUrl(),
          rating: fc.integer({ min: 1, max: 5 }),
          highlights: fc.array(productHighlightArb, { minLength: 1, maxLength: 1 })
        }),
        (product: ProductLanding) => {
          cleanup() // Clean up before each render
          const { container } = render(<ProductCardLanding product={product} />)
          
          // All required fields should still be present
          expect(screen.getByRole('img')).toBeTruthy()
          expect(screen.getByRole('heading', { level: 3 })).toBeTruthy()
          expect(container.querySelector('.line-clamp-3')).toBeTruthy()
          expect(screen.getAllByTestId('star-icon')).toHaveLength(5)
          
          // Should have exactly 1 highlight
          const highlightsList = container.querySelector('ul')
          const highlightItems = highlightsList?.querySelectorAll('li')
          expect(highlightItems?.length).toBe(1)
          
          expect(screen.getByRole('button', { name: /consultar.*whatsapp/i })).toBeTruthy()
        }
      ),
      { numRuns: 50 }
    )
  })

  it('any product with maximum highlights displays all required fields', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          name: productNameArb,
          description: productDescriptionArb,
          image: fc.webUrl(),
          rating: fc.integer({ min: 1, max: 5 }),
          highlights: fc.array(productHighlightArb, { minLength: 5, maxLength: 10 })
        }),
        (product: ProductLanding) => {
          cleanup() // Clean up before each render
          const { container } = render(<ProductCardLanding product={product} />)
          
          // All required fields should still be present
          expect(screen.getByRole('img')).toBeTruthy()
          expect(screen.getByRole('heading', { level: 3 })).toBeTruthy()
          expect(container.querySelector('.line-clamp-3')).toBeTruthy()
          expect(screen.getAllByTestId('star-icon')).toHaveLength(5)
          
          // Only first 3 highlights should be displayed
          const highlightsList = container.querySelector('ul')
          const highlightItems = highlightsList?.querySelectorAll('li')
          expect(highlightItems?.length).toBe(3)
          
          expect(screen.getByRole('button', { name: /consultar.*whatsapp/i })).toBeTruthy()
        }
      ),
      { numRuns: 50 }
    )
  })

  it('any product with rating extremes (1 or 5 stars) displays correctly', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          name: productNameArb,
          description: productDescriptionArb,
          image: fc.webUrl(),
          rating: fc.constantFrom(1, 5),
          highlights: fc.array(productHighlightArb, { minLength: 1, maxLength: 5 })
        }),
        (product: ProductLanding) => {
          cleanup() // Clean up before each render
          const { container } = render(<ProductCardLanding product={product} />)
          
          // All required fields should be present
          expect(screen.getByRole('img')).toBeTruthy()
          expect(screen.getByRole('heading', { level: 3 })).toBeTruthy()
          expect(container.querySelector('.line-clamp-3')).toBeTruthy()
          
          // Verify star rendering for extreme ratings
          const starElements = container.querySelectorAll('[data-testid="star-icon"]')
          expect(starElements).toHaveLength(5)
          
          let filledStars = 0
          starElements.forEach((star) => {
            if (star.classList.contains('fill-yellow-400')) {
              filledStars++
            }
          })
          
          expect(filledStars).toBe(product.rating)
          
          expect(screen.getByRole('button', { name: /consultar.*whatsapp/i })).toBeTruthy()
        }
      ),
      { numRuns: 50 }
    )
  })

  it('any product with special characters in name and description displays correctly', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          name: productNameArb,
          description: productDescriptionArb,
          image: fc.webUrl(),
          rating: fc.integer({ min: 1, max: 5 }),
          highlights: fc.array(productHighlightArb, { minLength: 1, maxLength: 5 })
        }),
        fc.constantFrom('á', 'é', 'í', 'ó', 'ú', 'ã', 'õ', 'ç', '!', '?', '&', '%'),
        (product: ProductLanding, specialChar: string) => {
          cleanup() // Clean up before each render
          const productWithSpecialChars: ProductLanding = {
            ...product,
            name: `${product.name} ${specialChar}`,
            description: `${product.description} ${specialChar}`
          }
          
          const { container } = render(<ProductCardLanding product={productWithSpecialChars} />)
          
          // All required fields should be present even with special characters
          expect(screen.getByRole('img')).toBeTruthy()
          
          const heading = screen.getByRole('heading', { level: 3 })
          expect(heading.textContent).toBe(productWithSpecialChars.name)
          
          const description = container.querySelector('.line-clamp-3')
          expect(description?.textContent).toBe(productWithSpecialChars.description)
          
          expect(screen.getAllByTestId('star-icon')).toHaveLength(5)
          expect(screen.getByRole('button', { name: /consultar.*whatsapp/i })).toBeTruthy()
        }
      ),
      { numRuns: 50 }
    )
  })
})

// Feature: landing-page-colchoes, Property 3: Product-Specific WhatsApp Message
/**
 * **Validates: Requirements 3.7, 12.5**
 * 
 * Property 3: Product-Specific WhatsApp Message
 * 
 * For any product, when the WhatsApp CTA button is clicked,
 * the openWhatsApp function must be called with a message that includes the product name.
 * 
 * This ensures that:
 * - Requirement 3.7: WhatsApp CTA button with product-specific message
 * - Requirement 12.5: Message templates include context-specific information
 */
describe('Property 3: Product-Specific WhatsApp Message', () => {
  // Custom arbitraries for more realistic product data
  const productNameArb = fc.string({ minLength: 5, maxLength: 100 }).filter(s => s.trim().length >= 5)
  const productDescriptionArb = fc.string({ minLength: 20, maxLength: 500 }).filter(s => s.trim().length >= 20)
  const productHighlightArb = fc.string({ minLength: 5, maxLength: 100 }).filter(s => s.trim().length >= 5)

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
  })

  it('any product WhatsApp button click includes product name in message', { timeout: 30000 }, async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          id: fc.uuid(),
          name: productNameArb,
          description: productDescriptionArb,
          image: fc.webUrl(),
          rating: fc.integer({ min: 1, max: 5 }),
          highlights: fc.array(productHighlightArb, { minLength: 1, maxLength: 5 })
        }),
        async (product: ProductLanding) => {
          cleanup() // Clean up before each render
          
          // Get the mocked openWhatsApp function
          const openWhatsAppMock = vi.mocked(whatsappModule.openWhatsApp)
          openWhatsAppMock.mockClear()
          
          // Render the component
          render(<ProductCardLanding product={product} />)
          
          // Find and click the WhatsApp button
          const ctaButton = screen.getByRole('button', { name: /consultar.*whatsapp/i })
          const user = userEvent.setup()
          await user.click(ctaButton)
          
          // Verify openWhatsApp was called
          expect(openWhatsAppMock).toHaveBeenCalledTimes(1)
          
          // Get the message that was passed to openWhatsApp
          const calledMessage = openWhatsAppMock.mock.calls[0][0]
          
          // Requirement 3.7 & 12.5: Message must include the product name
          expect(calledMessage).toContain(product.name)
          
          // Additional verification: message should follow the expected template format
          expect(calledMessage).toMatch(/interesse no modelo/i)
          expect(calledMessage).toMatch(/mais informações/i)
        }
      ),
      { numRuns: 50 }
    )
  })

  it('any product with special characters in name includes correct name in WhatsApp message', { timeout: 30000 }, async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          id: fc.uuid(),
          name: productNameArb,
          description: productDescriptionArb,
          image: fc.webUrl(),
          rating: fc.integer({ min: 1, max: 5 }),
          highlights: fc.array(productHighlightArb, { minLength: 1, maxLength: 5 })
        }),
        fc.constantFrom('á', 'é', 'í', 'ó', 'ú', 'ã', 'õ', 'ç', '!', '?', '&', '%', '"', "'"),
        async (product: ProductLanding, specialChar: string) => {
          cleanup() // Clean up before each render
          
          // Create product with special characters in name
          const productWithSpecialChars: ProductLanding = {
            ...product,
            name: `${product.name} ${specialChar}`
          }
          
          // Get the mocked openWhatsApp function
          const openWhatsAppMock = vi.mocked(whatsappModule.openWhatsApp)
          openWhatsAppMock.mockClear()
          
          // Render the component
          render(<ProductCardLanding product={productWithSpecialChars} />)
          
          // Find and click the WhatsApp button
          const ctaButton = screen.getByRole('button', { name: /consultar.*whatsapp/i })
          const user = userEvent.setup()
          await user.click(ctaButton)
          
          // Verify openWhatsApp was called
          expect(openWhatsAppMock).toHaveBeenCalledTimes(1)
          
          // Get the message that was passed to openWhatsApp
          const calledMessage = openWhatsAppMock.mock.calls[0][0]
          
          // Message must include the product name with special characters
          expect(calledMessage).toContain(productWithSpecialChars.name)
        }
      ),
      { numRuns: 50 }
    )
  })

  it('any product with very long name includes complete name in WhatsApp message', { timeout: 30000 }, async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          id: fc.uuid(),
          name: fc.string({ minLength: 80, maxLength: 100 }).filter(s => s.trim().length >= 80),
          description: productDescriptionArb,
          image: fc.webUrl(),
          rating: fc.integer({ min: 1, max: 5 }),
          highlights: fc.array(productHighlightArb, { minLength: 1, maxLength: 5 })
        }),
        async (product: ProductLanding) => {
          cleanup() // Clean up before each render
          
          // Get the mocked openWhatsApp function
          const openWhatsAppMock = vi.mocked(whatsappModule.openWhatsApp)
          openWhatsAppMock.mockClear()
          
          // Render the component
          render(<ProductCardLanding product={product} />)
          
          // Find and click the WhatsApp button
          const ctaButton = screen.getByRole('button', { name: /consultar.*whatsapp/i })
          const user = userEvent.setup()
          await user.click(ctaButton)
          
          // Verify openWhatsApp was called
          expect(openWhatsAppMock).toHaveBeenCalledTimes(1)
          
          // Get the message that was passed to openWhatsApp
          const calledMessage = openWhatsAppMock.mock.calls[0][0]
          
          // Message must include the complete product name, even if it's very long
          expect(calledMessage).toContain(product.name)
          
          // Verify the full name is present (not truncated)
          expect(calledMessage.includes(product.name)).toBe(true)
        }
      ),
      { numRuns: 30 }
    )
  })

  it('any product with minimal name length includes name in WhatsApp message', { timeout: 30000 }, async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          id: fc.uuid(),
          name: fc.string({ minLength: 5, maxLength: 10 }).filter(s => s.trim().length >= 5),
          description: productDescriptionArb,
          image: fc.webUrl(),
          rating: fc.integer({ min: 1, max: 5 }),
          highlights: fc.array(productHighlightArb, { minLength: 1, maxLength: 5 })
        }),
        async (product: ProductLanding) => {
          cleanup() // Clean up before each render
          
          // Get the mocked openWhatsApp function
          const openWhatsAppMock = vi.mocked(whatsappModule.openWhatsApp)
          openWhatsAppMock.mockClear()
          
          // Render the component
          render(<ProductCardLanding product={product} />)
          
          // Find and click the WhatsApp button
          const ctaButton = screen.getByRole('button', { name: /consultar.*whatsapp/i })
          const user = userEvent.setup()
          await user.click(ctaButton)
          
          // Verify openWhatsApp was called
          expect(openWhatsAppMock).toHaveBeenCalledTimes(1)
          
          // Get the message that was passed to openWhatsApp
          const calledMessage = openWhatsAppMock.mock.calls[0][0]
          
          // Message must include the product name, even if it's short
          expect(calledMessage).toContain(product.name)
        }
      ),
      { numRuns: 50 }
    )
  })
})
