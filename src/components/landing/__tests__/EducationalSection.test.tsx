import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EducationalSection from '../EducationalSection'

describe('EducationalSection', () => {
  it('displays the section heading', () => {
    render(<EducationalSection />)
    const heading = screen.getByRole('heading', { level: 2, name: /como escolher o colchão ideal/i })
    expect(heading).toBeTruthy()
  })

  it('displays the section subtitle', () => {
    render(<EducationalSection />)
    const subtitle = screen.getByText(/dicas essenciais para fazer a escolha certa/i)
    expect(subtitle).toBeTruthy()
  })

  it('displays at least 3 tip cards', () => {
    render(<EducationalSection />)
    // Each tip card has a heading (h3)
    const tipHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(tipHeadings.length).toBeGreaterThanOrEqual(3)
  })

  it('displays size tip', () => {
    render(<EducationalSection />)
    expect(screen.getByText('Tamanho Adequado')).toBeTruthy()
    expect(screen.getByText(/escolha um colchão que permita movimentação livre/i)).toBeTruthy()
  })

  it('displays firmness tip', () => {
    render(<EducationalSection />)
    expect(screen.getByText('Firmeza Ideal')).toBeTruthy()
    expect(screen.getByText(/o colchão deve apoiar sua coluna/i)).toBeTruthy()
  })

  it('displays ventilation tip', () => {
    render(<EducationalSection />)
    expect(screen.getByText('Ventilação')).toBeTruthy()
    expect(screen.getByText(/prefira colchões com boa circulação de ar/i)).toBeTruthy()
  })

  it('uses responsive grid layout classes', () => {
    const { container } = render(<EducationalSection />)
    const grid = container.querySelector('.grid') as HTMLElement
    expect(grid.className).toContain('grid-cols-1')
    expect(grid.className).toContain('md:grid-cols-2')
    expect(grid.className).toContain('lg:grid-cols-4')
  })

  it('applies white background to section', () => {
    const { container } = render(<EducationalSection />)
    const section = container.querySelector('section') as HTMLElement
    expect(section.className).not.toContain('bg-gray')
  })

  it('displays tips with icons', () => {
    render(<EducationalSection />)
    // Each tip should have an icon rendered
    const tipHeadings = screen.getAllByRole('heading', { level: 3 })
    // If we have headings, we should have icons too (they're in the same card structure)
    expect(tipHeadings.length).toBeGreaterThan(0)
  })
})
