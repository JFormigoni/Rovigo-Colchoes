import HeroSection from '@/components/landing/HeroSection'
import BenefitsSection from '@/components/landing/BenefitsSection'
import ProductsSection from '@/components/landing/ProductsSection'
import SocialProofSection from '@/components/landing/SocialProofSection'
import EducationalSection from '@/components/landing/EducationalSection'
import PromotionalBanner from '@/components/landing/PromotionalBanner'
import FinalCTASection from '@/components/landing/FinalCTASection'
import LandingFooter from '@/components/landing/LandingFooter'
import FloatingWhatsAppButton from '@/components/landing/FloatingWhatsAppButton'

/**
 * Landing Page component for mattress sales
 * 
 * Orchestrates all landing page sections in the correct order.
 * 
 * Validates Requirements:
 * - 1.1-14.7: All requirements through component composition
 * - Proper section ordering for conversion optimization
 * - Clean white background for professional appearance
 * - Floating WhatsApp button for persistent conversion opportunity
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <BenefitsSection />
      <ProductsSection />
      <SocialProofSection />
      <EducationalSection />
      <PromotionalBanner />
      <FinalCTASection />
      <LandingFooter />
      <FloatingWhatsAppButton />
    </div>
  )
}
