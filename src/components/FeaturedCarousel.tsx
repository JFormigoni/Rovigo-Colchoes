import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'
import type { Produto } from '@/lib/database.types'

interface FeaturedCarouselProps {
  products: Produto[]
  onProductClick: (produto: Produto) => void
}

export default function FeaturedCarousel({ products, onProductClick }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  // Atualizar items por view baseado no tamanho da tela
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  // Auto-play do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000) // Muda a cada 5 segundos

    return () => clearInterval(interval)
  }, [currentIndex, itemsPerView, products.length])

  const maxIndex = Math.max(0, products.length - itemsPerView)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="relative">
      {/* Carrossel Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
          }}
        >
          {products.map((produto) => (
            <div
              key={produto.id}
              className="flex-shrink-0 px-4"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <ProductCard produto={produto} onClick={() => onProductClick(produto)} />
            </div>
          ))}
        </div>
      </div>

      {/* Botões de Navegação */}
      {products.length > itemsPerView && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-neutral-50 text-neutral-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-10 group"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-neutral-50 text-neutral-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-10 group"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Indicadores de Posição */}
      {products.length > itemsPerView && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
