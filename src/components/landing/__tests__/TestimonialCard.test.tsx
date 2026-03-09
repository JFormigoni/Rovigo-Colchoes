import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TestimonialCard from '../TestimonialCard'
import type { Testimonial } from '../../../types/landing'

describe('TestimonialCard', () => {
  const mockTestimonial: Testimonial = {
    id: '1',
    name: 'Maria Silva',
    avatar: 'https://example.com/avatar.jpg',
    rating: 5,
    text: 'Melhor compra que já fiz! Meu sono melhorou muito.',
  }

  it('renders customer name', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />)
    const name = screen.getByText('Maria Silva')
    expect(name).toBeTruthy()
  })

  it('renders customer avatar with correct src and alt text', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />)
    const avatar = screen.getByAltText("Maria Silva's avatar") as HTMLImageElement
    expect(avatar).toBeTruthy()
    expect(avatar.src).toBe('https://example.com/avatar.jpg')
  })

  it('renders testimonial text with quotes', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />)
    const text = screen.getByText('"Melhor compra que já fiz! Meu sono melhorou muito."')
    expect(text).toBeTruthy()
  })

  it('renders 5 star icons', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />)
    const stars = screen.getAllByTestId('star-icon')
    expect(stars).toHaveLength(5)
  })

  it('displays correct number of filled stars based on rating', () => {
    const testimonialWith3Stars: Testimonial = {
      ...mockTestimonial,
      rating: 3,
    }
    render(<TestimonialCard testimonial={testimonialWith3Stars} />)
    const stars = screen.getAllByTestId('star-icon')
    
    // First 3 stars should be filled (yellow)
    expect(stars[0].classList.toString()).toContain('fill-yellow-400')
    expect(stars[1].classList.toString()).toContain('fill-yellow-400')
    expect(stars[2].classList.toString()).toContain('fill-yellow-400')
    
    // Last 2 stars should be empty (gray)
    expect(stars[3].classList.toString()).toContain('fill-gray-200')
    expect(stars[4].classList.toString()).toContain('fill-gray-200')
  })

  it('has accessible rating label', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />)
    const ratingElement = screen.getByLabelText('Rating: 5 out of 5 stars')
    expect(ratingElement).toBeTruthy()
  })

  it('applies lazy loading to avatar image', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />)
    const avatar = screen.getByAltText("Maria Silva's avatar") as HTMLImageElement
    expect(avatar.getAttribute('loading')).toBe('lazy')
  })

  it('renders with proper card styling', () => {
    const { container } = render(<TestimonialCard testimonial={mockTestimonial} />)
    const card = container.firstChild as HTMLElement
    const classes = card.classList.toString()
    expect(classes).toContain('bg-white')
    expect(classes).toContain('rounded-lg')
    expect(classes).toContain('shadow-md')
    expect(classes).toContain('p-6')
  })

  it('handles long testimonial text', () => {
    const longTestimonial: Testimonial = {
      ...mockTestimonial,
      text: 'Este é um depoimento muito longo que testa como o componente lida com textos extensos. '.repeat(5),
    }
    render(<TestimonialCard testimonial={longTestimonial} />)
    const text = screen.getByText(new RegExp(longTestimonial.text))
    expect(text).toBeTruthy()
  })

  it('handles rating of 1 star', () => {
    const testimonialWith1Star: Testimonial = {
      ...mockTestimonial,
      rating: 1,
    }
    render(<TestimonialCard testimonial={testimonialWith1Star} />)
    const stars = screen.getAllByTestId('star-icon')
    
    // Only first star should be filled
    expect(stars[0].classList.toString()).toContain('fill-yellow-400')
    expect(stars[1].classList.toString()).toContain('fill-gray-200')
    expect(stars[2].classList.toString()).toContain('fill-gray-200')
    expect(stars[3].classList.toString()).toContain('fill-gray-200')
    expect(stars[4].classList.toString()).toContain('fill-gray-200')
  })
})
