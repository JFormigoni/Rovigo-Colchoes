import { MessageCircle, Heart, Award, Users, Target, Shield, Clock, Star } from 'lucide-react'
import { openWhatsApp } from '@/lib/whatsapp'

export default function About() {
  const handleWhatsApp = () => {
    const message = 'Olá! Gostaria de mais informações sobre os colchões.'
    openWhatsApp(message)
  }

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop)'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl">
            Sobre Nós
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/95 drop-shadow-lg font-light">
            Transformando noites de sono há mais de 20 anos
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl mb-6">
                <Heart className="w-10 h-10 text-blue-700" />
              </div>
              <h2 className="text-4xl font-bold mb-6 text-neutral-900">Nossa História</h2>
              <p className="text-lg text-neutral-700 leading-relaxed">
                Fundada em 2004, nossa empresa nasceu do sonho de proporcionar noites de sono perfeitas para todas as famílias. Começamos como uma pequena loja e hoje somos referência em qualidade e atendimento personalizado, sempre com foco no bem-estar e conforto dos nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="section bg-pattern">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Missão */}
            <div className="card-flat p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6">
                <Target className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900">Missão</h3>
              <p className="text-neutral-700 leading-relaxed">
                Oferecer colchões de alta qualidade que proporcionem conforto, saúde e bem-estar, garantindo noites de sono reparadoras.
              </p>
            </div>

            {/* Visão */}
            <div className="card-flat p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6">
                <Award className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900">Visão</h3>
              <p className="text-neutral-700 leading-relaxed">
                Ser a marca de colchões mais confiável e reconhecida pela excelência em produtos e atendimento em todo o país.
              </p>
            </div>

            {/* Valores */}
            <div className="card-flat p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6">
                <Users className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900">Valores</h3>
              <p className="text-neutral-700 leading-relaxed">
                Qualidade, transparência, atendimento personalizado e compromisso com o cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-neutral-900">
              Por que escolher a gente?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Oferecemos muito mais do que apenas colchões
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Qualidade Garantida */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl mb-6 mx-auto">
                <Shield className="w-10 h-10 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900">Qualidade Garantida</h3>
              <p className="text-neutral-600">
                10 anos de garantia em todos os nossos produtos
              </p>
            </div>

            {/* Entrega Rápida */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl mb-6 mx-auto">
                <Clock className="w-10 h-10 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900">Entrega Rápida</h3>
              <p className="text-neutral-600">
                Entrega e instalação gratuita em até 48h
              </p>
            </div>

            {/* Atendimento Especializado */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl mb-6 mx-auto">
                <Users className="w-10 h-10 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900">Atendimento Especializado</h3>
              <p className="text-neutral-600">
                Consultores treinados para ajudar na melhor escolha
              </p>
            </div>

            {/* Satisfação Garantida */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl mb-6 mx-auto">
                <Star className="w-10 h-10 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900">100 Noites de Teste</h3>
              <p className="text-neutral-600">
                Experimente em casa com garantia de devolução
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="section card-gradient">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-700 mb-2">20+</div>
              <div className="text-neutral-700 font-medium">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-700 mb-2">50k+</div>
              <div className="text-neutral-700 font-medium">Clientes Satisfeitos</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-700 mb-2">98%</div>
              <div className="text-neutral-700 font-medium">Satisfação</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-700 mb-2">10</div>
              <div className="text-neutral-700 font-medium">Anos de Garantia</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section promo-banner">
        <div className="promo-content">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Pronto para melhorar seu sono?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e descubra o colchão perfeito para você
          </p>
          <button onClick={handleWhatsApp} className="btn btn-whatsapp btn-lg">
            <MessageCircle className="w-6 h-6" />
            Falar com Especialista
          </button>
        </div>
      </section>
    </div>
  )
}
