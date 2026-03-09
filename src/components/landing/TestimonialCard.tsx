import { Star } from 'lucide-react'
import type { Testimonial } from '../../types/landing'

/**
 * TestimonialCard Component
 * 
 * Displays a customer testimonial with avatar, name, rating, and text.
 * 
 * Validates Requirements:
 * - 4.2: Customer name
 * - 4.3: Customer rating (with stars)
 * - 4.4: Testimonial text
 * 
 * @param testimonial - The testimonial data to display
 */
interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { name, avatar, rating, text } = testimonial

  return (
    <div className="testimonial-card">
      {/* Customer Info Section */}
      <div className="testimonial-author">
        {/* Avatar */}
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="w-16 h-16 rounded-full object-cover"
          loading="lazy"
        />
        
        {/* Name and Rating */}
        <div className="flex-1">
          <h3 className="testimonial-name">{name}</h3>
          
          {/* Star Rating */}
          <div className="testimonial-stars" aria-label={`Rating: ${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= rating
                    ? 'fill-current'
                    : 'fill-gray-200 text-gray-200'
                }`}
                data-testid="star-icon"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Text */}
      <p className="testimonial-text">
        "{text}"
      </p>
    </div>
  )
}
