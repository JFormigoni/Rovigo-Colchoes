import TestimonialCard from './TestimonialCard'
import type { Testimonial } from '@/types/landing'

/**
 * Social Proof section component for landing page
 * 
 * Displays customer testimonials to build trust and credibility.
 * 
 * Validates Requirements:
 * - 4.1: Display multiple testimonials (minimum 3)
 * - 4.2-4.4: Testimonial information (delegated to TestimonialCard)
 * - 4.5: Social proof section with visually appealing layout
 * - 9.2: Single-column layout on mobile (< 768px)
 * - 9.3: Multi-column layout on desktop (>= 768px)
 */
export default function SocialProofSection() {
  // Array of customer testimonials with realistic data
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Maria Silva',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      rating: 5,
      text: 'Melhor compra que já fiz! Minha qualidade de sono melhorou drasticamente. Acordo sem dores nas costas e me sinto muito mais descansada. O colchão é extremamente confortável e o atendimento foi impecável.'
    },
    {
      id: '2',
      name: 'João Santos',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      rating: 5,
      text: 'Estava cético no início, mas após as 100 noites de teste, posso afirmar que este colchão superou todas as minhas expectativas. O suporte é perfeito e a tecnologia de molas ensacadas realmente faz diferença.'
    },
    {
      id: '3',
      name: 'Ana Paula Costa',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      rating: 5,
      text: 'Produto de altíssima qualidade! Meu marido e eu estamos dormindo muito melhor. O colchão não transfere movimento, então não acordamos quando um se mexe. Entrega rápida e instalação gratuita. Recomendo!'
    },
    {
      id: '4',
      name: 'Carlos Mendes',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      rating: 4,
      text: 'Excelente custo-benefício. O colchão é muito confortável e a garantia de 10 anos me deu muita segurança na compra. Já indiquei para vários amigos e todos ficaram satisfeitos.'
    }
  ]

  return (
    <section className="py-16 px-4 bg-blue-50" data-testid="social-proof-section">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          O que nossos clientes dizem
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Milhares de pessoas já melhoraram seu sono
        </p>

        {/* Responsive Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-testid="testimonials-grid"
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
