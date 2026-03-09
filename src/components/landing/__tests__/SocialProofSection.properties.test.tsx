import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import fc from 'fast-check'
import TestimonialCard from '../TestimonialCard'
import type { Testimonial } from '@/types/landing'

/**
 * Property-Based Tests for SocialProofSection
 * 
 * These tests validate universal properties that should hold true
 * for any valid testimonial data.
 */

// **Validates: Requirements 4.2, 4.3, 4.4**
describe('Property: Testimonial Completeness', () => {
  it('any testimonial displays all required fields (name, rating, avatar, text)', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          name: fc.string({ minLength: 1, maxLength: 100 }),
          avatar: fc.webUrl(),
          rating: fc.integer({ min: 1, max: 5 }),
          text: fc.string({ minLength: 10, maxLength: 500 })
        }),
        (testimonial: Testimonial) => {
          const { container } = render(<TestimonialCard testimonial={testimonial} />)
          
          // Should display customer name (Requirement 4.2)
          expect(container.textContent).toContain(testimonial.name)
          
          // Should display avatar with proper alt text
          const avatar = container.querySelector('img') as HTMLImageElement
          expect(avatar).toBeTruthy()
          expect(avatar.src).toBeTruthy()
          expect(avatar.alt).toBe(`${testimonial.name}'s avatar`)
          
          // Should display rating with correct number of stars (Requirement 4.3)
          const stars = container.querySelectorAll('[data-testid="star-icon"]')
          expect(stars).toHaveLength(5)
          
          // Count filled stars (should match rating)
          const filledStars = Array.from(stars).filter(star => 
            star.classList.toString().includes('fill-yellow-400')
          )
          expect(filledStars).toHaveLength(testimonial.rating)
          
          // Should display testimonial text (Requirement 4.4)
          expect(container.textContent).toContain(testimonial.text)
        }
      ),
      { numRuns: 100 }
    )
  })
})

// **Validates: Requirement 4.5**
describe('Property: Testimonial Layout and Spacing', () => {
  it('any testimonial card maintains proper structure and spacing', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          name: fc.string({ minLength: 1, maxLength: 100 }),
          avatar: fc.webUrl(),
          rating: fc.integer({ min: 1, max: 5 }),
          text: fc.string({ minLength: 10, maxLength: 500 })
        }),
        (testimonial: Testimonial) => {
          const { container } = render(<TestimonialCard testimonial={testimonial} />)
          
          // Should have card styling with proper spacing
          const card = container.firstChild as HTMLElement
          expect(card.className).toContain('bg-white')
          expect(card.className).toContain('rounded-lg')
          expect(card.className).toContain('shadow-md')
          expect(card.className).toContain('p-6')
          
          // Should use flexbox for vertical layout
          expect(card.className).toContain('flex')
          expect(card.className).toContain('flex-col')
          expect(card.className).toContain('h-full')
        }
      ),
      { numRuns: 100 }
    )
  })
})

// **Validates: Requirements 14.1, 14.2**
describe('Property: Testimonial Accessibility', () => {
  it('any testimonial card meets accessibility requirements', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          name: fc.string({ minLength: 1, maxLength: 100 }),
          avatar: fc.webUrl(),
          rating: fc.integer({ min: 1, max: 5 }),
          text: fc.string({ minLength: 10, maxLength: 500 })
        }),
        (testimonial: Testimonial) => {
          const { container } = render(<TestimonialCard testimonial={testimonial} />)
          
          // Avatar should have descriptive alt text (Requirement 14.1)
          const avatar = container.querySelector('img') as HTMLImageElement
          expect(avatar).toBeTruthy()
          expect(avatar.alt).toBeTruthy()
          expect(avatar.alt).toContain(testimonial.name)
          
          // Avatar should have lazy loading
          expect(avatar.getAttribute('loading')).toBe('lazy')
          
          // Rating should have aria-label for screen readers
          const ratingLabel = `Rating: ${testimonial.rating} out of 5 stars`
          const ratingContainer = container.querySelector(`[aria-label="${ratingLabel}"]`)
          expect(ratingContainer).toBeTruthy()
        }
      ),
      { numRuns: 100 }
    )
  })
})

// **Validates: Requirement 4.3**
describe('Property: Star Rating Accuracy', () => {
  it('any testimonial displays correct number of filled stars matching rating', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 5 }),
        (rating: number) => {
          const testimonial: Testimonial = {
            id: '1',
            name: 'Test User',
            avatar: 'https://example.com/avatar.jpg',
            rating,
            text: 'Test testimonial text'
          }
          
          const { container } = render(<TestimonialCard testimonial={testimonial} />)
          
          const stars = container.querySelectorAll('[data-testid="star-icon"]')
          
          // Should always render exactly 5 stars
          expect(stars).toHaveLength(5)
          
          // Count filled (yellow) stars
          const filledStars = Array.from(stars).filter(star => 
            star.classList.toString().includes('fill-yellow-400') &&
            star.classList.toString().includes('text-yellow-400')
          )
          
          // Count empty (gray) stars
          const emptyStars = Array.from(stars).filter(star => 
            star.classList.toString().includes('fill-gray-200') &&
            star.classList.toString().includes('text-gray-200')
          )
          
          // Filled stars should match rating
          expect(filledStars).toHaveLength(rating)
          
          // Empty stars should be 5 - rating
          expect(emptyStars).toHaveLength(5 - rating)
          
          // Total should always be 5
          expect(filledStars.length + emptyStars.length).toBe(5)
        }
      ),
      { numRuns: 100 }
    )
  })
})

// **Validates: Requirement 9.4**
describe('Property: Image Proportional Scaling', () => {
  it('any testimonial avatar maintains proportional scaling', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          name: fc.string({ minLength: 1, maxLength: 100 }),
          avatar: fc.webUrl(),
          rating: fc.integer({ min: 1, max: 5 }),
          text: fc.string({ minLength: 10, maxLength: 500 })
        }),
        (testimonial: Testimonial) => {
          const { container } = render(<TestimonialCard testimonial={testimonial} />)
          
          const avatar = container.querySelector('img') as HTMLImageElement
          
          // Should have fixed dimensions for circular avatar
          expect(avatar.className).toContain('w-16')
          expect(avatar.className).toContain('h-16')
          
          // Should maintain aspect ratio with object-cover
          expect(avatar.className).toContain('object-cover')
          
          // Should be circular
          expect(avatar.className).toContain('rounded-full')
        }
      ),
      { numRuns: 100 }
    )
  })
})
