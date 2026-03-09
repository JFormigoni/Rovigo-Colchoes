import { useEffect, useState } from 'react'
import { MessageCircle, Star, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Produto } from '@/lib/database.types'
import { openWhatsApp } from '@/lib/whatsapp'

export default function Products() {
  const [products, setProducts] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'available' | 'featured'>('all')
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')

  useEffect(() => {
    loadProducts()
  }, [filter])

  async function loadProducts() {
    try {
      setLoading(true)
      let query = supabase
        .from('produtos')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter === 'available') {
        query = query.eq('estoque', true)
      } else if (filter === 'featured') {
        query = query.eq('destaque', true)
      }

      const { data, error } = await query

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProductClick = (produto: Produto) => {
    if (produto.estoque) {
      setSelectedProduct(produto)
      setSelectedColor(produto.cores?.[0] || '')
      setSelectedSize(produto.tamanhos?.[0] || '')
    }
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
    <div>
      {/* Hero Section */}
      <section 
        className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop)'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl">
            Nossos Produtos
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/95 drop-shadow-lg font-light">
            Explore nossa coleção completa de colchões de alta qualidade, desenvolvidos para proporcionar o melhor sono da sua vida
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <span className="text-neutral-700 font-medium">Filtrar por:</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50 border-2 border-neutral-200 hover:border-blue-300'
              }`}
            >
              Todos os Produtos
            </button>
            <button
              onClick={() => setFilter('available')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === 'available'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50 border-2 border-neutral-200 hover:border-blue-300'
              }`}
            >
              Disponíveis
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === 'featured'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50 border-2 border-neutral-200 hover:border-blue-300'
              }`}
            >
              Em Destaque
            </button>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-4"></div>
              <p className="text-neutral-600 text-lg">Carregando produtos...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="card-flat p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">😴</span>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  Nenhum produto encontrado
                </h3>
                <p className="text-neutral-600 mb-6">
                  Não encontramos produtos com os filtros selecionados.
                </p>
                <button
                  onClick={() => setFilter('all')}
                  className="btn btn-secondary"
                >
                  Ver Todos os Produtos
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      {!produto.estoque ? (
                        <div className="product-badge">
                          <span className="badge badge-out">Esgotado</span>
                        </div>
                      ) : produto.destaque && (
                        <div className="product-badge">
                          <span className="badge badge-new">
                            <Star className="w-4 h-4 fill-current" />
                            Destaque
                          </span>
                        </div>
                      )}
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

                      <button
                        className={`btn w-full justify-center ${
                          produto.estoque 
                            ? 'btn-primary' 
                            : 'bg-neutral-300 text-neutral-500 cursor-not-allowed hover:shadow-none hover:translate-y-0'
                        }`}
                        disabled={!produto.estoque}
                      >
                        {produto.estoque ? 'Ver Detalhes' : 'Produto Esgotado'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <p className="text-neutral-600 text-lg">
                  {products.length} {products.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                </p>
              </div>
            </>
          )}
        </div>
      </section>

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
                <X className="w-6 h-6 text-neutral-600" />
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

      {/* CTA Section */}
      <section className="section promo-banner">
        <div className="promo-content">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Não encontrou o que procura?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Fale com nossos especialistas e encontre o colchão perfeito para suas necessidades
          </p>
          <button 
            onClick={() => openWhatsApp('Olá! Gostaria de mais informações sobre os colchões.')}
            className="btn btn-whatsapp btn-lg"
          >
            <MessageCircle className="w-6 h-6" />
            Falar com Especialista
          </button>
        </div>
      </section>
    </div>
  )
}
