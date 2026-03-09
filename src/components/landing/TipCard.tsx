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
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="text-blue-600 mb-4">
        {tip.icon}
      </div>
      
      <h3 className="text-xl font-semibold mb-3 text-gray-900">
        {tip.title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed">
        {tip.description}
      </p>
    </div>
  )
}
