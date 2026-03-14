import { useState } from 'react'
import { X, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Produto } from '@/lib/database.types'
import { openWhatsApp } from '@/lib/config'

interface ProductModalProps {
  produto: Produto
  onClose: () => void
}

export default function ProductModalNovo({ produto, onClose }: ProductModalProps) {
  const [selectedColor, setSelectedColor] = useState(produto.cores[0] || '')
  const [selectedSize, setSelectedSize] = useState(produto.tamanhos[0] || '')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0)

  const hasPromo = produto.promocao && produto.preco_promocional
  
  const imagens = produto.imagens && produto.imagens.length > 0 
    ? produto.imagens 
    : produto.imagem 
      ? [produto.imagem] 
      : ['https://via.placeholder.com/400x400?text=Sem+Imagem']

  const THUMBNAILS_PER_PAGE = 4

  const handleWhatsApp = () => {
    const message = `Olá, tenho interesse no colchão ${produto.nome}.
Cor: ${selectedColor}
Tamanho: ${selectedSize}.
Poderia me passar mais informações?`
    openWhatsApp(message)
  }

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % imagens.length
    setCurrentImageIndex(newIndex)
    if (newIndex < thumbnailStartIndex || newIndex >= thumbnailStartIndex + THUMBNAILS_PER_PAGE) {
      setThumbnailStartIndex(Math.floor(newIndex / THUMBNAILS_PER_PAGE) * THUMBNAILS_PER_PAGE)
    }
  }

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + imagens.length) % imagens.length
    setCurrentImageIndex(newIndex)
    if (newIndex < thumbnailStartIndex || newIndex >= thumbnailStartIndex + THUMBNAILS_PER_PAGE) {
      setThumbnailStartIndex(Math.floor(newIndex / THUMBNAILS_PER_PAGE) * THUMBNAILS_PER_PAGE)
    }
  }

  const nextThumbnails = () => {
    if (thumbnailStartIndex + THUMBNAILS_PER_PAGE < imagens.length) {
      setThumbnailStartIndex(thumbnailStartIndex + THUMBNAILS_PER_PAGE)
    }
  }

  const prevThumbnails = () => {
    if (thumbnailStartIndex > 0) {
      setThumbnailStartIndex(Math.max(0, thumbnailStartIndex - THUMBNAILS_PER_PAGE))
    }
  }

  const canGoPrev = thumbnailStartIndex > 0
  const canGoNext = thumbnailStartIndex + THUMBNAILS_PER_PAGE < imagens.length

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold">{produto.nome}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 grid lg:grid-cols-[1.2fr,1fr] gap-8">
          <div className="flex flex-col">
            <div className="relative bg-neutral-50 rounded-xl overflow-hidden aspect-square">
              <img
                src={imagens[currentImageIndex]}
                alt={`${produto.nome} - Imagem ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/600x600?text=Erro+ao+Carregar'
                }}
              />
              
              {imagens.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft size={24} className="text-neutral-800" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight size={24} className="text-neutral-800" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {imagens.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-white w-6' : 'bg-white/60 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* CARROSSEL DE 4 MINIATURAS */}
            {imagens.length > 1 && (
              <div className="mt-4 w-full">
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={prevThumbnails}
                    disabled={!canGoPrev}
                    className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                      canGoPrev ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800' : 'bg-neutral-50 text-neutral-300 cursor-not-allowed'
                    } ${imagens.length <= THUMBNAILS_PER_PAGE ? 'invisible' : ''}`}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex-1 flex gap-2 justify-center">
                    {[0, 1, 2, 3].map((position) => {
                      const imageIndex = thumbnailStartIndex + position
                      const hasImage = imageIndex < imagens.length
                      
                      if (!hasImage) {
                        return <div key={`empty-${position}`} className="w-20 h-20 rounded-lg border-2 border-dashed border-neutral-200 bg-neutral-50 flex-shrink-0" />
                      }
                      
                      return (
                        <button
                          key={imageIndex}
                          onClick={() => setCurrentImageIndex(imageIndex)}
                          className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                            imageIndex === currentImageIndex ? 'border-primary-600 ring-2 ring-primary-200' : 'border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          <img
                            src={imagens[imageIndex]}
                            alt={`Miniatura ${imageIndex + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/80?text=Erro' }}
                          />
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={nextThumbnails}
                    disabled={!canGoNext}
                    className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                      canGoNext ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800' : 'bg-neutral-50 text-neutral-300 cursor-not-allowed'
                    } ${imagens.length <= THUMBNAILS_PER_PAGE ? 'invisible' : ''}`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {imagens.length > THUMBNAILS_PER_PAGE && (
                  <div className="text-center mt-2 text-xs text-neutral-500">
                    {thumbnailStartIndex + 1}-{Math.min(thumbnailStartIndex + THUMBNAILS_PER_PAGE, imagens.length)} de {imagens.length}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-gray-600 mb-6 text-base leading-relaxed">{produto.descricao}</p>

            <div className="flex items-center gap-3 mb-6 pb-6 border-b">
              {hasPromo ? (
                <>
                  <span className="text-gray-400 line-through text-xl">R$ {produto.preco.toFixed(2)}</span>
                  <span className="text-red-600 font-bold text-3xl">R$ {produto.preco_promocional!.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-gray-900 font-bold text-3xl">R$ {produto.preco.toFixed(2)}</span>
              )}
            </div>

            <div className="space-y-4 mb-6 flex-1">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Cor:</label>
                <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="input w-full">
                  {produto.cores.map((cor: string) => (
                    <option key={cor} value={cor}>{cor}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Tamanho:</label>
                <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="input w-full">
                  {produto.tamanhos.map((tamanho: string) => (
                    <option key={tamanho} value={tamanho}>{tamanho}</option>
                  ))}
                </select>
              </div>
            </div>

            <button onClick={handleWhatsApp} className="btn btn-whatsapp w-full justify-center text-lg py-4">
              <MessageCircle size={22} />
              Falar com Vendedor no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
