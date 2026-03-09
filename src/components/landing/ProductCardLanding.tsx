import { Star, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { openWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp'
import type { ProductLanding } from '@/types/landing'

interface ProductCardLandingProps {
  product: ProductLanding
}

/**
 * Product card component for landing page
 * 
 * Validates Requirements:
 * - 3.2: Product name
 * - 3.3: Product description
 * - 3.4: Product image
 * - 3.5: Product rating (display with stars)
 * - 3.6: Product highlights
 * - 3.7: WhatsApp CTA button with product-specific message
 * - 13.2: Lazy loading for images
 */
export default function ProductCardLanding({ product }: ProductCardLandingProps) {
  const [imageError, setImageError] = useState(false)

  const handleWhatsAppClick = () => {
    openWhatsApp(WHATSAPP_MESSAGES.product(product.name))
  }

  const handleImageError = () => {
    setImageError(true)
  }

  // Generate array of 5 stars for rating display
  const stars = Array.from({ length: 5 }, (_, index) => index + 1)

  return (
    <div className="product-card">
      {/* Product Image with lazy loading and error fallback */}
      <div className="product-image-wrapper">
        <img
          src={imageError ? 'https://via.placeholder.com/400x300?text=Imagem+Indisponível' : product.image}
          alt={product.name}
          loading="lazy"
          onError={handleImageError}
          className="product-image"
        />
      </div>

      {/* Product Content */}
      <div className="product-content">
        {/* Product Name */}
        <h3 className="product-title">
          {product.name}
        </h3>

        {/* Product Rating */}
        <div className="flex items-center gap-1 mb-3" aria-label={`Avaliação: ${product.rating} de 5 estrelas`}>
          {stars.map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= product.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-gray-200 text-gray-200'
              }`}
              data-testid="star-icon"
              aria-hidden="true"
            />
          ))}
          <span className="ml-2 text-sm text-neutral-600">
            ({product.rating}/5)
          </span>
        </div>

        {/* Product Description */}
        <p className="product-description mb-4">
          {product.description}
        </p>

        {/* Product Highlights */}
        {product.highlights && product.highlights.length > 0 && (
          <ul className="mb-4 space-y-1">
            {product.highlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="text-sm text-neutral-700 flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {/* WhatsApp CTA Button */}
        <button
          onClick={handleWhatsAppClick}
          className="btn btn-whatsapp w-full justify-center mt-auto"
          aria-label={`Consultar ${product.name} no WhatsApp`}
        >
          <MessageCircle className="w-5 h-5" />
          Consultar no WhatsApp
        </button>
      </div>
    </div>
  )
}
