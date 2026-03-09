import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { render, screen } from '@testing-library/react'
import BenefitCard, { Benefit } from '../BenefitCard'
import { Heart, Shield, Truck, Award, Star, Check, Zap, Clock } from 'lucide-react'

// Feature: landing-page-colchoes, Property 4: Benefit Item Structure
describe('Property 4: Benefit Item Structure', () => {
  // Helper to generate valid React icon elements
  const iconArbitrary = fc.constantFrom(
    <Heart className="w-12 h-12" data-testid="benefit-icon" />,
    <Shield className="w-12 h-12" data-testid="benefit-icon" />,
    <Truck className="w-12 h-12" data-testid="benefit-icon" />,
    <Award className="w-12 h-12" data-testid="benefit-icon" />,
    <Star className="w-12 h-12" data-testid="benefit-icon" />,
    <Check className="w-12 h-12" data-testid="benefit-icon" />,
    <Zap className="w-12 h-12" data-testid="benefit-icon" />,
    <Clock className="w-12 h-12" data-testid="benefit-icon" />
  )

  // Helper to generate valid Benefit objects
  const benefitArbitrary = fc.record({
    icon: iconArbitrary,
    title: fc.string({ minLength: 1, maxLength: 100 }),
    description: fc.string({ minLength: 1, maxLength: 500 })
  })

  it('any benefit item renders both an icon element and a text description', () => {
    fc.assert(
      fc.property(
        benefitArbitrary,
        (benefit: Benefit) => {
          const { container } = render(<BenefitCard benefit={benefit} />)
          
          // Should render the icon element
          const icon = container.querySelector('[data-testid="benefit-icon"]')
          expect(icon).toBeTruthy()
          
          // Verify the icon is actually an SVG element (lucide-react renders SVGs)
          expect(icon?.tagName.toLowerCase()).toBe('svg')
          
          // Should render the description text
          expect(container.textContent).toContain(benefit.description)
          const descriptionElement = container.querySelector('.text-gray-600')
          expect(descriptionElement?.textContent).toBe(benefit.description)
          
          // Verify both elements are present in the DOM
          expect(container.querySelector('[data-testid="benefit-icon"]')).toBeTruthy()
        }
      ),
      { numRuns: 100 }
    )
  })

  it('any benefit item renders the title alongside icon and description', () => {
    fc.assert(
      fc.property(
        benefitArbitrary,
        (benefit: Benefit) => {
          const { container } = render(<BenefitCard benefit={benefit} />)
          
          // Should render all three elements: icon, title, and description
          const icon = container.querySelector('[data-testid="benefit-icon"]')
          expect(icon).toBeTruthy()
          
          // Check title and description are in the container
          expect(container.textContent).toContain(benefit.title)
          expect(container.textContent).toContain(benefit.description)
          
          // Verify structure: title should be in h3, description in p
          const titleElement = container.querySelector('.text-xl.font-semibold')
          const descriptionElement = container.querySelector('.text-gray-600')
          
          expect(titleElement?.textContent).toBe(benefit.title)
          expect(descriptionElement?.textContent).toBe(benefit.description)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('any benefit item maintains proper structure with icon container', () => {
    fc.assert(
      fc.property(
        benefitArbitrary,
        (benefit: Benefit) => {
          const { container } = render(<BenefitCard benefit={benefit} />)
          
          // The icon should be wrapped in a container div
          const iconContainer = container.querySelector('.text-blue-600')
          expect(iconContainer).toBeTruthy()
          
          // The icon should be inside the container
          const icon = iconContainer?.querySelector('[data-testid="benefit-icon"]')
          expect(icon).toBeTruthy()
          
          // The description should be present
          expect(container.textContent).toContain(benefit.description)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('any benefit item with empty strings still renders icon', () => {
    fc.assert(
      fc.property(
        iconArbitrary,
        fc.constantFrom('', ' ', '  '),
        fc.constantFrom('', ' ', '  '),
        (icon, title, description) => {
          const benefit: Benefit = { icon, title, description }
          const { container } = render(<BenefitCard benefit={benefit} />)
          
          // Icon should always be rendered regardless of text content
          const iconElement = container.querySelector('[data-testid="benefit-icon"]')
          expect(iconElement).toBeTruthy()
          
          // Container should exist
          expect(container.firstChild).toBeTruthy()
        }
      ),
      { numRuns: 50 }
    )
  })

  it('any benefit item with special characters in description renders correctly', () => {
    fc.assert(
      fc.property(
        iconArbitrary,
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.constantFrom('á', 'é', 'í', 'ó', 'ú', 'ã', 'õ', 'ç', '!', '?', '@', '#', '$', '%'),
        (icon, baseDescription, specialChar) => {
          const description = `${baseDescription} ${specialChar}`
          const benefit: Benefit = {
            icon,
            title: 'Test Title',
            description
          }
          
          const { container } = render(<BenefitCard benefit={benefit} />)
          
          // Should render icon
          const iconElement = container.querySelector('[data-testid="benefit-icon"]')
          expect(iconElement).toBeTruthy()
          
          // Should render description with special characters
          expect(container.textContent).toContain(description)
          const descriptionElement = container.querySelector('.text-gray-600')
          expect(descriptionElement?.textContent).toBe(description)
        }
      ),
      { numRuns: 50 }
    )
  })

  it('any benefit item with very long description still renders icon and text', () => {
    fc.assert(
      fc.property(
        iconArbitrary,
        fc.string({ minLength: 200, maxLength: 500 }),
        (icon, longDescription) => {
          const benefit: Benefit = {
            icon,
            title: 'Test Title',
            description: longDescription
          }
          
          const { container } = render(<BenefitCard benefit={benefit} />)
          
          // Should render icon
          const iconElement = container.querySelector('[data-testid="benefit-icon"]')
          expect(iconElement).toBeTruthy()
          
          // Should render full description without truncation
          expect(container.textContent).toContain(longDescription)
          const descriptionElement = container.querySelector('.text-gray-600')
          expect(descriptionElement?.textContent).toBe(longDescription)
        }
      ),
      { numRuns: 30 }
    )
  })

  it('any benefit item renders icon as first visual element before text', () => {
    fc.assert(
      fc.property(
        benefitArbitrary,
        (benefit: Benefit) => {
          const { container } = render(<BenefitCard benefit={benefit} />)
          
          // Get the card container
          const card = container.firstChild as HTMLElement
          expect(card).toBeTruthy()
          
          // The first child should be the icon container (with text-blue-600 class)
          const firstChild = card.firstChild as HTMLElement
          expect(firstChild.className).toContain('text-blue-600')
          
          // The icon should be inside the first child
          const icon = firstChild.querySelector('[data-testid="benefit-icon"]')
          expect(icon).toBeTruthy()
          
          // Description should still be present in the container
          const descriptionElement = container.querySelector('.text-gray-600')
          expect(descriptionElement?.textContent).toBe(benefit.description)
        }
      ),
      { numRuns: 100 }
    )
  })
})
