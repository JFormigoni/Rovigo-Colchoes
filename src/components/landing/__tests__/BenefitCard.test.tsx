import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Heart } from 'lucide-react'
import BenefitCard, { Benefit } from '../BenefitCard'

describe('BenefitCard', () => {
  const mockBenefit: Benefit = {
    icon: <Heart className="w-12 h-12" data-testid="benefit-icon" />,
    title: 'Conforto Ergonômico',
    description: 'Tecnologia que se adapta ao seu corpo'
  }

  it('renders the benefit title', () => {
    render(<BenefitCard benefit={mockBenefit} />)
    const title = screen.getByText('Conforto Ergonômico')
    expect(title).toBeTruthy()
  })

  it('renders the benefit description', () => {
    render(<BenefitCard benefit={mockBenefit} />)
    const description = screen.getByText('Tecnologia que se adapta ao seu corpo')
    expect(description).toBeTruthy()
  })

  it('renders the benefit icon', () => {
    render(<BenefitCard benefit={mockBenefit} />)
    const icon = screen.getByTestId('benefit-icon')
    expect(icon).toBeTruthy()
  })

  it('applies correct styling classes', () => {
    const { container } = render(<BenefitCard benefit={mockBenefit} />)
    const card = container.firstChild as HTMLElement
    
    expect(card.className).toContain('flex')
    expect(card.className).toContain('flex-col')
    expect(card.className).toContain('items-center')
    expect(card.className).toContain('text-center')
    expect(card.className).toContain('p-6')
    expect(card.className).toContain('bg-white')
    expect(card.className).toContain('rounded-lg')
  })

  it('has responsive layout structure', () => {
    const { container } = render(<BenefitCard benefit={mockBenefit} />)
    const card = container.firstChild as HTMLElement
    
    // Should be a flex column layout
    expect(card.className).toContain('flex-col')
    expect(card.className).toContain('items-center')
  })
})
