import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SocialProofSection from '../SocialProofSection'

describe('SocialProofSection', () => {
  it('renders the section title', () => {
    render(<SocialProofSection />)
    
    const heading = screen.getByRole('heading', { level: 2, name: /o que nossos clientes dizem/i })
    expect(heading).toBeTruthy()
  })

  it('renders the section subtitle', () => {
    render(<SocialProofSection />)
    
    expect(screen.getByText(/milhares de pessoas já melhoraram seu sono/i)).toBeTruthy()
  })

  it('displays at least 3 testimonials (Requirement 4.1)', () => {
    render(<SocialProofSection />)
    
    // Check for testimonial cards by looking for customer names
    const testimonialCards = screen.getAllByRole('heading', { level: 3 })
    expect(testimonialCards.length).toBeGreaterThanOrEqual(3)
  })

  it('displays exactly 4 testimonials', () => {
    render(<SocialProofSection />)
    
    // Verify all 4 testimonials are rendered
    expect(screen.getByText('Maria Silva')).toBeTruthy()
    expect(screen.getByText('João Santos')).toBeTruthy()
    expect(screen.getByText('Ana Paula Costa')).toBeTruthy()
    expect(screen.getByText('Carlos Mendes')).toBeTruthy()
  })

  it('uses responsive grid layout', () => {
    render(<SocialProofSection />)
    
    const grid = screen.getByTestId('testimonials-grid')
    
    // Check for responsive grid classes
    expect(grid.className).toContain('grid')
    expect(grid.className).toContain('grid-cols-1') // Mobile: 1 column
    expect(grid.className).toContain('md:grid-cols-2') // Tablet: 2 columns
    expect(grid.className).toContain('lg:grid-cols-3') // Desktop: 3 columns
  })

  it('has proper spacing between testimonials', () => {
    render(<SocialProofSection />)
    
    const grid = screen.getByTestId('testimonials-grid')
    expect(grid.className).toContain('gap-8')
  })

  it('uses blue background color (Requirement 4.5)', () => {
    render(<SocialProofSection />)
    
    const section = screen.getByTestId('social-proof-section')
    expect(section.className).toContain('bg-blue-50')
  })

  it('has proper padding and spacing', () => {
    render(<SocialProofSection />)
    
    const section = screen.getByTestId('social-proof-section')
    expect(section.className).toContain('py-16')
    expect(section.className).toContain('px-4')
  })

  it('centers content with max-width container', () => {
    const { container } = render(<SocialProofSection />)
    
    const innerContainer = container.querySelector('.max-w-7xl')
    expect(innerContainer).toBeTruthy()
    expect(innerContainer?.className).toContain('mx-auto')
  })

  it('renders all testimonial text content', () => {
    render(<SocialProofSection />)
    
    // Check that testimonial texts are present
    expect(screen.getByText(/melhor compra que já fiz/i)).toBeTruthy()
    expect(screen.getByText(/estava cético no início/i)).toBeTruthy()
    expect(screen.getByText(/produto de altíssima qualidade/i)).toBeTruthy()
    expect(screen.getByText(/excelente custo-benefício/i)).toBeTruthy()
  })

  it('renders all customer avatars', () => {
    render(<SocialProofSection />)
    
    const avatars = screen.getAllByRole('img')
    expect(avatars.length).toBe(4)
    
    // Verify alt text includes customer names
    expect(screen.getByAltText(/maria silva's avatar/i)).toBeTruthy()
    expect(screen.getByAltText(/joão santos's avatar/i)).toBeTruthy()
    expect(screen.getByAltText(/ana paula costa's avatar/i)).toBeTruthy()
    expect(screen.getByAltText(/carlos mendes's avatar/i)).toBeTruthy()
  })

  it('displays star ratings for all testimonials', () => {
    render(<SocialProofSection />)
    
    // Each testimonial has 5 stars, so 4 testimonials = 20 stars total
    const stars = screen.getAllByTestId('star-icon')
    expect(stars.length).toBe(20) // 4 testimonials × 5 stars each
  })
})
