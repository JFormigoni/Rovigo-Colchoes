import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Produto } from '@/lib/database.types'
import ProductCard from '@/components/ProductCard'
import ProductModal from '@/components/ProductModal'

export default function Products() {
  const [products, setProducts] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Nossos Produtos</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">
            Nenhum produto disponível no momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((produto) => (
              <ProductCard
                key={produto.id}
                produto={produto}
                onClick={() => produto.estoque && setSelectedProduct(produto)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          produto={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
