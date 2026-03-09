import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Ruler } from 'lucide-react'
import TipCard, { Tip } from '../TipCard'

describe('TipCard', () => {
  const mockTip: Tip = {
    icon: <Ruler className="w-10 h-10" data-testid="tip-icon" />,
    title: 'Tamanho Adequado',
    description: 'Escolha um colchão que permita movimentação livre'
  }

  it('renders the tip title', () => {
    render(<TipCard tip={mockTip} />)
    const title = screen.getByText('Tamanho Adequado')
    expect(title).toBeTruthy()
  })

  it('renders the tip description', () => {
    render(<TipCard tip={mockTip} />)
    const description = screen.getByText('Escolha um colchão que permita movimentação livre')
    expect(description).toBeTruthy()
  })

  it('renders the tip icon', () => {
    render(<TipCard tip={mockTip} />)
    const icon = screen.getByTestId('tip-icon')
    expect(icon).toBeTruthy()
  })

  it('applies correct styling classes', () => {
    const { container } = render(<TipCard tip={mockTip} />)
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
    const { container } = render(<TipCard tip={mockTip} />)
    const card = container.firstChild as HTMLElement
    
    // Should be a flex column layout
    expect(card.className).toContain('flex-col')
    expect(card.className).toContain('items-center')
  })
})
