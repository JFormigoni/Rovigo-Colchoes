import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Plus, Pencil, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Produto } from '@/lib/database.types'
import ProductForm from '@/components/ProductForm'

export default function Admin() {
  const [products, setProducts] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Produto | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
    loadProducts()
  }, [])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      navigate('/admin/login')
    }
  }

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

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return

    try {
      const { error } = await supabase
        .from('produtos')
        .delete()
        .eq('id', id)

      if (error) throw error
      loadProducts()
    } catch (error) {
      console.error('Erro ao deletar produto:', error)
      alert('Erro ao deletar produto.')
    }
  }

  function handleEdit(produto: Produto) {
    setEditingProduct(produto)
    setShowForm(true)
  }

  function handleAdd() {
    setEditingProduct(null)
    setShowForm(true)
  }

  function handleFormClose() {
    setShowForm(false)
    setEditingProduct(null)
    loadProducts()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-gray-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold">Admin - ColchõesTop</h1>
            <button onClick={handleLogout} className="btn btn-secondary">
              <LogOut size={20} />
              Sair
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Gerenciar Produtos</h2>
          <button onClick={handleAdd} className="btn btn-primary">
            <Plus size={20} />
            Adicionar Novo Produto
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-600">Nenhum produto cadastrado.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((produto) => (
              <div
                key={produto.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-start md:items-center"
              >
                <img
                  src={produto.imagem || 'https://via.placeholder.com/100?text=Sem+Imagem'}
                  alt={produto.nome}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{produto.nome}</h3>
                  <p className="text-gray-600 mb-2">R$ {produto.preco.toFixed(2)}</p>
                  <div className="flex flex-wrap gap-2">
                    {produto.promocao && (
                      <span className="badge badge-promo">PROMOÇÃO</span>
                    )}
                    {produto.destaque && (
                      <span className="badge bg-blue-500 text-white">DESTAQUE</span>
                    )}
                    {!produto.estoque && (
                      <span className="badge badge-out">FORA DE ESTOQUE</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(produto)}
                    className="btn btn-primary"
                  >
                    <Pencil size={18} />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(produto.id)}
                    className="btn btn-danger"
                  >
                    <Trash2 size={18} />
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <ProductForm
          produto={editingProduct}
          onClose={handleFormClose}
        />
      )}
    </div>
  )
}
