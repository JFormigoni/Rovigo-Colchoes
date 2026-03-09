import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import fc from 'fast-check'
import TestimonialCard from '../TestimonialCard'
import type { Testimonial } from '../../../types/landing'

/**
 * Property-Based Tests for TestimonialCard
 * 
 * **Validates: Requirements 4.2, 4.3, 4.4**
 */
describe('TestimonialCard - Property-Based Tests', () => {
  // Feature: landing-page-colchoes, Property 5: Testimonial Completeness
  it('any testimonial displays all required fields (name, rating, avatar, text)', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          name: fc.stringMatching(/^[A-Za-z][A-Za-z\s]{1,98}[A-Za-z]$/),
          avatar: fc.webUrl(),
          rating: fc.integer({ min: 1, max: 5 }),
          text: fc.stringMatching(/^[A-Za-z0-9][A-Za-z0-9\s\.,!?]{13,498}[A-Za-z0-9\.]$/),
        }),
        (testimonial: Testimonial) => {
          const { container } = render(<TestimonialCard testimonial={testimonial} />)

          // Should display customer name (Requirement 4.2)
          expect(container.textContent).toContain(testimonial.name)

          // Should display avatar with correct src and alt text
          const avatar = container.querySelector('img') as HTMLImageElement
          expect(avatar).toBeTruthy()
          // Avatar should have a src attribute set
          expect(avatar.src).toBeTruthy()
          expect(avatar.src.length).toBeGreaterThan(0)
          expect(avatar.alt).toBe(`${testimonial.name}'s avatar`)

          // Should display rating with 5 stars (Requirement 4.3)
          const stars = container.querySelectorAll('[data-testid="star-icon"]')
          expect(stars).toHaveLength(5)

          // Should display testimonial text (Requirement 4.4)
          expect(container.textContent).toContain(testimonial.text)
        }
      ),
      { numRuns: 100 }
    )
  })

  // Feature: landing-page-colchoes, Property 5: Star Rating Accuracy
  it('any testimonial displays correct number of filled stars based on rating', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          name: fc.stringMatching(/^[A-Za-z][A-Za-z\s]{1,98}[A-Za-z]$/),
          avatar: fc.webUrl(),
          rating: fc.integer({ min: 1, max: 5 }),
          text: fc.stringMatching(/^[A-Za-z0-9][A-Za-z0-9\s\.,!?]{13,498}[A-Za-z0-9\.]$/),
        }),
        (testimonial: Testimonial) => {
          const { container } = render(<TestimonialCard testimonial={testimonial} />)

          const stars = container.querySelectorAll('[data-testid="star-icon"]')

          // Count filled stars (yellow)
          const filledStars = Array.from(stars).filter((star) =>
            star.classList.toString().includes('fill-yellow-400')
          )

          // Count empty stars (gray)
          const emptyStars = Array.from(stars).filter((star) =>
            star.classList.toString().includes('fill-gray-200')
          )

          // Number of filled stars should match rating
          expect(filledStars).toHaveLength(testimonial.rating)

          // Number of empty stars should be 5 - rating
          expect(emptyStars).toHaveLength(5 - testimonial.rating)

          // Total should always be 5
          expect(filledStars.length + emptyStars.length).toBe(5)
        }
      ),
      { numRuns: 100 }
    )
  })

  // Feature: landing-page-colchoes, Property 8: Image Accessibility
  it('any testimonial avatar has proper accessibility attributes', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          name: fc.stringMatching(/^[A-Za-z][A-Za-z\s]{1,98}[A-Za-z]$/),
          avatar: fc.webUrl(),
          rating: fc.integer({ min: 1, max: 5 }),
          text: fc.stringMatching(/^[A-Za-z0-9][A-Za-z0-9\s\.,!?]{13,498}[A-Za-z0-9\.]$/),
        }),
        (testimonial: Testimonial) => {
          const { container } = render(<TestimonialCard testimonial={testimonial} />)

          const avatar = container.querySelector('img') as HTMLImageElement
          expect(avatar).toBeTruthy()

          // Should have alt attribute for accessibility
          expect(avatar.alt).toBe(`${testimonial.name}'s avatar`)

          // Should have lazy loading
          expect(avatar.getAttribute('loading')).toBe('lazy')

          // Should have proper src
          // Avatar should have a src attribute set
          expect(avatar.src).toBeTruthy()
          expect(avatar.src.length).toBeGreaterThan(0)
        }
      ),
      { numRuns: 100 }
    )
  })

  // Feature: landing-page-colchoes, Property 13: ARIA Label for Rating
  it('any testimonial has accessible rating label', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          name: fc.stringMatching(/^[A-Za-z][A-Za-z\s]{1,98}[A-Za-z]$/),
          avatar: fc.webUrl(),
          rating: fc.integer({ min: 1, max: 5 }),
          text: fc.stringMatching(/^[A-Za-z0-9][A-Za-z0-9\s\.,!?]{13,498}[A-Za-z0-9\.]$/),
        }),
        (testimonial: Testimonial) => {
          const { container } = render(<TestimonialCard testimonial={testimonial} />)

          // Should have aria-label for screen readers
          const ratingLabel = `Rating: ${testimonial.rating} out of 5 stars`
          const ratingElement = container.querySelector(`[aria-label="${ratingLabel}"]`)
          expect(ratingElement).toBeTruthy()
        }
      ),
      { numRuns: 100 }
    )
  })
})
