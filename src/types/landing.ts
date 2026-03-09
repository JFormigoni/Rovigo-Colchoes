/**
 * Interface for landing page product data
 * 
 * Validates Requirements:
 * - 3.2: Product name
 * - 3.3: Product description
 * - 3.4: Product image
 * - 3.5: Product rating
 */
export interface ProductLanding {
  /** Unique identifier for the product */
  id: string
  
  /** Product name/model (Requirement 3.2) */
  name: string
  
  /** Product description (Requirement 3.3) */
  description: string
  
  /** Product image URL (Requirement 3.4) */
  image: string
  
  /** Product rating from 1-5 stars (Requirement 3.5) */
  rating: number
  
  /** Array of product highlights/features */
  highlights: string[]
}

/**
 * Interface for customer testimonials
 * 
 * Validates Requirements:
 * - 4.2: Customer name
 * - 4.3: Customer rating
 * - 4.4: Testimonial text
 */
export interface Testimonial {
  /** Unique identifier for the testimonial */
  id: string
  
  /** Customer name (Requirement 4.2) */
  name: string
  
  /** Customer avatar image URL */
  avatar: string
  
  /** Customer rating from 1-5 stars (Requirement 4.3) */
  rating: number
  
  /** Testimonial text content (Requirement 4.4) */
  text: string
  
  /** Optional date of the testimonial */
  date?: string
}
/**
 * Interface for care tips
 * 
 * Validates Requirements:
 * - 5.3: Care tips with icon, title, and description
 */
export interface Tip {
  /** Icon component for the tip */
  icon: React.ReactNode
  
  /** Tip title (Requirement 5.3) */
  title: string
  
  /** Tip description text (Requirement 5.3) */
  description: string
}
