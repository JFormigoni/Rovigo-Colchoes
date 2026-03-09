import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { render } from '@testing-library/react'
import TipCard, { Tip } from '../TipCard'
import { Ruler, Moon, Wind, Thermometer, Star, Check, Zap, Clock } from 'lucide-react'

// Feature: landing-page-colchoes, Property 6: Educational Tip Structure
describe('Property 6: Educational Tip Structure', () => {
  // Helper to generate valid React icon elements
  const iconArbitrary = fc.constantFrom(
    <Ruler className="w-10 h-10" data-testid="tip-icon" />,
    <Moon className="w-10 h-10" data-testid="tip-icon" />,
    <Wind className="w-10 h-10" data-testid="tip-icon" />,
    <Thermometer className="w-10 h-10" data-testid="tip-icon" />,
    <Star className="w-10 h-10" data-testid="tip-icon" />,
    <Check className="w-10 h-10" data-testid="tip-icon" />,
    <Zap className="w-10 h-10" data-testid="tip-icon" />,
    <Clock className="w-10 h-10" data-testid="tip-icon" />
  )

  // Helper to generate valid Tip objects
  const tipArbitrary = fc.record({
    icon: iconArbitrary,
    title: fc.string({ minLength: 1, maxLength: 100 }),
    description: fc.string({ minLength: 1, maxLength: 500 })
  })

  it('any tip includes an icon or illustration element', () => {
    fc.assert(
      fc.property(
        tipArbitrary,
        (tip: Tip) => {
          const { container } = render(<TipCard tip={tip} />)
          
          // Should render the icon element
          const icon = container.querySelector('[data-testid="tip-icon"]')
          expect(icon).toBeTruthy()
          
          // Verify the icon is actually an SVG element (lucide-react renders SVGs)
          expect(icon?.tagName.toLowerCase()).toBe('svg')
          
          // Should render the description text
          expect(container.textContent).toContain(tip.description)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('any tip renders icon alongside title and description', () => {
    fc.assert(
      fc.property(
        tipArbitrary,
        (tip: Tip) => {
          const { container } = render(<TipCard tip={tip} />)
          
          // Should render all three elements: icon, title, and description
          const icon = container.querySelector('[data-testid="tip-icon"]')
          expect(icon).toBeTruthy()
          
          // Check title and description are in the container
          expect(container.textContent).toContain(tip.title)
          expect(container.textContent).toContain(tip.description)
          
          // Verify structure: title should be in h3, description in p
          const titleElement = container.querySelector('.text-xl.font-semibold')
          const descriptionElement = container.querySelector('.text-gray-600')
          
          expect(titleElement?.textContent).toBe(tip.title)
          expect(descriptionElement?.textContent).toBe(tip.description)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('any tip maintains proper structure with icon container', () => {
    fc.assert(
      fc.property(
        tipArbitrary,
        (tip: Tip) => {
          const { container } = render(<TipCard tip={tip} />)
          
          // The icon should be wrapped in a container div
          const iconContainer = container.querySelector('.text-blue-600')
          expect(iconContainer).toBeTruthy()
          
          // The icon should be inside the container
          const icon = iconContainer?.querySelector('[data-testid="tip-icon"]')
          expect(icon).toBeTruthy()
          
          // The description should be present
          expect(container.textContent).toContain(tip.description)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('any tip renders icon as first visual element before text', () => {
    fc.assert(
      fc.property(
        tipArbitrary,
        (tip: Tip) => {
          const { container } = render(<TipCard tip={tip} />)
          
          // Get the card container
          const card = container.firstChild as HTMLElement
          expect(card).toBeTruthy()
          
          // The first child should be the icon container (with text-blue-600 class)
          const firstChild = card.firstChild as HTMLElement
          expect(firstChild.className).toContain('text-blue-600')
          
          // The icon should be inside the first child
          const icon = firstChild.querySelector('[data-testid="tip-icon"]')
          expect(icon).toBeTruthy()
          
          // Description should still be present in the container
          const descriptionElement = container.querySelector('.text-gray-600')
          expect(descriptionElement?.textContent).toBe(tip.description)
        }
      ),
      { numRuns: 100 }
    )
  })
})
