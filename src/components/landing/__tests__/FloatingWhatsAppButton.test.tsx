import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import FloatingWhatsAppButton from '../FloatingWhatsAppButton'
import * as whatsappModule from '../../../lib/whatsapp'

// Mock the whatsapp module
vi.mock('../../../lib/whatsapp', () => ({
  openWhatsAppWithTemplate: vi.fn()
}))

describe('FloatingWhatsAppButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset scroll position
    window.pageYOffset = 0
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0
    })
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('renders the button with WhatsApp icon', () => {
    render(<FloatingWhatsAppButton />)
    const button = screen.getByRole('button', { name: /falar no whatsapp/i })
    expect(button).toBeTruthy()
  })

  it('has correct ARIA label for accessibility', () => {
    render(<FloatingWhatsAppButton />)
    const button = screen.getByLabelText('Falar no WhatsApp')
    expect(button).toBeTruthy()
  })

  it('is initially hidden when scroll position is 0', () => {
    render(<FloatingWhatsAppButton />)
    const button = screen.getByRole('button', { name: /falar no whatsapp/i })
    expect(button.className).toContain('opacity-0')
  })

  it('becomes visible after scrolling past 300px', () => {
    render(<FloatingWhatsAppButton />)
    const button = screen.getByRole('button', { name: /falar no whatsapp/i })

    // Simulate scroll past 300px
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 350
    })
    fireEvent.scroll(window)

    expect(button.className).toContain('opacity-100')
  })

  it('hides when scrolling back above 300px', () => {
    render(<FloatingWhatsAppButton />)
    const button = screen.getByRole('button', { name: /falar no whatsapp/i })

    // Scroll down
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 350
    })
    fireEvent.scroll(window)
    expect(button.className).toContain('opacity-100')

    // Scroll back up
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 200
    })
    fireEvent.scroll(window)
    expect(button.className).toContain('opacity-0')
  })

  it('calls openWhatsAppWithTemplate with "floating" when clicked', () => {
    render(<FloatingWhatsAppButton />)
    const button = screen.getByRole('button', { name: /falar no whatsapp/i })

    fireEvent.click(button)

    expect(whatsappModule.openWhatsAppWithTemplate).toHaveBeenCalledWith('floating')
    expect(whatsappModule.openWhatsAppWithTemplate).toHaveBeenCalledTimes(1)
  })

  it('has fixed positioning in bottom-right corner', () => {
    render(<FloatingWhatsAppButton />)
    const button = screen.getByRole('button', { name: /falar no whatsapp/i })
    
    expect(button.className).toContain('fixed')
    expect(button.className).toContain('bottom-6')
    expect(button.className).toContain('right-6')
  })

  it('has high z-index to stay above other elements', () => {
    render(<FloatingWhatsAppButton />)
    const button = screen.getByRole('button', { name: /falar no whatsapp/i })
    
    expect(button.className).toContain('z-50')
  })

  it('has minimum touch target size of 44px x 44px', () => {
    render(<FloatingWhatsAppButton />)
    const button = screen.getByRole('button', { name: /falar no whatsapp/i })
    
    // Check for minimum size via inline styles
    expect(button.style.minWidth).toBe('56px')
    expect(button.style.minHeight).toBe('56px')
  })

  it('has smooth transition animation', () => {
    render(<FloatingWhatsAppButton />)
    const button = screen.getByRole('button', { name: /falar no whatsapp/i })
    
    expect(button.className).toContain('transition-all')
    expect(button.className).toContain('duration-300')
  })

  it('has green background color', () => {
    render(<FloatingWhatsAppButton />)
    const button = screen.getByRole('button', { name: /falar no whatsapp/i })
    
    expect(button.className).toContain('bg-green-500')
    expect(button.className).toContain('hover:bg-green-600')
  })

  it('has rounded-full shape', () => {
    render(<FloatingWhatsAppButton />)
    const button = screen.getByRole('button', { name: /falar no whatsapp/i })
    
    expect(button.className).toContain('rounded-full')
  })

  it('has shadow for visual depth', () => {
    render(<FloatingWhatsAppButton />)
    const button = screen.getByRole('button', { name: /falar no whatsapp/i })
    
    expect(button.className).toContain('shadow-2xl')
  })

  it('disables pointer events when hidden', () => {
    render(<FloatingWhatsAppButton />)
    const button = screen.getByRole('button', { name: /falar no whatsapp/i })
    
    // Initially hidden
    expect(button.className).toContain('pointer-events-none')
  })

  it('cleans up scroll event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = render(<FloatingWhatsAppButton />)
    
    unmount()
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})
