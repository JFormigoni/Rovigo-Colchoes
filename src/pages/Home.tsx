import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Produto } from '@/lib/database.types'
import ProductCard from '@/components/ProductCard'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)

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
      setFeaturedProducts(data || [])
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop)'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 container-custom text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-2xl">
            Durma Melhor, Viva Melhor
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/95 drop-shadow-lg font-light">
            Colchões de alta qualidade para o seu conforto e bem-estar
          </p>
          <Link to="/produtos" className="btn btn-primary btn-lg shadow-2xl">
            Ver Produtos
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section bg-pattern">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Destaques</span>
            </div>
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-lg text-neutral-600">
              Selecionamos os melhores colchões para você
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600 mb-6">
                Nenhum produto em destaque no momento.
              </p>
              <Link to="/produtos" className="btn btn-secondary">
                Ver Todos os Produtos
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredProducts.map((produto) => (
                  <ProductCard
                    key={produto.id}
                    produto={produto}
                    onClick={() => (window.location.href = '/produtos')}
                  />
                ))}
              </div>
              <div className="text-center">
                <Link to="/produtos" className="btn btn-secondary btn-lg">
                  Ver Todos os Produtos
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* About Preview */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-neutral-900">Sobre Nossa Loja</h2>
            <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
              Há mais de 20 anos oferecendo os melhores colchões para garantir noites de sono
              perfeitas. Qualidade, conforto e atendimento personalizado são nossos pilares.
            </p>
            <Link to="/sobre" className="btn btn-secondary btn-lg">
              Saiba Mais Sobre Nós
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
