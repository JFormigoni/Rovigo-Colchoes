import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TestimonialCard from './TestimonialCard'
import type { Testimonial } from '@/types/landing'

/**
 * Social Proof section component for landing page
 * 
 * Displays customer testimonials in a carousel format.
 * 
 * Validates Requirements:
 * - 4.1: Display multiple testimonials (minimum 3)
 * - 4.2-4.4: Testimonial information (delegated to TestimonialCard)
 * - 4.5: Social proof section with visually appealing layout
 * - 9.2: Single-column layout on mobile (< 768px)
 * - 9.3: Multi-column layout on desktop (>= 768px)
 */
export default function SocialProofSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(1)

  // Array of customer testimonials with realistic data
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Maria Silva',
      avatar: 'https://ui-avatars.com/api/?name=Maria+Silva&background=3b82f6&color=fff&size=200',
      rating: 5,
      text: 'Melhor compra que já fiz! Minha qualidade de sono melhorou drasticamente. Acordo sem dores nas costas e me sinto muito mais descansada. O colchão é extremamente confortável e o atendimento foi impecável.'
    },
    {
      id: '2',
      name: 'João Santos',
      avatar: 'https://ui-avatars.com/api/?name=Joao+Santos&background=3b82f6&color=fff&size=200',
      rating: 5,
      text: 'Estava cético no início, mas após usar o colchão por alguns meses, posso afirmar que superou todas as minhas expectativas. O suporte é perfeito e a tecnologia de molas ensacadas realmente faz diferença.'
    },
    {
      id: '3',
      name: 'Ana Paula Costa',
      avatar: 'https://ui-avatars.com/api/?name=Ana+Paula&background=3b82f6&color=fff&size=200',
      rating: 5,
      text: 'Produto de altíssima qualidade! Meu marido e eu estamos dormindo muito melhor. O colchão não transfere movimento, então não acordamos quando um se mexe. Entrega rápida e instalação gratuita. Recomendo!'
    },
    {
      id: '4',
      name: 'Carlos Mendes',
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Mendes&background=3b82f6&color=fff&size=200',
      rating: 4,
      text: 'Excelente custo-benefício. O colchão é muito confortável e a garantia de 10 anos me deu muita segurança na compra. Já indiquei para vários amigos e todos ficaram satisfeitos.'
    }
  ]

  // Detectar tamanho da tela e ajustar items por view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3)
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2)
      } else {
        setItemsPerView(1)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-play do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, itemsPerView])

  const maxIndex = Math.max(0, testimonials.length - itemsPerView)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  return (
    <section className="section card-gradient" data-testid="social-proof-section">
      <div className="container-custom">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-4 text-neutral-900">
          O que nossos clientes dizem
        </h2>
        <p className="text-center text-neutral-600 mb-12 text-lg">
          Milhares de pessoas já melhoraram seu sono
        </p>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto px-4">
          {/* Carousel Track */}
          <div className="overflow-hidden py-4">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
                gap: '1.5rem'
              }}
              data-testid="testimonials-grid"
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="flex-shrink-0 w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] px-2"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Only on desktop */}
          <button
            onClick={handlePrev}
            className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="w-6 h-6 text-neutral-900" />
          </button>

          <button
            onClick={handleNext}
            className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="w-6 h-6 text-neutral-900" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
