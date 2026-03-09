import { Heart, Shield, Truck, Award } from 'lucide-react'
import BenefitCard, { Benefit } from './BenefitCard'

export default function BenefitsSection() {
  const benefits: Benefit[] = [
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Conforto Ergonômico',
      description: 'Tecnologia que se adapta perfeitamente ao seu corpo para noites de sono revigorantes'
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Suporte Corporal',
      description: 'Sistema avançado de suporte que mantém sua coluna alinhada durante toda a noite'
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Garantia de Fábrica',
      description: 'Garantia estendida que protege seu investimento em qualidade de sono'
    },
    {
      icon: <Truck className="w-12 h-12" />,
      title: 'Entrega Rápida',
      description: 'Receba seu colchão rapidamente com entrega expressa e instalação gratuita'
    }
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Por que escolher nossos colchões?
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Qualidade e conforto que transformam suas noites
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} />
          ))}
        </div>
      </div>
    </section>
  )
}
