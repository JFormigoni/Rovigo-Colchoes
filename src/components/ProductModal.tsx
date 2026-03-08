import { useState } from 'react'
import { X, MessageCircle } from 'lucide-react'
import type { Produto } from '@/lib/database.types'
import { openWhatsApp } from '@/lib/config'

interface ProductModalProps {
  produto: Produto
  onClose: () => void
}

export default function ProductModal({ produto, onClose }: ProductModalProps) {
  const [selectedColor, setSelectedColor] = useState(produto.cores[0] || '')
  const [selectedSize, setSelectedSize] = useState(produto.tamanhos[0] || '')

  const hasPromo = produto.promocao && produto.preco_promocional

  const handleWhatsApp = () => {
    const message = `Olá, tenho interesse no colchão ${produto.nome}.
Cor: ${selectedColor}
Tamanho: ${selectedSize}.
Poderia me passar mais informações?`

    openWhatsApp(message)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{produto.nome}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={produto.imagem || 'https://via.placeholder.com/400x400?text=Sem+Imagem'}
              alt={produto.nome}
              className="w-full rounded-xl"
            />
          </div>

          <div>
            <p className="text-gray-600 mb-6">{produto.descricao}</p>

            <div className="flex items-center gap-3 mb-6">
              {hasPromo ? (
                <>
                  <span className="text-gray-400 line-through text-xl">
                    R$ {produto.preco.toFixed(2)}
                  </span>
                  <span className="text-red-600 font-bold text-2xl">
                    R$ {produto.preco_promocional!.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-gray-900 font-bold text-2xl">
                  R$ {produto.preco.toFixed(2)}
                </span>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Cor:</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="input"
                >
                  {produto.cores.map((cor: string) => (
                    <option key={cor} value={cor}>
                      {cor}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tamanho:</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="input"
                >
                  {produto.tamanhos.map((tamanho: string) => (
                    <option key={tamanho} value={tamanho}>
                      {tamanho}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button onClick={handleWhatsApp} className="btn btn-whatsapp w-full justify-center">
              <MessageCircle size={20} />
              Falar com Vendedor no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
