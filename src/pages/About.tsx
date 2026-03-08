import { MessageCircle } from 'lucide-react'
import { openWhatsApp } from '@/lib/config'

export default function About() {
  const handleWhatsApp = () => {
    const message = 'Olá, gostaria de mais informações sobre os colchões.'
    openWhatsApp(message)
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Sobre Nós</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">Nossa História</h2>
            <p className="text-gray-700 leading-relaxed">
              Fundada em 2004, a ColchõesTop nasceu do sonho de proporcionar noites de sono
              perfeitas para todas as famílias. Começamos como uma pequena loja e hoje somos
              referência em qualidade e atendimento personalizado.
            </p>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">Missão</h2>
            <p className="text-gray-700 leading-relaxed">
              Oferecer colchões de alta qualidade que proporcionem conforto, saúde e bem-estar,
              garantindo noites de sono reparadoras para nossos clientes.
            </p>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">Visão</h2>
            <p className="text-gray-700 leading-relaxed">
              Ser a loja de colchões mais confiável e reconhecida pela excelência em produtos e
              atendimento, expandindo nossa presença e impactando positivamente a qualidade de
              vida das pessoas.
            </p>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-600">Valores</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Qualidade em primeiro lugar
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Atendimento personalizado
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Transparência e honestidade
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Compromisso com o cliente
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Inovação constante
              </li>
            </ul>
          </div>
        </div>

        <div className="card p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-gray-700 mb-6">
            Tem alguma dúvida? Fale conosco pelo WhatsApp!
          </p>
          <button onClick={handleWhatsApp} className="btn btn-whatsapp">
            <MessageCircle size={20} />
            Falar no WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}
