import type { Produto } from '@/lib/database.types'

interface ProductCardProps {
  produto: Produto
  onClick?: () => void
}

export default function ProductCard({ produto, onClick }: ProductCardProps) {
  const hasPromo = produto.promocao && produto.preco_promocional
  const outOfStock = !produto.estoque

  return (
    <div
      className="card cursor-pointer"
      onClick={onClick}
    >
      <img
        src={produto.imagem || 'https://via.placeholder.com/300x250?text=Sem+Imagem'}
        alt={produto.nome}
        className="w-full h-64 object-cover"
      />
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
