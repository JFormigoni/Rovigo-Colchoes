import { ReactNode } from 'react'

export interface Benefit {
  icon: ReactNode
  title: string
  description: string
}

interface BenefitCardProps {
  benefit: Benefit
}

export default function BenefitCard({ benefit }: BenefitCardProps) {
  return (
    <div className="benefit-card">
      <div className="benefit-icon">
        {benefit.icon}
      </div>
      
      <h3 className="benefit-title">
        {benefit.title}
      </h3>
      
      <p className="benefit-description">
        {benefit.description}
      </p>
    </div>
  )
}
