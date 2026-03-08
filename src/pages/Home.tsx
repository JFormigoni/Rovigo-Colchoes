import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
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
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Durma Melhor, Viva Melhor
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100">
            Colchões de alta qualidade para o seu conforto
          </p>
          <Link to="/produtos" className="btn btn-primary text-lg">
            Ver Produtos
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Produtos em Destaque
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : featuredProducts.length === 0 ? (
            <p className="text-center text-gray-600">
              Nenhum produto em destaque no momento.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((produto) => (
                <ProductCard
                  key={produto.id}
                  produto={produto}
                  onClick={() => (window.location.href = '/produtos')}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Sobre Nossa Loja</h2>
          <p className="text-lg text-gray-700 mb-8">
            Há mais de 20 anos oferecendo os melhores colchões para garantir noites de sono
            perfeitas. Qualidade, conforto e atendimento personalizado.
          </p>
          <Link to="/sobre" className="btn btn-secondary">
            Saiba Mais
          </Link>
        </div>
      </section>
    </div>
  )
}
