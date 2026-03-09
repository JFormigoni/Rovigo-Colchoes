import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PromotionalBanner from '../PromotionalBanner'
import * as whatsappModule from '../../../lib/whatsapp'

// Mock the whatsapp module
vi.mock('../../../lib/whatsapp', () => ({
  openWhatsApp: vi.fn(),
  WHATSAPP_MESSAGES: {
    promo: 'Olá! Gostaria de saber mais sobre as promoções disponíveis.'
  }
}))

describe('PromotionalBanner', () => {
  it('renders the promotional heading', () => {
    render(<PromotionalBanner />)
    
    const heading = screen.getByRole('heading', { name: /oferta especial/i })
    expect(heading).toBeTruthy()
  })

  it('displays free shipping benefit', () => {
    render(<PromotionalBanner />)
    
    const freeShipping = screen.getByText('Frete Grátis')
    expect(freeShipping).toBeTruthy()
  })

  it('displays special discounts benefit', () => {
    render(<PromotionalBanner />)
    
    const discounts = screen.getByText('Descontos Especiais')
    expect(discounts).toBeTruthy()
  })

  it('displays trial period benefit', () => {
    render(<PromotionalBanner />)
    
    const trialPeriod = screen.getByText('100 Noites de Teste')
    expect(trialPeriod).toBeTruthy()
  })

  it('displays WhatsApp CTA button', () => {
    render(<PromotionalBanner />)
    
    const button = screen.getByRole('button', { name: /falar no whatsapp/i })
    expect(button).toBeTruthy()
  })

  it('opens WhatsApp with promo message when CTA is clicked', async () => {
    const user = userEvent.setup()
    render(<PromotionalBanner />)
    
    const button = screen.getByRole('button', { name: /falar no whatsapp/i })
    await user.click(button)
    
    expect(whatsappModule.openWhatsApp).toHaveBeenCalledWith(
      'Olá! Gostaria de saber mais sobre as promoções disponíveis.'
    )
  })

  it('has gradient background styling', () => {
    const { container } = render(<PromotionalBanner />)
    
    const section = container.firstChild as HTMLElement
    expect(section.className).toContain('bg-gradient-to-r')
    expect(section.className).toContain('from-blue-600')
    expect(section.className).toContain('to-blue-800')
  })

  it('uses contrasting white text on blue background', () => {
    const { container } = render(<PromotionalBanner />)
    
    const section = container.firstChild as HTMLElement
    expect(section.className).toContain('text-white')
  })

  it('has proper ARIA label for accessibility', () => {
    render(<PromotionalBanner />)
    
    const button = screen.getByRole('button', { name: /falar no whatsapp sobre promoções/i })
    expect(button.getAttribute('aria-label')).toBeTruthy()
  })

  it('displays icons with aria-hidden for decorative purposes', () => {
    const { container } = render(<PromotionalBanner />)
    
    const icons = container.querySelectorAll('svg[aria-hidden="true"]')
    // Should have 4 icons: Truck, Tag, Moon, MessageCircle
    expect(icons.length).toBeGreaterThanOrEqual(3)
  })

  it('has responsive layout classes', () => {
    const { container } = render(<PromotionalBanner />)
    
    const benefitsContainer = container.querySelector('.flex.flex-col')
    expect(benefitsContainer).toBeTruthy()
    expect(benefitsContainer?.className).toContain('md:flex-row')
  })

  it('button has focus ring for keyboard accessibility', () => {
    render(<PromotionalBanner />)
    
    const button = screen.getByRole('button', { name: /falar no whatsapp/i })
    expect(button.className).toContain('focus:ring-4')
    expect(button.className).toContain('focus:ring-green-300')
  })

  it('button has hover state styling', () => {
    render(<PromotionalBanner />)
    
    const button = screen.getByRole('button', { name: /falar no whatsapp/i })
    expect(button.className).toContain('hover:bg-green-600')
  })

  it('centers content with max-width container', () => {
    const { container } = render(<PromotionalBanner />)
    
    const contentContainer = container.querySelector('.max-w-4xl')
    expect(contentContainer).toBeTruthy()
    expect(contentContainer?.className).toContain('mx-auto')
  })
})
