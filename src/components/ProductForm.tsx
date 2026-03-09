import { useState, FormEvent, useEffect, useRef } from 'react'
import { X, Upload, Image as ImageIcon } from 'lucide-react'
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
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (produto) {
      setNome(produto.nome)
      setDescricao(produto.descricao)
      setPreco(produto.preco.toString())
      setPrecoPromocional(produto.preco_promocional?.toString() || '')
      setCores(produto.cores.join(', '))
      setImagemUrl(produto.imagem || '')
      setImagePreview(produto.imagem || null)
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

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.')
      return
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.')
      return
    }

    setUploadingImage(true)

    try {
      // Converter para base64 para preview e armazenamento
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImagePreview(base64String)
        setImagemUrl(base64String)
        setUploadingImage(false)
      }
      reader.onerror = () => {
        alert('Erro ao ler o arquivo.')
        setUploadingImage(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      alert('Erro ao fazer upload da imagem.')
      setUploadingImage(false)
    }
  }

  function handleUrlChange(url: string) {
    setImagemUrl(url)
    setImagePreview(url || null)
  }

  function clearImage() {
    setImagemUrl('')
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
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
        const { error } = await (supabase.from('produtos') as any)
          .update(produtoData)
          .eq('id', produto.id)

        if (error) throw error
      } else {
        const { error } = await (supabase.from('produtos') as any)
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        {/* Header Fixo */}
        <div className="flex-shrink-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-neutral-900">
            {produto ? 'Editar Produto' : 'Adicionar Produto'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X size={24} className="text-neutral-600" />
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="flex-1 overflow-y-auto">
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
                rows={3}
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
                Imagem do Produto
              </label>
              
              {/* Preview da Imagem */}
              {imagePreview && (
                <div className="relative mb-4 inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full max-h-40 rounded-lg border-2 border-neutral-200"
                    onError={() => setImagePreview(null)}
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    title="Remover imagem"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Botões de Upload */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="btn btn-secondary flex-1 justify-center"
                  >
                    {uploadingImage ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span>Carregando...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={20} />
                        <span>Fazer Upload</span>
                      </>
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-neutral-500">ou</span>
                  </div>
                </div>

                <div>
                  <input
                    type="url"
                    value={imagemUrl.startsWith('data:') ? '' : imagemUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="input"
                    placeholder="Cole a URL de uma imagem"
                    disabled={uploadingImage}
                  />
                  <p className="text-sm text-neutral-500 mt-1">
                    <ImageIcon size={14} className="inline mr-1" />
                    Aceita imagens até 5MB (JPG, PNG, WebP)
                  </p>
                </div>
              </div>
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

            {/* Botões de Ação - Fixos no final do scroll */}
            <div className="flex gap-3 pt-6 pb-2 sticky bottom-0 bg-white">
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
    </div>
  )
}
