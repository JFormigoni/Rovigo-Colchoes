import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Plus, Pencil, Trash2, Package, TrendingUp, Star, Eye, EyeOff, Tag, Search, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Produto, TamanhoPrecificacao } from '@/lib/database.types'
import ProductForm from '@/components/ProductForm'

export default function Admin() {
  const [products, setProducts] = useState<Produto[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Produto[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Produto | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
    loadProducts()
  }, [])

  // Filtrar produtos quando o termo de pesquisa mudar
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products)
    } else {
      const term = searchTerm.toLowerCase()
      const filtered = products.filter(produto => 
        produto.nome.toLowerCase().includes(term) ||
        produto.descricao?.toLowerCase().includes(term) ||
        produto.cores?.some(cor => cor.toLowerCase().includes(term)) ||
        produto.tamanhos?.some(tamanho => tamanho.toLowerCase().includes(term))
      )
      setFilteredProducts(filtered)
    }
  }, [searchTerm, products])

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
      setFilteredProducts(data || [])
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
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
      // Se tem preço promocional, remove (volta para preço normal)
      // Se não tem preço promocional, não faz nada (usuário precisa editar o produto)
      if (!produto.preco_promocional) {
        alert('Este produto não tem preço promocional cadastrado. Use o botão Editar para adicionar um preço promocional.')
        return
      }

      const { error } = await (supabase.from('produtos') as any)
        .update({ preco_promocional: null })
        .eq('id', produto.id)

      if (error) {
        console.error('Erro ao atualizar promoção:', error)
        throw error
      }
      
      // Atualizar o produto localmente para feedback imediato
      setProducts(products.map(p => 
        p.id === produto.id 
          ? { ...p, preco_promocional: null } 
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

  // Função para obter o menor preço (do primeiro tamanho)
  const getMenorPreco = (produto: Produto): { preco: number, precoPromocional: number | null } => {
    const precosPorTamanho = getPrecosPorTamanho(produto)
    
    if (precosPorTamanho && precosPorTamanho.length > 0) {
      // Retorna o preço do primeiro tamanho (que é o menor)
      const primeiroTamanho = precosPorTamanho[0]
      return {
        preco: primeiroTamanho.preco,
        precoPromocional: primeiroTamanho.preco_promocional || null
      }
    }
    
    // Se não houver preços por tamanho, retorna os preços padrão
    return {
      preco: produto.preco,
      precoPromocional: produto.preco_promocional
    }
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
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold text-neutral-900">Produtos</h2>
              
              <button 
                onClick={handleAdd} 
                className="btn btn-primary whitespace-nowrap w-full sm:w-auto"
              >
                <Plus size={20} />
                Adicionar Produto
              </button>
            </div>
            
            {/* Barra de Pesquisa */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Pesquisar produtos por nome, descrição, cor ou tamanho..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border-2 border-neutral-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                  aria-label="Limpar pesquisa"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Contador de resultados */}
          {searchTerm && (
            <div className="mb-4 px-2 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700 font-medium">
                {filteredProducts.length === 0 
                  ? `Nenhum produto encontrado para "${searchTerm}"` 
                  : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'} para "${searchTerm}"`
                }
              </p>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              {searchTerm ? (
                <>
                  <p className="text-neutral-600 mb-4">Nenhum produto encontrado para "{searchTerm}"</p>
                  <button onClick={clearSearch} className="btn btn-secondary">
                    Limpar Pesquisa
                  </button>
                </>
              ) : (
                <>
                  <p className="text-neutral-600 mb-4">Nenhum produto cadastrado.</p>
                  <button onClick={handleAdd} className="btn btn-primary">
                    <Plus size={20} />
                    Adicionar Primeiro Produto
                  </button>
                </>
              )}
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
                  {filteredProducts.map((produto) => (
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
                          {(() => {
                            const { preco, precoPromocional } = getMenorPreco(produto)
                            const precosPorTamanho = getPrecosPorTamanho(produto)
                            
                            return precoPromocional ? (
                              <>
                                <p className="font-bold text-blue-600">R$ {precoPromocional.toFixed(2)}</p>
                                <p className="text-sm text-neutral-400 line-through">R$ {preco.toFixed(2)}</p>
                                {precosPorTamanho && (
                                  <p className="text-xs text-neutral-500 mt-1">A partir de</p>
                                )}
                              </>
                            ) : (
                              <>
                                <p className="font-bold text-neutral-900">R$ {preco.toFixed(2)}</p>
                                {precosPorTamanho && (
                                  <p className="text-xs text-neutral-500 mt-1">A partir de</p>
                                )}
                              </>
                            )
                          })()}
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
                            title={produto.preco_promocional ? 'Remover promoção' : 'Sem preço promocional (edite o produto)'}
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
