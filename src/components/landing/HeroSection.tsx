import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function HeroSection() {
  const navigate = useNavigate()

  const handleProductsClick = () => {
    navigate('/produtos')
  }

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop)'
      }}
    >
      {/* Overlay escuro suave para legibilidade */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Conteúdo */}
      <div className="relative z-10 container-custom text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-2xl">
          Durma Melhor, Viva Melhor
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/95 drop-shadow-lg font-light">
          Conforto excepcional, tecnologia avançada e garantia de qualidade para suas noites de sono perfeitas
        </p>
        
        <button
          onClick={handleProductsClick}
          className="btn btn-primary btn-lg shadow-2xl"
          aria-label="Ver produtos"
        >
          Ver Produtos
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  )
}
