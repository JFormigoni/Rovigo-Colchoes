import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HeroSection from '../HeroSection'
import * as whatsappHelper from '@/lib/whatsapp'

// Mock the whatsapp helper
vi.mock('@/lib/whatsapp', () => ({
  openWhatsAppWithTemplate: vi.fn()
}))

describe('HeroSection', () => {
  it('displays the main headline', () => {
    render(<HeroSection />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.textContent).toMatch(/durma melhor/i)
  })

  it('displays the subtitle with key benefits', () => {
    render(<HeroSection />)
    const conforto = screen.getByText(/conforto excepcional/i)
    const tecnologia = screen.getByText(/tecnologia avançada/i)
    const garantia = screen.getByText(/garantia de qualidade/i)
    
    expect(conforto).toBeTruthy()
    expect(tecnologia).toBeTruthy()
    expect(garantia).toBeTruthy()
  })

  it('displays WhatsApp CTA button with correct text', () => {
    render(<HeroSection />)
    const button = screen.getByRole('button', { name: /falar com um vendedor no whatsapp/i })
    expect(button).toBeTruthy()
  })

  it('has full viewport height', () => {
    const { container } = render(<HeroSection />)
    const section = container.firstChild as HTMLElement
    expect(section.className).toContain('min-h-screen')
  })

  it('has background image', () => {
    const { container } = render(<HeroSection />)
    const section = container.firstChild as HTMLElement
    expect(section.className).toContain('bg-cover')
    expect(section.className).toContain('bg-center')
    expect(section.style.backgroundImage).toContain('url(')
  })

  it('has overlay for text legibility', () => {
    const { container } = render(<HeroSection />)
    const overlay = container.querySelector('[class*="bg-black"]')
    expect(overlay).toBeTruthy()
  })

  it('calls openWhatsAppWithTemplate with hero type when CTA is clicked', async () => {
    const user = userEvent.setup()
    render(<HeroSection />)
    
    const button = screen.getByRole('button', { name: /falar com um vendedor no whatsapp/i })
    await user.click(button)
    
    expect(whatsappHelper.openWhatsAppWithTemplate).toHaveBeenCalledWith('hero')
  })

  it('displays WhatsApp icon in CTA button', () => {
    render(<HeroSection />)
    const button = screen.getByRole('button', { name: /falar com um vendedor no whatsapp/i })
    const icon = button.querySelector('svg')
    expect(icon).toBeTruthy()
  })

  it('has responsive text sizing', () => {
    render(<HeroSection />)
    const heading = screen.getByRole('heading', { level: 1 })
    
    // Check for responsive classes
    expect(heading.className).toMatch(/text-4xl/)
    expect(heading.className).toMatch(/md:text-5xl/)
    expect(heading.className).toMatch(/lg:text-6xl/)
  })

  it('CTA button meets minimum touch target size', () => {
    render(<HeroSection />)
    const button = screen.getByRole('button', { name: /falar com um vendedor no whatsapp/i })
    
    // Button should have adequate padding for 44px minimum
    expect(button.className).toContain('px-8')
    expect(button.className).toContain('py-4')
  })
})
