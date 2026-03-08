import { useState, FormEvent, useEffect } from 'react'
import { X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Produto } from '@/lib/database.types'

interface ProductFormProps {
  produto: Produto | null
  onClose: () => void
}

const TAMANHOS = ['Solteiro', 'Casal', 'Queen', 'King']

export default function ProductForm({ produto, onClose }: ProductFormProps) {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [precoPromocional, setPrecoPromocional] = useState('')
  const [cores, setCores] = useState('')
  const [imagemUrl, setImagemUrl] = useState('')
  const [tamanhosSelecionados, setTamanhosSelecionados] = useState<string[]>([])
  const [promocao, setPromocao] = useState(false)
  const [destaque, setDestaque] = useState(false)
  const [estoque, setEstoque] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (produto) {
      setNome(produto.nome)
      setDescricao(produto.descricao)
      setPreco(produto.preco.toString())
      setPrecoPromocional(produto.preco_promocional?.toString() || '')
      setCores(produto.cores.join(', '))
      setImagemUrl(produto.imagem || '')
      setTamanhosSelecionados(produto.tamanhos)
      setPromocao(produto.promocao)
      setDestaque(produto.destaque)
      setEstoque(produto.estoque)
    }
  }, [produto])

  function toggleTamanho(tamanho: string) {
    setTamanhosSelecionados((prev) =>
      prev.includes(tamanho)
        ? prev.filter((t) => t !== tamanho)
        : [...prev, tamanho]
    )
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)

    if (tamanhosSelecionados.length === 0) {
      alert('Selecione pelo menos um tamanho.')
      setLoading(false)
      return
    }

    const produtoData = {
      nome,
      descricao,
      preco: parseFloat(preco),
      preco_promocional: precoPromocional ? parseFloat(precoPromocional) : null,
      cores: cores.split(',').map((c) => c.trim()),
      tamanhos: tamanhosSelecionados,
      promocao,
      destaque,
      estoque,
      imagem: imagemUrl || null,
    }

    try {
      if (produto) {
        const { error } = await supabase
          .from('produtos')
          .update(produtoData)
          .eq('id', produto.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('produtos')
          .insert([produtoData])

        if (error) throw error
      }

      onClose()
    } catch (error: any) {
      console.error('Erro ao salvar produto:', error)
      alert('Erro ao salvar produto: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-8">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold">
            {produto ? 'Editar Produto' : 'Adicionar Produto'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nome do Produto</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="input"
              placeholder="Colchão Ortopédico Premium"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="textarea"
              placeholder="Descrição detalhada do produto..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className="input"
                placeholder="1299.90"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Preço Promocional (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={precoPromocional}
                onChange={(e) => setPrecoPromocional(e.target.value)}
                className="input"
                placeholder="999.90 (opcional)"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              URL da Imagem do Produto
            </label>
            <input
              type="url"
              value={imagemUrl}
              onChange={(e) => setImagemUrl(e.target.value)}
              className="input"
              placeholder="https://exemplo.com/imagem.jpg"
            />
            <p className="text-sm text-gray-500 mt-1">
              Cole a URL de uma imagem hospedada online (Imgur, Cloudinary, etc.)
            </p>
            {imagemUrl && (
              <img
                src={imagemUrl}
                alt="Preview"
                className="mt-3 max-w-xs rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Cores Disponíveis (separadas por vírgula)
            </label>
            <input
              type="text"
              value={cores}
              onChange={(e) => setCores(e.target.value)}
              className="input"
              placeholder="Branco, Cinza, Azul"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Tamanhos Disponíveis
            </label>
            <div className="flex flex-wrap gap-3">
              {TAMANHOS.map((tamanho) => (
                <label key={tamanho} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tamanhosSelecionados.includes(tamanho)}
                    onChange={() => toggleTamanho(tamanho)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span>{tamanho}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={promocao}
                onChange={(e) => setPromocao(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="font-medium">Em Promoção</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={destaque}
                onChange={(e) => setDestaque(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="font-medium">Destaque na Home</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={estoque}
                onChange={(e) => setEstoque(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="font-medium">Em Estoque</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1 justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Salvar Produto'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
