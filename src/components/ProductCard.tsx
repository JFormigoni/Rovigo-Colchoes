import { Image as ImageIcon } from 'lucide-react'
import type { Produto } from '@/lib/database.types'

interface ProductCardProps {
  produto: Produto
  onClick?: () => void
}

export default function ProductCard({ produto, onClick }: ProductCardProps) {
  const hasPromo = produto.promocao && produto.preco_promocional
  const outOfStock = !produto.estoque
  
  // Verificar se tem múltiplas imagens
  const imagemPrincipal = produto.imagens && produto.imagens.length > 0 
    ? produto.imagens[0] 
    : produto.imagem || 'https://via.placeholder.com/300x250?text=Sem+Imagem'
  
  const totalImagens = produto.imagens?.length || (produto.imagem ? 1 : 0)

  return (
    <div
      className="card cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={imagemPrincipal}
          alt={produto.nome}
          className="w-full h-64 object-cover"
        />
        {totalImagens > 1 && (
          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm flex items-center gap-1">
            <ImageIcon size={14} />
            <span>{totalImagens}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{produto.nome}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{produto.descricao}</p>
        
        <div className="flex items-center gap-3 mb-3">
          {hasPromo ? (
            <>
              <span className="text-gray-400 line-through text-lg">
                R$ {produto.preco.toFixed(2)}
              </span>
              <span className="text-red-600 font-bold text-xl">
                R$ {produto.preco_promocional!.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-gray-900 font-bold text-xl">
              R$ {produto.preco.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          {hasPromo && <span className="badge badge-promo">PROMOÇÃO</span>}
          {outOfStock && <span className="badge badge-out">FORA DE ESTOQUE</span>}
        </div>
      </div>
    </div>
  )
}
