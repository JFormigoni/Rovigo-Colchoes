import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProductsSection from '../ProductsSection'

describe('ProductsSection', () => {
  it('renders the section title', () => {
    render(<ProductsSection />)
    
    const heading = screen.getByRole('heading', { level: 2, name: /nossos modelos/i })
    expect(heading).toBeTruthy()
  })

  it('renders the section subtitle', () => {
    render(<ProductsSection />)
    
    expect(screen.getByText(/escolha o colchão perfeito para suas necessidades/i)).toBeTruthy()
  })

  it('displays at least 3 products (Requirement 3.1)', () => {
    render(<ProductsSection />)
    
    // Check for product names
    expect(screen.getByText(/colchão ortopédico premium/i)).toBeTruthy()
    expect(screen.getByText(/colchão molas ensacadas luxo/i)).toBeTruthy()
    expect(screen.getByText(/colchão viscoelástico confort/i)).toBeTruthy()
  })

  it('renders ProductCardLanding for each product', () => {
    render(<ProductsSection />)
    
    // Each product card should have a WhatsApp button
    const whatsappButtons = screen.getAllByRole('button', { name: /consultar.*whatsapp/i })
    expect(whatsappButtons.length).toBeGreaterThanOrEqual(3)
  })

  it('implements responsive grid layout', () => {
    const { container } = render(<ProductsSection />)
    
    const grid = container.querySelector('[data-testid="products-grid"]')
    expect(grid?.classList.contains('grid')).toBe(true)
    expect(grid?.classList.contains('grid-cols-1')).toBe(true) // 1 col mobile
    expect(grid?.classList.contains('md:grid-cols-2')).toBe(true) // 2 cols tablet
    expect(grid?.classList.contains('lg:grid-cols-3')).toBe(true) // 3 cols desktop
  })

  it('has proper spacing between products', () => {
    const { container } = render(<ProductsSection />)
    
    const grid = container.querySelector('[data-testid="products-grid"]')
    expect(grid?.classList.contains('gap-8')).toBe(true)
  })

  it('uses semantic section element', () => {
    const { container } = render(<ProductsSection />)
    
    const section = container.querySelector('section')
    expect(section).toBeTruthy()
    expect(section?.getAttribute('data-testid')).toBe('products-section')
  })

  it('displays product images with proper attributes', () => {
    render(<ProductsSection />)
    
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThanOrEqual(3)
    
    // Each image should have alt text
    images.forEach((img) => {
      expect(img.getAttribute('alt')).toBeTruthy()
      expect(img.getAttribute('alt')).not.toBe('')
    })
  })

  it('displays product ratings', () => {
    render(<ProductsSection />)
    
    // Check for rating displays (star icons)
    const ratingTexts = screen.getAllByText(/\(.*\/5\)/)
    expect(ratingTexts.length).toBeGreaterThanOrEqual(3)
  })
})
