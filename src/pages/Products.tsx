import { useEffect, useState } from 'react'
import { MessageCircle, Star, Tag, X, SlidersHorizontal, DollarSign } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Produto, TamanhoPrecificacao } from '@/lib/database.types'
import { openWhatsApp } from '@/lib/whatsapp'

export default function Products() {
  const [products, setProducts] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'available' | 'featured' | 'promo'>('all')
  const [sizeFilter, setSizeFilter] = useState<string>('all')
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(0)
  const [minPriceInputValue, setMinPriceInputValue] = useState<string>('')
  const [maxPriceInputValue, setMaxPriceInputValue] = useState<string>('')
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')

  useEffect(() => {
    loadProducts()
  }, [filter, sizeFilter, minPrice, maxPrice])

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
        query = query.eq('destaque', true).eq('estoque', true)
      } else if (filter === 'promo') {
        query = query.not('preco_promocional', 'is', null).eq('estoque', true)
      }

      const { data, error } = await query

      if (error) throw error
      
      let filteredProducts = (data || []) as Produto[]
      
      // Filtrar por tamanho se selecionado
      if (sizeFilter !== 'all') {
        filteredProducts = filteredProducts.filter(produto => 
          produto.tamanhos && produto.tamanhos.includes(sizeFilter)
        )
      }
      
      // Filtrar por faixa de preço
      if (minPrice > 0 || maxPrice > 0) {
        filteredProducts = filteredProducts.filter(produto => {
          const precosPorTamanho = getPrecosPorTamanho(produto)
          
          // Se houver preços por tamanho e um tamanho específico selecionado
          if (precosPorTamanho && sizeFilter !== 'all') {
            const precoTamanho = precosPorTamanho.find(p => p.tamanho === sizeFilter)
            if (precoTamanho) {
              const precoFinal = precoTamanho.preco_promocional || precoTamanho.preco
              const dentroDoMinimo = minPrice > 0 ? precoFinal >= minPrice : true
              const dentroDoMaximo = maxPrice > 0 ? precoFinal <= maxPrice : true
              return dentroDoMinimo && dentroDoMaximo
            }
          }
          
          // Caso contrário, usar o preço base do produto
          const precoFinal = produto.preco_promocional || produto.preco
          const dentroDoMinimo = minPrice > 0 ? precoFinal >= minPrice : true
          const dentroDoMaximo = maxPrice > 0 ? precoFinal <= maxPrice : true
          return dentroDoMinimo && dentroDoMaximo
        })
      }
      
      setProducts(filteredProducts)
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

  const handlePriceFilter = () => {
    const minPriceValue = parseFloat(minPriceInputValue)
    const maxPriceValue = parseFloat(maxPriceInputValue)
    
    if (!isNaN(minPriceValue) && minPriceValue > 0) {
      setMinPrice(minPriceValue)
    } else if (minPriceInputValue === '' || minPriceInputValue === '0') {
      setMinPrice(0)
    }
    
    if (!isNaN(maxPriceValue) && maxPriceValue > 0) {
      setMaxPrice(maxPriceValue)
    } else if (maxPriceInputValue === '' || maxPriceInputValue === '0') {
      setMaxPrice(0)
    }
  }

  const clearPriceFilter = () => {
    setMinPrice(0)
    setMaxPrice(0)
    setMinPriceInputValue('')
    setMaxPriceInputValue('')
  }

  const clearAllFilters = () => {
    setFilter('all')
    setSizeFilter('all')
    setMinPrice(0)
    setMaxPrice(0)
    setMinPriceInputValue('')
    setMaxPriceInputValue('')
  }

  // Função auxiliar para obter preços por tamanho parseados
  const getPrecosPorTamanho = (produto: Produto): TamanhoPrecificacao[] | null => {
    if (!produto.precos_por_tamanho) return null
    
    try {
      const precos = typeof produto.precos_por_tamanho === 'string'
        ? JSON.parse(produto.precos_por_tamanho)
        : produto.precos_por_tamanho
      
      return Array.isArray(precos) ? precos : null
    } catch (error) {
      console.error('Erro ao parsear precos_por_tamanho:', error)
      return null
    }
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
    setSelectedColor('')
    setSelectedSize('')
  }

  const handleWhatsAppContact = () => {
    if (!selectedProduct) return

    // Buscar preço do tamanho selecionado se houver preços por tamanho
    let preco = selectedProduct.preco
    let precoPromocional = selectedProduct.preco_promocional

    const precosPorTamanho = getPrecosPorTamanho(selectedProduct)
    if (precosPorTamanho && selectedSize) {
      const precoTamanho = precosPorTamanho.find(p => p.tamanho === selectedSize)
      if (precoTamanho) {
        preco = precoTamanho.preco
        precoPromocional = precoTamanho.preco_promocional || null
      }
    }

    const precoFinal = precoPromocional || preco

    let message = `Olá! Tenho interesse no produto:\n\n`
    message += `📦 *${selectedProduct.nome}*\n`
    message += `💰 Preço: R$ ${precoFinal.toFixed(2)}\n`
    
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
          {/* Botão de Filtros */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-primary btn-lg flex items-center gap-3 shadow-lg hover:shadow-xl transition-all"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </button>

            {/* Indicadores de Filtros Ativos */}
            {(filter !== 'all' || sizeFilter !== 'all' || minPrice > 0 || maxPrice > 0) && (
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="text-sm text-neutral-600 font-medium">Filtros ativos:</span>
                
                {filter !== 'all' && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {filter === 'available' && 'Disponíveis'}
                    {filter === 'featured' && 'Em Destaque'}
                    {filter === 'promo' && 'Promoções'}
                    <button
                      onClick={() => setFilter('all')}
                      className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                
                {sizeFilter !== 'all' && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    Tamanho: {sizeFilter}
                    <button
                      onClick={() => setSizeFilter('all')}
                      className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                
                {(minPrice > 0 || maxPrice > 0) && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {minPrice > 0 && maxPrice > 0 
                      ? `R$ ${minPrice.toFixed(2)} - R$ ${maxPrice.toFixed(2)}`
                      : minPrice > 0 
                        ? `A partir de R$ ${minPrice.toFixed(2)}`
                        : `Até R$ ${maxPrice.toFixed(2)}`
                    }
                    <button
                      onClick={clearPriceFilter}
                      className="hover:bg-green-200 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 hover:text-red-700 font-medium underline"
                >
                  Limpar todos
                </button>
              </div>
            )}
          </div>

          {/* Painel de Filtros */}
          {showFilters && (
            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-3xl p-8 mb-12 shadow-lg border border-neutral-200 animate-in fade-in slide-in-from-top-4 duration-300">
              {/* Filtros de Status */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-blue-600" />
                  Tipo de Produto
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      filter === 'all'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                        : 'bg-white text-neutral-700 hover:bg-neutral-50 border-2 border-neutral-200 hover:border-blue-300'
                    }`}
                  >
                    Todos os Produtos
                  </button>
                  <button
                    onClick={() => setFilter('available')}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      filter === 'available'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                        : 'bg-white text-neutral-700 hover:bg-neutral-50 border-2 border-neutral-200 hover:border-blue-300'
                    }`}
                  >
                    Disponíveis
                  </button>
                  <button
                    onClick={() => setFilter('promo')}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      filter === 'promo'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                        : 'bg-white text-neutral-700 hover:bg-neutral-50 border-2 border-neutral-200 hover:border-blue-300'
                    }`}
                  >
                    Promoções
                  </button>
                  <button
                    onClick={() => setFilter('featured')}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      filter === 'featured'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                        : 'bg-white text-neutral-700 hover:bg-neutral-50 border-2 border-neutral-200 hover:border-blue-300'
                    }`}
                  >
                    Em Destaque
                  </button>
                </div>
              </div>

              {/* Filtros de Tamanho */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-purple-600" />
                  Tamanho
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSizeFilter('all')}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      sizeFilter === 'all'
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg scale-105'
                        : 'bg-white text-neutral-700 hover:bg-neutral-50 border-2 border-neutral-200 hover:border-purple-300'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setSizeFilter('Solteiro')}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      sizeFilter === 'Solteiro'
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg scale-105'
                        : 'bg-white text-neutral-700 hover:bg-neutral-50 border-2 border-neutral-200 hover:border-purple-300'
                    }`}
                  >
                    Solteiro
                  </button>
                  <button
                    onClick={() => setSizeFilter('Casal')}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      sizeFilter === 'Casal'
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg scale-105'
                        : 'bg-white text-neutral-700 hover:bg-neutral-50 border-2 border-neutral-200 hover:border-purple-300'
                    }`}
                  >
                    Casal
                  </button>
                  <button
                    onClick={() => setSizeFilter('Queen')}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      sizeFilter === 'Queen'
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg scale-105'
                        : 'bg-white text-neutral-700 hover:bg-neutral-50 border-2 border-neutral-200 hover:border-purple-300'
                    }`}
                  >
                    Queen
                  </button>
                  <button
                    onClick={() => setSizeFilter('King')}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      sizeFilter === 'King'
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg scale-105'
                        : 'bg-white text-neutral-700 hover:bg-neutral-50 border-2 border-neutral-200 hover:border-purple-300'
                    }`}
                  >
                    King
                  </button>
                </div>
              </div>

              {/* Filtro de Preço */}
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Faixa de Preço
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Preço Mínimo */}
                    <div>
                      <label htmlFor="minPrice" className="block text-sm font-medium text-neutral-700 mb-2">
                        Preço Mínimo
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">
                          R$
                        </span>
                        <input
                          id="minPrice"
                          type="number"
                          min="0"
                          step="0.01"
                          value={minPriceInputValue}
                          onChange={(e) => {
                            setMinPriceInputValue(e.target.value)
                            // Se o campo for apagado, resetar o filtro automaticamente
                            if (e.target.value === '' || e.target.value === '0') {
                              setMinPrice(0)
                            }
                          }}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handlePriceFilter()
                            }
                          }}
                          placeholder="Ex: 500.00"
                          className="w-full pl-12 pr-4 py-3 border-2 border-neutral-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-lg"
                        />
                      </div>
                    </div>

                    {/* Preço Máximo */}
                    <div>
                      <label htmlFor="maxPrice" className="block text-sm font-medium text-neutral-700 mb-2">
                        Preço Máximo
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">
                          R$
                        </span>
                        <input
                          id="maxPrice"
                          type="number"
                          min="0"
                          step="0.01"
                          value={maxPriceInputValue}
                          onChange={(e) => {
                            setMaxPriceInputValue(e.target.value)
                            // Se o campo for apagado, resetar o filtro automaticamente
                            if (e.target.value === '' || e.target.value === '0') {
                              setMaxPrice(0)
                            }
                          }}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handlePriceFilter()
                            }
                          }}
                          placeholder="Ex: 1300.00"
                          className="w-full pl-12 pr-4 py-3 border-2 border-neutral-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handlePriceFilter}
                      className="btn bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg whitespace-nowrap"
                    >
                      Aplicar Filtro
                    </button>
                    {(minPrice > 0 || maxPrice > 0) && (
                      <button
                        onClick={clearPriceFilter}
                        className="btn bg-neutral-200 text-neutral-700 hover:bg-neutral-300 whitespace-nowrap"
                      >
                        Limpar Preços
                      </button>
                    )}
                  </div>
                  
                  <p className="text-sm text-neutral-600">
                    💡 Dica: Defina uma faixa de preço para ver todos os colchões disponíveis dentro do seu orçamento
                  </p>
                </div>
              </div>
            </div>
          )}

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
                {products.map((produto) => {
                  // Calcular preço baseado no filtro de tamanho
                  let preco = produto.preco
                  let precoPromocional = produto.preco_promocional

                  const precosPorTamanho = getPrecosPorTamanho(produto)
                  if (precosPorTamanho && sizeFilter !== 'all') {
                    const precoTamanho = precosPorTamanho.find(p => p.tamanho === sizeFilter)
                    if (precoTamanho) {
                      preco = precoTamanho.preco
                      precoPromocional = precoTamanho.preco_promocional || null
                    }
                  }

                  // Determinar se deve mostrar badge de promoção
                  const temPromocao = sizeFilter !== 'all' 
                    ? precoPromocional !== null && precoPromocional > 0
                    : produto.preco_promocional !== null && produto.preco_promocional > 0

                  return (
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
                      ) : (
                        <div className="product-badge flex flex-col gap-2">
                          {produto.destaque && (
                            <span className="badge badge-new">
                              <Star className="w-4 h-4 fill-current" />
                              Destaque
                            </span>
                          )}
                          {temPromocao && (
                            <span className="badge badge-promo">
                              <Tag className="w-4 h-4" />
                              Promoção
                            </span>
                          )}
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
                        {precoPromocional ? (
                          <>
                            <span className="product-price">
                              R$ {precoPromocional.toFixed(2)}
                            </span>
                            <span className="product-price-old">
                              R$ {preco.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="product-price">
                            R$ {preco.toFixed(2)}
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
                )})}
              
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
                    {(() => {
                      // Calcular preço baseado no tamanho selecionado
                      let preco = selectedProduct.preco
                      let precoPromocional = selectedProduct.preco_promocional

                      const precosPorTamanho = getPrecosPorTamanho(selectedProduct)
                      if (precosPorTamanho && selectedSize) {
                        const precoTamanho = precosPorTamanho.find(p => p.tamanho === selectedSize)
                        if (precoTamanho) {
                          preco = precoTamanho.preco
                          precoPromocional = precoTamanho.preco_promocional || null
                        }
                      }

                      return precoPromocional ? (
                        <>
                          <span className="text-4xl font-bold text-blue-700">
                            R$ {precoPromocional.toFixed(2)}
                          </span>
                          <span className="text-xl text-neutral-400 line-through">
                            R$ {preco.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-4xl font-bold text-blue-700">
                          R$ {preco.toFixed(2)}
                        </span>
                      )
                    })()}
                  </div>

                  {/* Size Selection */}
                  {selectedProduct.tamanhos && selectedProduct.tamanhos.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-3">
                        Tamanho {getPrecosPorTamanho(selectedProduct) && <span className="text-blue-600">(o preço varia por tamanho)</span>}
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
