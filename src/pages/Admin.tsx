import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Plus, Pencil, Trash2, Package, TrendingUp, Star, Eye, EyeOff, Tag } from 'lucide-react'
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

      if (error) {
        console.error('Erro ao deletar:', error)
        throw error
      }
      
      // Remover produto localmente
      setProducts(products.filter(p => p.id !== id))
    } catch (error) {
      console.error('Erro ao deletar produto:', error)
      alert('Erro ao deletar produto: ' + (error as Error).message)
    }
  }

  async function toggleStock(produto: Produto) {
    try {
      const newValue = !produto.estoque
      
      const { error } = await (supabase.from('produtos') as any)
        .update({ estoque: newValue })
        .eq('id', produto.id)

      if (error) {
        console.error('Erro ao atualizar estoque:', error)
        throw error
      }
      
      // Atualizar o produto localmente para feedback imediato
      setProducts(products.map(p => 
        p.id === produto.id ? { ...p, estoque: newValue } : p
      ))
    } catch (error) {
      console.error('Erro ao atualizar estoque:', error)
      alert('Erro ao atualizar estoque: ' + (error as Error).message)
      loadProducts() // Recarregar em caso de erro
    }
  }

  async function toggleFeatured(produto: Produto) {
    try {
      const newValue = !produto.destaque
      
      const { error } = await (supabase.from('produtos') as any)
        .update({ destaque: newValue })
        .eq('id', produto.id)

      if (error) {
        console.error('Erro ao atualizar destaque:', error)
        throw error
      }
      
      // Atualizar o produto localmente para feedback imediato
      setProducts(products.map(p => 
        p.id === produto.id ? { ...p, destaque: newValue } : p
      ))
    } catch (error) {
      console.error('Erro ao atualizar destaque:', error)
      alert('Erro ao atualizar destaque: ' + (error as Error).message)
      loadProducts() // Recarregar em caso de erro
    }
  }

  async function togglePromo(produto: Produto) {
    try {
      // Alternar entre preço normal e preço promocional
      // Se já tem preço promocional, remove (volta para preço normal)
      // Se não tem, não faz nada (precisa editar o produto para definir)
      const newValue = produto.preco_promocional ? null : produto.preco_promocional

      const { error } = await (supabase.from('produtos') as any)
        .update({ preco_promocional: newValue })
        .eq('id', produto.id)

      if (error) {
        console.error('Erro ao atualizar promoção:', error)
        throw error
      }
      
      // Atualizar o produto localmente para feedback imediato
      setProducts(products.map(p => 
        p.id === produto.id 
          ? { ...p, preco_promocional: newValue } 
          : p
      ))
    } catch (error) {
      console.error('Erro ao atualizar promoção:', error)
      alert('Erro ao atualizar promoção: ' + (error as Error).message)
      loadProducts() // Recarregar em caso de erro
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

  // Estatísticas
  const totalProducts = products.length
  const inStock = products.filter(p => p.estoque).length
  const featured = products.filter(p => p.destaque).length
  const onPromo = products.filter(p => p.preco_promocional).length

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard Admin</h1>
              <p className="text-sm text-blue-100">Gerenciamento de Produtos</p>
            </div>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              Sair
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-neutral-900 mb-1">{totalProducts}</h3>
            <p className="text-sm text-neutral-600">Total de Produtos</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-neutral-900 mb-1">{inStock}</h3>
            <p className="text-sm text-neutral-600">Em Estoque</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-neutral-900 mb-1">{featured}</h3>
            <p className="text-sm text-neutral-600">Em Destaque</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-neutral-900 mb-1">{onPromo}</h3>
            <p className="text-sm text-neutral-600">Em Promoção</p>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">Produtos</h2>
            <button 
              onClick={handleAdd} 
              className="btn btn-primary"
            >
              <Plus size={20} />
              Adicionar Produto
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600 mb-4">Nenhum produto cadastrado.</p>
              <button onClick={handleAdd} className="btn btn-primary">
                <Plus size={20} />
                Adicionar Primeiro Produto
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Produto</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Preço</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">Ações Rápidas</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((produto) => (
                    <tr key={produto.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={produto.imagem || 'https://via.placeholder.com/60?text=Sem+Imagem'}
                            alt={produto.nome}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-semibold text-neutral-900">{produto.nome}</p>
                            <p className="text-sm text-neutral-500 line-clamp-1">{produto.descricao}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          {produto.preco_promocional ? (
                            <>
                              <p className="font-bold text-blue-600">R$ {produto.preco_promocional.toFixed(2)}</p>
                              <p className="text-sm text-neutral-400 line-through">R$ {produto.preco.toFixed(2)}</p>
                            </>
                          ) : (
                            <p className="font-bold text-neutral-900">R$ {produto.preco.toFixed(2)}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-1 items-center">
                          {produto.estoque ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              Em Estoque
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                              Esgotado
                            </span>
                          )}
                          {produto.destaque && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                              Destaque
                            </span>
                          )}
                          {produto.preco_promocional && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                              Promoção
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => toggleStock(produto)}
                            className={`p-2 rounded-lg transition-colors ${
                              produto.estoque 
                                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                            title={produto.estoque ? 'Marcar como esgotado' : 'Marcar como em estoque'}
                          >
                            {produto.estoque ? <Eye size={18} /> : <EyeOff size={18} />}
                          </button>
                          <button
                            onClick={() => toggleFeatured(produto)}
                            className={`p-2 rounded-lg transition-colors ${
                              produto.destaque 
                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                                : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'
                            }`}
                            title={produto.destaque ? 'Remover destaque' : 'Adicionar destaque'}
                          >
                            <Star size={18} className={produto.destaque ? 'fill-current' : ''} />
                          </button>
                          <button
                            onClick={() => togglePromo(produto)}
                            className={`p-2 rounded-lg transition-colors ${
                              produto.preco_promocional 
                                ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                                : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'
                            }`}
                            title={produto.preco_promocional ? 'Remover promoção' : 'Adicionar promoção (10% off)'}
                          >
                            <Tag size={18} className={produto.preco_promocional ? 'fill-current' : ''} />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleEdit(produto)}
                            className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                            title="Editar"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(produto.id)}
                            className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            title="Excluir"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
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
