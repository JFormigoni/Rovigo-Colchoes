import ProductCardLanding from './ProductCardLanding'
import type { ProductLanding } from '@/types/landing'

/**
 * Products section component for landing page
 * 
 * Validates Requirements:
 * - 3.1: Display multiple products (minimum 3)
 * - 3.2-3.7: Product information (delegated to ProductCardLanding)
 * - 9.2: Single-column layout on mobile (< 768px)
 * - 9.3: Multi-column layout on desktop (>= 768px)
 */
export default function ProductsSection() {
  // Array of mattress products with realistic data
  const products: ProductLanding[] = [
    {
      id: '1',
      name: 'Colchão Ortopédico Premium',
      description: 'Tecnologia de espuma de alta densidade com camadas de suporte ergonômico. Ideal para quem busca alívio de dores nas costas e postura correta durante o sono.',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
      rating: 5,
      highlights: [
        'Espuma de alta densidade',
        'Suporte ergonômico avançado',
        'Alívio de dores nas costas',
        'Garantia de 10 anos'
      ]
    },
    {
      id: '2',
      name: 'Colchão Molas Ensacadas Luxo',
      description: 'Sistema de molas ensacadas individualmente que se adaptam perfeitamente ao contorno do corpo. Proporciona conforto excepcional e zero transferência de movimento.',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
      rating: 5,
      highlights: [
        'Molas ensacadas individuais',
        'Zero transferência de movimento',
        'Ventilação superior',
        'Durabilidade premium'
      ]
    },
    {
      id: '3',
      name: 'Colchão Viscoelástico Confort',
      description: 'Espuma viscoelástica de última geração que se molda ao corpo com precisão. Temperatura regulada e máximo conforto para noites de sono profundo e reparador.',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      rating: 4,
      highlights: [
        'Espuma viscoelástica premium',
        'Regulação de temperatura',
        'Adaptação perfeita ao corpo',
        'Hipoalergênico'
      ]
    }
  ]

  return (
    <section className="py-16 px-4" data-testid="products-section">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Nossos Modelos
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Escolha o colchão perfeito para suas necessidades
        </p>

        {/* Responsive Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-testid="products-grid"
        >
          {products.map((product) => (
            <ProductCardLanding key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
