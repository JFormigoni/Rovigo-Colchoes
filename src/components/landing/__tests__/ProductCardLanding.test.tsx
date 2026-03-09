import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductCardLanding from '../ProductCardLanding'
import type { ProductLanding } from '@/types/landing'
import * as whatsappLib from '@/lib/whatsapp'

// Mock the whatsapp module
vi.mock('@/lib/whatsapp', () => ({
  openWhatsApp: vi.fn(),
  WHATSAPP_MESSAGES: {
    product: (name: string) => `Olá! Tenho interesse no modelo ${name}. Gostaria de mais informações.`
  }
}))

describe('ProductCardLanding', () => {
  const mockProduct: ProductLanding = {
    id: '1',
    name: 'Colchão Premium Ortopédico',
    description: 'Colchão de alta qualidade com tecnologia de espuma viscoelástica que se adapta ao corpo.',
    image: 'https://example.com/product.jpg',
    rating: 5,
    highlights: [
      'Espuma viscoelástica de alta densidade',
      'Capa removível e lavável',
      'Garantia de 10 anos'
    ]
  }

  it('renders product name', () => {
    render(<ProductCardLanding product={mockProduct} />)
    expect(screen.getByText(mockProduct.name)).toBeTruthy()
  })

  it('renders product description', () => {
    render(<ProductCardLanding product={mockProduct} />)
    expect(screen.getByText(mockProduct.description)).toBeTruthy()
  })

  it('renders product image with lazy loading', () => {
    render(<ProductCardLanding product={mockProduct} />)
    const img = screen.getByAltText(mockProduct.name) as HTMLImageElement
    expect(img.src).toContain('example.com/product.jpg')
    expect(img.getAttribute('loading')).toBe('lazy')
  })

  it('renders correct number of stars based on rating', () => {
    render(<ProductCardLanding product={mockProduct} />)
    const stars = screen.getAllByTestId('star-icon')
    expect(stars).toHaveLength(5)
  })

  it('displays rating value', () => {
    render(<ProductCardLanding product={mockProduct} />)
    expect(screen.getByText(`(${mockProduct.rating}/5)`)).toBeTruthy()
  })

  it('renders product highlights', () => {
    render(<ProductCardLanding product={mockProduct} />)
    mockProduct.highlights.forEach((highlight) => {
      expect(screen.getByText(highlight)).toBeTruthy()
    })
  })

  it('renders WhatsApp CTA button', () => {
    render(<ProductCardLanding product={mockProduct} />)
    const button = screen.getByRole('button', { name: /consultar.*whatsapp/i })
    expect(button).toBeTruthy()
  })

  it('calls openWhatsApp with product name when CTA is clicked', async () => {
    const user = userEvent.setup()
    render(<ProductCardLanding product={mockProduct} />)
    
    const button = screen.getByRole('button', { name: /consultar.*whatsapp/i })
    await user.click(button)
    
    expect(whatsappLib.openWhatsApp).toHaveBeenCalledWith(
      `Olá! Tenho interesse no modelo ${mockProduct.name}. Gostaria de mais informações.`
    )
  })

  it('displays fallback image on error', async () => {
    const { container } = render(<ProductCardLanding product={mockProduct} />)
    const img = container.querySelector('img') as HTMLImageElement
    
    // Simulate image error by calling the onError handler
    const errorEvent = new Event('error')
    await img.dispatchEvent(errorEvent)
    
    // Wait for state update
    await new Promise(resolve => setTimeout(resolve, 0))
    
    // After error, the src should change to placeholder
    const updatedImg = container.querySelector('img') as HTMLImageElement
    expect(updatedImg.src).toContain('placeholder')
  })

  it('limits highlights to maximum of 3 items', () => {
    const productWithManyHighlights: ProductLanding = {
      ...mockProduct,
      highlights: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
    }
    
    render(<ProductCardLanding product={productWithManyHighlights} />)
    
    // Should only show first 3 highlights
    expect(screen.getByText('Item 1')).toBeTruthy()
    expect(screen.getByText('Item 2')).toBeTruthy()
    expect(screen.getByText('Item 3')).toBeTruthy()
    expect(screen.queryByText('Item 4')).toBeNull()
    expect(screen.queryByText('Item 5')).toBeNull()
  })

  it('handles product with no highlights', () => {
    const productNoHighlights: ProductLanding = {
      ...mockProduct,
      highlights: []
    }
    
    render(<ProductCardLanding product={productNoHighlights} />)
    
    // Component should still render without errors
    expect(screen.getByText(mockProduct.name)).toBeTruthy()
  })

  it('displays correct star colors based on rating', () => {
    const productWith3Stars: ProductLanding = {
      ...mockProduct,
      rating: 3
    }
    
    const { container } = render(<ProductCardLanding product={productWith3Stars} />)
    const stars = screen.getAllByTestId('star-icon')
    
    // Check that we have 5 stars
    expect(stars).toHaveLength(5)
    
    // Verify the stars have the correct classes by checking the actual rendered HTML
    const starElements = container.querySelectorAll('[data-testid="star-icon"]')
    
    // First 3 stars should be filled (yellow)
    expect(starElements[0].classList.contains('fill-yellow-400')).toBe(true)
    expect(starElements[1].classList.contains('fill-yellow-400')).toBe(true)
    expect(starElements[2].classList.contains('fill-yellow-400')).toBe(true)
    
    // Last 2 stars should be empty (gray)
    expect(starElements[3].classList.contains('fill-gray-200')).toBe(true)
    expect(starElements[4].classList.contains('fill-gray-200')).toBe(true)
  })

  it('has accessible button with aria-label', () => {
    render(<ProductCardLanding product={mockProduct} />)
    const button = screen.getByRole('button', { 
      name: `Consultar ${mockProduct.name} no WhatsApp` 
    })
    expect(button).toBeTruthy()
  })

  it('has accessible rating with aria-label', () => {
    render(<ProductCardLanding product={mockProduct} />)
    const rating = screen.getByLabelText(`Avaliação: ${mockProduct.rating} de 5 estrelas`)
    expect(rating).toBeTruthy()
  })
})
