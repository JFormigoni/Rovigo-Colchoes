import { useEffect, useState } from 'react'
import { MessageCircle, Star, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Produto } from '@/lib/database.types'
import { openWhatsApp } from '@/lib/whatsapp'

/**
 * Products section component for landing page
 * 
 * Displays featured products from the database
 */
export default function ProductsSection() {
  const [products, setProducts] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  async function loadFeaturedProducts() {
    try {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('destaque', true)
        .eq('estoque', true)
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProductClick = (produto: Produto) => {
    setSelectedProduct(produto)
    setSelectedColor(produto.cores?.[0] || '')
    setSelectedSize(produto.tamanhos?.[0] || '')
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
    setSelectedColor('')
    setSelectedSize('')
  }

  const handleWhatsAppContact = () => {
    if (!selectedProduct) return

    const preco = selectedProduct.preco_promocional || selectedProduct.preco

    let message = `Olá! Tenho interesse no produto:\n\n`
    message += `📦 *${selectedProduct.nome}*\n`
    message += `💰 Preço: R$ ${preco.toFixed(2)}\n`
    
    if (selectedColor) {
      message += `🎨 Cor: ${selectedColor}\n`
    }
    
    if (selectedSize) {
      message += `📏 Tamanho: ${selectedSize}\n`
    }
    
    message += `\nGostaria de mais informações!`

    openWhatsApp(message)
    handleCloseModal()
  }

  return (
    <section className="section bg-pattern" data-testid="products-section" id="produtos">
      <div className="container-custom">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-4 text-neutral-900">
          Nossos Modelos
        </h2>
        <p className="text-center text-neutral-600 mb-12 text-lg">
          Produtos em destaque selecionados especialmente para você
        </p>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 mb-6">
              Nenhum produto em destaque no momento.
            </p>
            <button
              onClick={() => navigate('/produtos')}
              className="btn btn-secondary"
            >
              Ver Todos os Produtos
            </button>
          </div>
        ) : (
          <>
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
              data-testid="products-grid"
            >
              {products.map((produto) => (
                <div 
                  key={produto.id} 
                  className="product-card"
                  onClick={() => handleProductClick(produto)}
                >
                  {/* Product Image */}
                  <div className="product-image-wrapper">
                    <img
                      src={produto.imagem || 'https://via.placeholder.com/400x300?text=Sem+Imagem'}
                      alt={produto.nome}
                      className="product-image"
                      loading="lazy"
                    />
                    <div className="product-badge">
                      <span className="badge badge-new">
                        <Star className="w-4 h-4 fill-current" />
                        Destaque
                      </span>
                    </div>
                  </div>

                  {/* Product Content */}
                  <div className="product-content">
                    <h3 className="product-title">{produto.nome}</h3>
                    
                    <p className="product-description">
                      {produto.descricao}
                    </p>

                    <div className="flex items-baseline gap-3 mb-4">
                      {produto.preco_promocional ? (
                        <>
                          <span className="product-price">
                            R$ {produto.preco_promocional.toFixed(2)}
                          </span>
                          <span className="product-price-old">
                            R$ {produto.preco.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="product-price">
                          R$ {produto.preco.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button className="btn btn-primary w-full justify-center">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/produtos')}
                className="btn btn-secondary btn-lg"
              >
                Ver Todos os Produtos
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-2xl font-bold text-neutral-900">Detalhes do Produto</h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                aria-label="Fechar"
              >
                <span className="text-2xl text-neutral-600">×</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="rounded-2xl overflow-hidden bg-neutral-100">
                  <img
                    src={selectedProduct.imagem || 'https://via.placeholder.com/600x400?text=Sem+Imagem'}
                    alt={selectedProduct.nome}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-neutral-900 mb-2">
                      {selectedProduct.nome}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {selectedProduct.descricao}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-3">
                    {selectedProduct.preco_promocional ? (
                      <>
                        <span className="text-4xl font-bold text-blue-700">
                          R$ {selectedProduct.preco_promocional.toFixed(2)}
                        </span>
                        <span className="text-xl text-neutral-400 line-through">
                          R$ {selectedProduct.preco.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-blue-700">
                        R$ {selectedProduct.preco.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Color Selection */}
                  {selectedProduct.cores && selectedProduct.cores.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-3">
                        Cor
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {selectedProduct.cores.map((cor) => (
                          <button
                            key={cor}
                            onClick={() => setSelectedColor(cor)}
                            className={`px-6 py-3 rounded-full font-medium transition-all ${
                              selectedColor === cor
                                ? 'bg-blue-600 text-white shadow-md scale-105'
                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                            }`}
                          >
                            {cor}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size Selection */}
                  {selectedProduct.tamanhos && selectedProduct.tamanhos.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-3">
                        Tamanho
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {selectedProduct.tamanhos.map((tamanho) => (
                          <button
                            key={tamanho}
                            onClick={() => setSelectedSize(tamanho)}
                            className={`px-6 py-3 rounded-full font-medium transition-all ${
                              selectedSize === tamanho
                                ? 'bg-blue-600 text-white shadow-md scale-105'
                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                            }`}
                          >
                            {tamanho}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* WhatsApp Button */}
                  <button
                    onClick={handleWhatsAppContact}
                    className="btn btn-whatsapp btn-lg w-full justify-center"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Consultar no WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
