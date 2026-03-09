import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FinalCTASection from '../FinalCTASection'
import * as whatsappModule from '../../../lib/whatsapp'

// Mock the whatsapp module
vi.mock('../../../lib/whatsapp', () => ({
  openWhatsAppWithTemplate: vi.fn()
}))

describe('FinalCTASection', () => {
  it('renders the motivational headline', () => {
    render(<FinalCTASection />)
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.textContent).toContain('Pronto para dormir melhor?')
  })

  it('renders the descriptive text', () => {
    render(<FinalCTASection />)
    
    const description1 = screen.getByText(/fale com nossos especialistas/i)
    const description2 = screen.getByText(/encontre o colchão perfeito para você/i)
    expect(description1).toBeTruthy()
    expect(description2).toBeTruthy()
  })

  it('renders the WhatsApp CTA button with correct text', () => {
    render(<FinalCTASection />)
    
    const button = screen.getByRole('button', { name: /falar com especialista no whatsapp/i })
    expect(button).toBeTruthy()
  })

  it('displays WhatsApp icon in the button', () => {
    render(<FinalCTASection />)
    
    const button = screen.getByRole('button', { name: /falar com especialista no whatsapp/i })
    const icon = button.querySelector('svg')
    expect(icon).toBeTruthy()
  })

  it('calls openWhatsAppWithTemplate with "final" when button is clicked', async () => {
    const user = userEvent.setup()
    const openWhatsAppSpy = vi.spyOn(whatsappModule, 'openWhatsAppWithTemplate')
    
    render(<FinalCTASection />)
    
    const button = screen.getByRole('button', { name: /falar com especialista no whatsapp/i })
    await user.click(button)
    
    expect(openWhatsAppSpy).toHaveBeenCalledWith('final')
    expect(openWhatsAppSpy).toHaveBeenCalledTimes(1)
  })

  it('applies visual emphasis with proper styling', () => {
    render(<FinalCTASection />)
    
    const button = screen.getByRole('button', { name: /falar com especialista no whatsapp/i })
    
    // Check for prominent button styling
    expect(button.className).toContain('bg-green-500')
    expect(button.className).toContain('text-xl')
    expect(button.className).toContain('px-10')
    expect(button.className).toContain('py-4')
    expect(button.className).toContain('shadow-lg')
  })

  it('has proper section background styling', () => {
    const { container } = render(<FinalCTASection />)
    
    const section = container.querySelector('section')
    expect(section?.className).toContain('bg-gray-50')
    expect(section?.className).toContain('py-20')
  })

  it('centers content with max-width container', () => {
    const { container } = render(<FinalCTASection />)
    
    const contentContainer = container.querySelector('.max-w-3xl')
    expect(contentContainer).toBeTruthy()
    expect(contentContainer?.className).toContain('mx-auto')
    expect(contentContainer?.className).toContain('text-center')
  })

  it('has accessible button with aria-label', () => {
    render(<FinalCTASection />)
    
    const button = screen.getByRole('button', { name: /falar com especialista no whatsapp/i })
    expect(button.getAttribute('aria-label')).toBe('Falar com especialista no WhatsApp')
  })

  it('button has minimum touch target size for mobile', () => {
    render(<FinalCTASection />)
    
    const button = screen.getByRole('button', { name: /falar com especialista no whatsapp/i })
    
    // py-4 = 1rem top + 1rem bottom = 2rem = 32px
    // text-xl with padding should exceed 44px minimum
    expect(button.className).toContain('py-4')
    expect(button.className).toContain('px-10')
  })
})
