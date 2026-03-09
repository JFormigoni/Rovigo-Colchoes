import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LandingFooter from '../LandingFooter'

describe('LandingFooter', () => {
  it('renders the footer component', () => {
    render(<LandingFooter />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeTruthy()
  })

  it('displays company information section', () => {
    render(<LandingFooter />)
    expect(screen.getByText('Sobre Nós')).toBeTruthy()
    expect(screen.getByText(/Especialistas em sono há mais de 20 anos/i)).toBeTruthy()
  })

  it('displays contact information section', () => {
    render(<LandingFooter />)
    expect(screen.getByText('Contato')).toBeTruthy()
    expect(screen.getByText(/Rua Exemplo, 123/i)).toBeTruthy()
    expect(screen.getByText('(47) 99779-4812')).toBeTruthy()
    expect(screen.getByText('contato@colchoespremium.com.br')).toBeTruthy()
  })

  it('displays social media section', () => {
    render(<LandingFooter />)
    expect(screen.getByText('Redes Sociais')).toBeTruthy()
    expect(screen.getByText(/Siga-nos nas redes sociais/i)).toBeTruthy()
  })

  it('displays all three social media links', () => {
    render(<LandingFooter />)
    const facebookLink = screen.getByLabelText('Facebook')
    const instagramLink = screen.getByLabelText('Instagram')
    const linkedinLink = screen.getByLabelText('LinkedIn')
    
    expect(facebookLink).toBeTruthy()
    expect(instagramLink).toBeTruthy()
    expect(linkedinLink).toBeTruthy()
  })

  it('social media links open in new tab', () => {
    render(<LandingFooter />)
    const facebookLink = screen.getByLabelText('Facebook')
    const instagramLink = screen.getByLabelText('Instagram')
    const linkedinLink = screen.getByLabelText('LinkedIn')
    
    expect(facebookLink.getAttribute('target')).toBe('_blank')
    expect(instagramLink.getAttribute('target')).toBe('_blank')
    expect(linkedinLink.getAttribute('target')).toBe('_blank')
  })

  it('social media links have rel="noopener noreferrer" for security', () => {
    render(<LandingFooter />)
    const facebookLink = screen.getByLabelText('Facebook')
    const instagramLink = screen.getByLabelText('Instagram')
    const linkedinLink = screen.getByLabelText('LinkedIn')
    
    expect(facebookLink.getAttribute('rel')).toBe('noopener noreferrer')
    expect(instagramLink.getAttribute('rel')).toBe('noopener noreferrer')
    expect(linkedinLink.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('displays copyright information', () => {
    render(<LandingFooter />)
    expect(screen.getByText(/© 2024 Colchões Premium. Todos os direitos reservados./i)).toBeTruthy()
  })

  it('uses grid layout with responsive classes', () => {
    const { container } = render(<LandingFooter />)
    const grid = container.querySelector('.grid')
    expect(grid?.className).toContain('grid-cols-1')
    expect(grid?.className).toContain('md:grid-cols-3')
  })

  it('displays contact icons', () => {
    const { container } = render(<LandingFooter />)
    // Check that lucide-react icons are rendered (they have specific SVG structure)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
  })

  it('has proper semantic structure with headings', () => {
    render(<LandingFooter />)
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings).toHaveLength(3)
    expect(headings[0].textContent).toBe('Sobre Nós')
    expect(headings[1].textContent).toBe('Contato')
    expect(headings[2].textContent).toBe('Redes Sociais')
  })

  it('applies dark theme styling', () => {
    const { container } = render(<LandingFooter />)
    const footer = container.querySelector('footer')
    expect(footer?.className).toContain('bg-gray-900')
    expect(footer?.className).toContain('text-gray-300')
  })

  it('has proper spacing and padding', () => {
    const { container } = render(<LandingFooter />)
    const footer = container.querySelector('footer')
    expect(footer?.className).toContain('py-12')
    expect(footer?.className).toContain('px-4')
  })
})
