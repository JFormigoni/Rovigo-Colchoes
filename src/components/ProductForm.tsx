import { useState, FormEvent, useEffect, useRef } from 'react'
import { X, Upload, Image as ImageIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Produto, TamanhoPrecificacao } from '@/lib/database.types'

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
  const [imagens, setImagens] = useState<string[]>([])
  const [tamanhosSelecionados, setTamanhosSelecionados] = useState<string[]>([])
  const [precosPorTamanho, setPrecosPorTamanho] = useState<TamanhoPrecificacao[]>([])
  const [usarPrecoPorTamanho, setUsarPrecoPorTamanho] = useState(false)
  const [promocao, setPromocao] = useState(false)
  const [destaque, setDestaque] = useState(false)
  const [estoque, setEstoque] = useState(true)
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [novaImagemUrl, setNovaImagemUrl] = useState('')
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
      
      // Carregar imagens adicionais se existirem
      if (produto.imagens && Array.isArray(produto.imagens)) {
        setImagens(produto.imagens)
      } else if (produto.imagem) {
        // Se só tem imagem principal, adicionar ao array
        setImagens([produto.imagem])
      }
      
      setTamanhosSelecionados(produto.tamanhos)
      setPromocao(produto.promocao)
      setDestaque(produto.destaque)
      setEstoque(produto.estoque)
      
      // Carregar preços por tamanho se existirem
      if (produto.precos_por_tamanho) {
        try {
          const precos = typeof produto.precos_por_tamanho === 'string' 
            ? JSON.parse(produto.precos_por_tamanho)
            : produto.precos_por_tamanho
          
          if (Array.isArray(precos) && precos.length > 0) {
            setPrecosPorTamanho(precos)
            setUsarPrecoPorTamanho(true)
          }
        } catch (error) {
          console.error('Erro ao parsear precos_por_tamanho:', error)
        }
      }
    }
  }, [produto])

  // Marcar automaticamente como promoção quando há preço promocional
  useEffect(() => {
    if (usarPrecoPorTamanho) {
      // Verificar se algum tamanho tem preço promocional
      const temPrecoPromocional = precosPorTamanho.some(p => p.preco_promocional && p.preco_promocional > 0)
      setPromocao(temPrecoPromocional)
    } else {
      // Verificar preço promocional geral
      const temPrecoPromocional = Boolean(precoPromocional && parseFloat(precoPromocional) > 0)
      setPromocao(temPrecoPromocional)
    }
  }, [precoPromocional, precosPorTamanho, usarPrecoPorTamanho])

  function toggleTamanho(tamanho: string) {
    setTamanhosSelecionados((prev) => {
      const isRemoving = prev.includes(tamanho)
      
      if (isRemoving) {
        // Remover tamanho e seu preço
        setPrecosPorTamanho(precosPorTamanho.filter(p => p.tamanho !== tamanho))
        return prev.filter((t) => t !== tamanho)
      } else {
        // Adicionar tamanho mantendo a ordem de TAMANHOS
        const novosTamanhos = [...prev, tamanho]
        const tamanhosOrdenados = TAMANHOS.filter(t => novosTamanhos.includes(t))
        
        // Adicionar entrada de preço se usar preço por tamanho
        if (usarPrecoPorTamanho) {
          setPrecosPorTamanho([...precosPorTamanho, { 
            tamanho, 
            preco: 0, 
            preco_promocional: null 
          }])
        }
        return tamanhosOrdenados
      }
    })
  }

  function updatePrecoTamanho(tamanho: string, preco: number) {
    setPrecosPorTamanho(prev => {
      const novosPrecos = prev.map(p => p.tamanho === tamanho ? { ...p, preco } : p)
      
      // Atualizar o preço principal com o valor do primeiro tamanho
      const primeiroTamanho = TAMANHOS.find(t => novosPrecos.some(p => p.tamanho === t))
      if (primeiroTamanho) {
        const precoDoMenor = novosPrecos.find(p => p.tamanho === primeiroTamanho)
        if (precoDoMenor) {
          setPreco(precoDoMenor.preco.toString())
        }
      }
      
      return novosPrecos
    })
  }

  function updatePrecoPromocionalTamanho(tamanho: string, precoPromocional: number | null) {
    setPrecosPorTamanho(prev => {
      const novosPrecos = prev.map(p => p.tamanho === tamanho ? { ...p, preco_promocional: precoPromocional } : p)
      
      // Atualizar o preço promocional principal com o valor do primeiro tamanho
      const primeiroTamanho = TAMANHOS.find(t => novosPrecos.some(p => p.tamanho === t))
      if (primeiroTamanho) {
        const precoDoMenor = novosPrecos.find(p => p.tamanho === primeiroTamanho)
        if (precoDoMenor) {
          setPrecoPromocional(precoDoMenor.preco_promocional?.toString() || '')
        }
      }
      
      return novosPrecos
    })
  }

  function toggleUsarPrecoPorTamanho(enabled: boolean) {
    setUsarPrecoPorTamanho(enabled)
    
    if (enabled && tamanhosSelecionados.length > 0) {
      // Inicializar preços para tamanhos já selecionados na ordem correta
      const tamanhosOrdenados = TAMANHOS.filter(t => tamanhosSelecionados.includes(t))
      const novosPrecos = tamanhosOrdenados.map(tamanho => ({
        tamanho,
        preco: parseFloat(preco) || 0,
        preco_promocional: precoPromocional ? parseFloat(precoPromocional) : null
      }))
      setPrecosPorTamanho(novosPrecos)
    } else if (!enabled) {
      setPrecosPorTamanho([])
    }
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
      // Gerar nome único para o arquivo
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `produtos/${fileName}`

      // Fazer upload para o Supabase Storage
      const { error } = await supabase.storage
        .from('imagens')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        throw error
      }

      // Obter URL pública da imagem
      const { data: { publicUrl } } = supabase.storage
        .from('imagens')
        .getPublicUrl(filePath)

      setImagePreview(publicUrl)
      setNovaImagemUrl(publicUrl)
      setUploadingImage(false)
    } catch (error: any) {
      console.error('Erro ao fazer upload:', error)
      
      let mensagemErro = 'Erro ao fazer upload da imagem.'
      
      if (error.message?.includes('Bucket not found')) {
        mensagemErro = `❌ Bucket 'imagens' não encontrado no Supabase Storage!\n\n` +
          `Por favor, configure o Storage seguindo o arquivo PASSO-A-PASSO-STORAGE.md\n\n` +
          `Resumo:\n` +
          `1. Acesse o Supabase Dashboard\n` +
          `2. Vá em SQL Editor\n` +
          `3. Execute o script criar-bucket-imagens.sql`
      } else if (error.message?.includes('row-level security')) {
        mensagemErro = `❌ Políticas de segurança não configuradas!\n\n` +
          `Execute o script criar-bucket-imagens.sql no SQL Editor do Supabase.`
      } else {
        mensagemErro = `Erro ao fazer upload: ${error.message}`
      }
      
      alert(mensagemErro)
      setUploadingImage(false)
    }
  }

  function clearImage() {
    setNovaImagemUrl('')
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function addImageToGallery() {
    const urlToAdd = novaImagemUrl.trim() || imagePreview
    
    if (!urlToAdd) {
      alert('Por favor, adicione uma imagem primeiro.')
      return
    }

    if (imagens.includes(urlToAdd)) {
      alert('Esta imagem já foi adicionada.')
      return
    }

    setImagens([...imagens, urlToAdd])
    
    // Se é a primeira imagem, definir como principal
    if (!imagemUrl) {
      setImagemUrl(urlToAdd)
    }
    
    // Limpar campos
    setNovaImagemUrl('')
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function removeImage(index: number) {
    const novasImagens = imagens.filter((_, i) => i !== index)
    setImagens(novasImagens)
    
    // Se removeu a imagem principal, definir a próxima como principal
    if (index === 0 && novasImagens.length > 0) {
      setImagemUrl(novasImagens[0])
    } else if (novasImagens.length === 0) {
      setImagemUrl('')
    }
  }

  function setAsMainImage(index: number) {
    const novasImagens = [...imagens]
    const [imagemSelecionada] = novasImagens.splice(index, 1)
    novasImagens.unshift(imagemSelecionada)
    setImagens(novasImagens)
    setImagemUrl(imagemSelecionada)
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
      imagem: imagens.length > 0 ? imagens[0] : null,
      imagens: imagens.length > 0 ? imagens : null,
      precos_por_tamanho: usarPrecoPorTamanho && precosPorTamanho.length > 0 
        ? JSON.stringify(
            // Ordenar preços por tamanho na ordem de TAMANHOS antes de salvar
            TAMANHOS.filter(t => precosPorTamanho.some(p => p.tamanho === t))
              .map(t => precosPorTamanho.find(p => p.tamanho === t)!)
          ) as any
        : null,
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
                <label className="block text-sm font-medium mb-2">
                  Preço (R$) {usarPrecoPorTamanho && <span className="text-blue-600 text-xs">(menor preço)</span>}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  className="input"
                  placeholder="1299.90"
                  required
                  disabled={usarPrecoPorTamanho}
                />
                {usarPrecoPorTamanho && (
                  <p className="text-xs text-neutral-500 mt-1">
                    Este valor é atualizado automaticamente com o preço do primeiro tamanho
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Preço Promocional (R$) {usarPrecoPorTamanho && <span className="text-blue-600 text-xs">(menor preço)</span>}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={precoPromocional}
                  onChange={(e) => setPrecoPromocional(e.target.value)}
                  className="input"
                  placeholder="999.90 (opcional)"
                  disabled={usarPrecoPorTamanho}
                />
                {usarPrecoPorTamanho && (
                  <p className="text-xs text-neutral-500 mt-1">
                    Este valor é atualizado automaticamente com o preço promocional do primeiro tamanho
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">
                  Imagens do Produto
                </label>
                {imagens.length > 0 && (
                  <span className="text-sm text-neutral-500">
                    {imagens.length} {imagens.length === 1 ? 'imagem' : 'imagens'}
                  </span>
                )}
              </div>
              
              {/* Galeria de Imagens */}
              {imagens.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-neutral-600 mb-3">
                    A primeira imagem é a principal. Arraste para reordenar ou clique em "Principal".
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {imagens.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Imagem ${index + 1}`}
                          className={`w-full h-32 object-cover rounded-lg border-2 ${
                            index === 0 ? 'border-blue-500' : 'border-neutral-200'
                          }`}
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/150?text=Erro'
                          }}
                        />
                        {index === 0 && (
                          <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            Principal
                          </span>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          {index !== 0 && (
                            <button
                              type="button"
                              onClick={() => setAsMainImage(index)}
                              className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                              title="Definir como principal"
                            >
                              Principal
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                            title="Remover imagem"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preview da Nova Imagem */}
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
                    title="Remover preview"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Botões de Upload */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="btn btn-primary w-full justify-center"
                >
                  {uploadingImage ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Fazendo Upload...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={20} />
                      <span>Selecionar e Fazer Upload da Imagem</span>
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

                {imagePreview && (
                  <button
                    type="button"
                    onClick={addImageToGallery}
                    className="btn btn-secondary w-full justify-center"
                  >
                    <ImageIcon size={20} />
                    Adicionar à Galeria
                  </button>
                )}
                
                <p className="text-sm text-neutral-500 text-center">
                  <ImageIcon size={14} className="inline mr-1" />
                  Aceita imagens até 5MB (JPG, PNG, WebP)
                </p>
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
              <div className="flex flex-wrap gap-3 mb-4">
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

              {/* Opção de preço por tamanho */}
              <label className="flex items-center gap-2 cursor-pointer mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <input
                  type="checkbox"
                  checked={usarPrecoPorTamanho}
                  onChange={(e) => toggleUsarPrecoPorTamanho(e.target.checked)}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="font-medium text-blue-900">Definir preços diferentes por tamanho</span>
              </label>

              {/* Tabela de preços por tamanho */}
              {usarPrecoPorTamanho && tamanhosSelecionados.length > 0 && (
                <div className="border border-neutral-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="text-left py-2 px-4 text-sm font-semibold text-neutral-700">Tamanho</th>
                        <th className="text-left py-2 px-4 text-sm font-semibold text-neutral-700">Preço (R$)</th>
                        <th className="text-left py-2 px-4 text-sm font-semibold text-neutral-700">Preço Promocional (R$)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TAMANHOS.filter(t => tamanhosSelecionados.includes(t)).map((tamanho) => {
                        const precoTamanho = precosPorTamanho.find(p => p.tamanho === tamanho)
                        return (
                          <tr key={tamanho} className="border-t border-neutral-200">
                            <td className="py-2 px-4 font-medium">{tamanho}</td>
                            <td className="py-2 px-4">
                              <input
                                type="number"
                                step="0.01"
                                value={precoTamanho?.preco || ''}
                                onChange={(e) => updatePrecoTamanho(tamanho, parseFloat(e.target.value) || 0)}
                                className="input w-full"
                                placeholder="0.00"
                                required={usarPrecoPorTamanho}
                              />
                            </td>
                            <td className="py-2 px-4">
                              <input
                                type="number"
                                step="0.01"
                                value={precoTamanho?.preco_promocional || ''}
                                onChange={(e) => updatePrecoPromocionalTamanho(tamanho, e.target.value ? parseFloat(e.target.value) : null)}
                                className="input w-full"
                                placeholder="Opcional"
                              />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="space-y-3 pt-4 border-t">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={promocao}
                  onChange={(e) => setPromocao(e.target.checked)}
                  disabled={Boolean(precoPromocional && parseFloat(precoPromocional) > 0) || precosPorTamanho.some(p => p.preco_promocional && p.preco_promocional > 0)}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span className="font-medium">
                  Em Promoção
                  {(Boolean(precoPromocional && parseFloat(precoPromocional) > 0) || precosPorTamanho.some(p => p.preco_promocional && p.preco_promocional > 0)) && (
                    <span className="text-xs text-blue-600 ml-2">(automático)</span>
                  )}
                </span>
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
