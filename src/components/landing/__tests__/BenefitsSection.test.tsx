import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BenefitsSection from '../BenefitsSection'

describe('BenefitsSection', () => {
  it('displays the section heading', () => {
    render(<BenefitsSection />)
    const heading = screen.getByRole('heading', { level: 2, name: /por que escolher nossos colchões/i })
    expect(heading).toBeTruthy()
  })

  it('displays the section subtitle', () => {
    render(<BenefitsSection />)
    const subtitle = screen.getByText(/qualidade e conforto que transformam suas noites/i)
    expect(subtitle).toBeTruthy()
  })

  it('displays exactly 4 benefit cards', () => {
    render(<BenefitsSection />)
    // Each benefit card has a heading (h3)
    const benefitHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(benefitHeadings.length).toBe(4)
  })

  it('displays ergonomic comfort benefit', () => {
    render(<BenefitsSection />)
    expect(screen.getByText('Conforto Ergonômico')).toBeTruthy()
    expect(screen.getByText(/tecnologia que se adapta perfeitamente ao seu corpo/i)).toBeTruthy()
  })

  it('displays body support benefit', () => {
    render(<BenefitsSection />)
    expect(screen.getByText('Suporte Corporal')).toBeTruthy()
    expect(screen.getByText(/sistema avançado de suporte/i)).toBeTruthy()
  })

  it('displays factory warranty benefit', () => {
    render(<BenefitsSection />)
    expect(screen.getByText('Garantia de Fábrica')).toBeTruthy()
    expect(screen.getByText(/garantia estendida/i)).toBeTruthy()
  })

  it('displays fast delivery benefit', () => {
    render(<BenefitsSection />)
    expect(screen.getByText('Entrega Rápida')).toBeTruthy()
    expect(screen.getByText(/receba seu colchão rapidamente/i)).toBeTruthy()
  })

  it('uses responsive grid layout classes', () => {
    const { container } = render(<BenefitsSection />)
    const grid = container.querySelector('.grid') as HTMLElement
    expect(grid.className).toContain('grid-cols-1')
    expect(grid.className).toContain('md:grid-cols-2')
    expect(grid.className).toContain('lg:grid-cols-4')
  })

  it('applies gray background to section', () => {
    const { container } = render(<BenefitsSection />)
    const section = container.querySelector('section') as HTMLElement
    expect(section.className).toContain('bg-gray-50')
  })
})
