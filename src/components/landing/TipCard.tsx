import { ReactNode } from 'react'

export interface Tip {
  icon: ReactNode
  title: string
  description: string
}

interface TipCardProps {
  tip: Tip
}

export default function TipCard({ tip }: TipCardProps) {
  return (
    <div className="card-flat p-6 text-center space-y-4">
      <div className="text-blue-600 mx-auto w-16 h-16 flex items-center justify-center">
        {tip.icon}
      </div>
      
      <h3 className="text-xl font-semibold text-neutral-900">
        {tip.title}
      </h3>
      
      <p className="text-neutral-600 leading-relaxed">
        {tip.description}
      </p>
    </div>
  )
}
