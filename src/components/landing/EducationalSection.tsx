import { Ruler, Moon, Wind, Thermometer } from 'lucide-react'
import TipCard, { Tip } from './TipCard'

export default function EducationalSection() {
  const tips: Tip[] = [
    {
      icon: <Ruler className="w-10 h-10" />,
      title: 'Tamanho Adequado',
      description: 'Escolha um colchão que permita movimentação livre. Deve ter pelo menos 15cm a mais que sua altura'
    },
    {
      icon: <Moon className="w-10 h-10" />,
      title: 'Firmeza Ideal',
      description: 'O colchão deve apoiar sua coluna mantendo-a alinhada. Nem muito mole, nem muito duro'
    },
    {
      icon: <Wind className="w-10 h-10" />,
      title: 'Ventilação',
      description: 'Prefira colchões com boa circulação de ar para evitar acúmulo de umidade e ácaros'
    },
    {
      icon: <Thermometer className="w-10 h-10" />,
      title: 'Controle de Temperatura',
      description: 'Materiais que regulam temperatura proporcionam sono mais confortável durante toda a noite'
    }
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Como escolher o colchão ideal
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Dicas essenciais para fazer a escolha certa
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, index) => (
            <TipCard key={index} tip={tip} />
          ))}
        </div>
      </div>
    </section>
  )
}
