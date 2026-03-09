import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { render } from '@testing-library/react'
import EducationalSection from '../EducationalSection'

// Feature: landing-page-colchoes, Property 6: Educational Tip Structure
describe('Property: Educational Section Requirements', () => {
  it('displays at least 3 tips with icons and descriptions', () => {
    // This property validates Requirements 5.2, 5.3, 5.4
    fc.assert(
      fc.property(
        fc.constant(null), // No randomization needed, testing static content
        () => {
          const { container } = render(<EducationalSection />)
          
          // Requirement 5.1: Should display title "Como escolher o colchão ideal"
          const heading = container.querySelector('h2')
          expect(heading?.textContent).toContain('Como escolher o colchão ideal')
          
          // Requirement 5.2: Should display at least 3 tips
          const tipHeadings = container.querySelectorAll('h3')
          expect(tipHeadings.length).toBeGreaterThanOrEqual(3)
          
          // Requirement 5.4: Information should be in scannable format (grid layout)
          const grid = container.querySelector('.grid')
          expect(grid).toBeTruthy()
          expect(grid?.className).toContain('grid-cols-1')
          expect(grid?.className).toContain('md:grid-cols-2')
        }
      ),
      { numRuns: 10 }
    )
  })

  it('each tip card includes icon for visual communication', () => {
    // This property validates Requirement 5.3
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(<EducationalSection />)
          
          // Get all tip cards
          const tipCards = container.querySelectorAll('.flex.flex-col.items-center')
          expect(tipCards.length).toBeGreaterThanOrEqual(3)
          
          // Each tip card should have an icon container
          tipCards.forEach((card) => {
            const iconContainer = card.querySelector('.text-blue-600')
            expect(iconContainer).toBeTruthy()
            
            // Icon container should have an SVG (lucide-react icon)
            const svg = iconContainer?.querySelector('svg')
            expect(svg).toBeTruthy()
          })
        }
      ),
      { numRuns: 10 }
    )
  })

  it('section uses responsive grid layout for scannable format', () => {
    // This property validates Requirement 5.4
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(<EducationalSection />)
          
          // Should use grid layout
          const grid = container.querySelector('.grid')
          expect(grid).toBeTruthy()
          
          // Should be responsive: single column on mobile, multiple on larger screens
          expect(grid?.className).toContain('grid-cols-1')
          expect(grid?.className).toContain('md:grid-cols-2')
          expect(grid?.className).toContain('lg:grid-cols-4')
          
          // Should have adequate spacing
          expect(grid?.className).toContain('gap-8')
        }
      ),
      { numRuns: 10 }
    )
  })

  it('all tips have complete structure with title and description', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(<EducationalSection />)
          
          // Get all tip cards
          const tipCards = container.querySelectorAll('.flex.flex-col.items-center')
          
          tipCards.forEach((card) => {
            // Each card should have a title (h3)
            const title = card.querySelector('.text-xl.font-semibold')
            expect(title).toBeTruthy()
            expect(title?.textContent).toBeTruthy()
            expect(title?.textContent?.length).toBeGreaterThan(0)
            
            // Each card should have a description
            const description = card.querySelector('.text-gray-600')
            expect(description).toBeTruthy()
            expect(description?.textContent).toBeTruthy()
            expect(description?.textContent?.length).toBeGreaterThan(0)
          })
        }
      ),
      { numRuns: 10 }
    )
  })

  it('section maintains consistent visual hierarchy', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { container } = render(<EducationalSection />)
          
          // Should have main heading (h2)
          const mainHeading = container.querySelector('h2')
          expect(mainHeading).toBeTruthy()
          expect(mainHeading?.textContent).toContain('Como escolher o colchão ideal')
          
          // Should have subtitle/description
          const subtitle = container.querySelector('.text-center.text-gray-600')
          expect(subtitle).toBeTruthy()
          expect(subtitle?.textContent).toContain('Dicas essenciais')
          
          // Should have tip headings (h3) - proper hierarchy
          const tipHeadings = container.querySelectorAll('h3')
          expect(tipHeadings.length).toBeGreaterThanOrEqual(3)
          
          // All h3 headings should be after the h2 heading
          tipHeadings.forEach((h3) => {
            expect(h3).toBeTruthy()
            expect(h3.textContent).toBeTruthy()
          })
        }
      ),
      { numRuns: 10 }
    )
  })
})
