# Design Document: Landing Page de Colchões

## Overview

Esta landing page será implementada como uma nova rota no projeto React existente, criando uma experiência otimizada para conversão de visitantes em leads através do WhatsApp. A página será construída utilizando a stack atual (React + TypeScript + Tailwind CSS) e seguirá os padrões de componentes já estabelecidos no projeto.

A arquitetura prioriza:
- Componentização reutilizável e modular
- Performance através de lazy loading e otimização de imagens
- Responsividade mobile-first
- Integração consistente com WhatsApp em múltiplos pontos de contato
- Acessibilidade completa (WCAG 2.1 AA)

## Architecture

### Component Hierarchy

```
LandingPage (src/pages/LandingPage.tsx)
├── HeroSection
│   └── WhatsAppCTA
├── BenefitsSection
│   └── BenefitCard (x4)
├── ProductsSection
│   └── ProductCardLanding (x3+)
│       └── WhatsAppCTA
├── SocialProofSection
│   └── TestimonialCard (x3+)
├── EducationalSection
│   └── TipCard (x3+)
├── PromotionalBanner
│   └── WhatsAppCTA
├── FinalCTASection
│   └── WhatsAppCTA
└── FloatingWhatsAppButton
```

### Routing Integration

A landing page será adicionada ao React Router existente como uma nova rota:
- Path: `/landing` ou `/colchoes`
- Componente: `LandingPage`
- Não utilizará o Layout padrão (Navbar/Footer) para manter foco na conversão
- Footer customizado será incluído dentro do próprio componente

### State Management

Não será necessário gerenciamento de estado global. O estado local será usado para:
- Controle de lazy loading de imagens
- Animações de scroll (opcional)
- Tracking de interações (opcional)

## Components and Interfaces

### 1. LandingPage (Container)

**Responsabilidade:** Componente principal que orquestra todas as seções da landing page.

**Props:** Nenhuma

**Estrutura:**
```typescript
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
```

### 2. HeroSection

**Responsabilidade:** Primeira impressão visual com imagem de impacto e CTA principal.

**Props:** Nenhuma

**Características:**
- Full viewport height (min-h-screen)
- Background image com overlay para legibilidade
- Texto centralizado com hierarquia clara
- CTA proeminente com ícone WhatsApp

**Estrutura:**
```typescript
export default function HeroSection() {
  const handleWhatsAppClick = () => {
    openWhatsApp('Olá! Vim da landing page e gostaria de saber mais sobre os colchões.')
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background image com overlay */}
      {/* Conteúdo centralizado */}
      {/* CTA Button */}
    </section>
  )
}
```

### 3. BenefitsSection

**Responsabilidade:** Exibir os principais benefícios dos colchões de forma visual e escaneável.

**Props:** Nenhuma

**Sub-componente:** BenefitCard

```typescript
interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
}

interface BenefitCardProps {
  benefit: Benefit
}

export default function BenefitsSection() {
  const benefits: Benefit[] = [
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Conforto Ergonômico',
      description: 'Tecnologia que se adapta ao seu corpo'
    },
    // ... outros benefícios
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Por que escolher nossos colchões?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 4. ProductsSection

**Responsabilidade:** Exibir cards de produtos com integração WhatsApp específica por produto.

**Props:** Nenhuma

**Sub-componente:** ProductCardLanding

```typescript
interface ProductLanding {
  id: string
  name: string
  description: string
  image: string
  rating: number
  highlights: string[]
}

interface ProductCardLandingProps {
  product: ProductLanding
}

export default function ProductsSection() {
  const products: ProductLanding[] = [
    // Dados estáticos ou carregados do Supabase
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Nossos Modelos
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Escolha o colchão perfeito para suas necessidades
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCardLanding key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 5. SocialProofSection

**Responsabilidade:** Exibir depoimentos de clientes para construir confiança.

**Props:** Nenhuma

**Sub-componente:** TestimonialCard

```typescript
interface Testimonial {
  id: string
  name: string
  avatar: string
  rating: number
  text: string
  date?: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function SocialProofSection() {
  const testimonials: Testimonial[] = [
    // Dados estáticos
  ]

  return (
    <section className="py-16 px-4 bg-blue-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          O que nossos clientes dizem
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Milhares de pessoas já melhoraram seu sono
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 6. EducationalSection

**Responsabilidade:** Fornecer dicas educativas sobre escolha de colchões.

**Props:** Nenhuma

**Sub-componente:** TipCard

```typescript
interface Tip {
  icon: React.ReactNode
  title: string
  description: string
}

interface TipCardProps {
  tip: Tip
}

export default function EducationalSection() {
  const tips: Tip[] = [
    {
      icon: <Ruler className="w-10 h-10" />,
      title: 'Tamanho Adequado',
      description: 'Escolha um colchão que permita movimentação livre'
    },
    // ... outras dicas
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Como escolher o colchão ideal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <TipCard key={index} tip={tip} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 7. PromotionalBanner

**Responsabilidade:** Destacar promoções e benefícios especiais.

**Props:** Nenhuma

```typescript
export default function PromotionalBanner() {
  const handleWhatsAppClick = () => {
    openWhatsApp('Olá! Gostaria de saber mais sobre as promoções disponíveis.')
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          Oferta Especial
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8" />
            <span className="text-xl">Frete Grátis</span>
          </div>
          <div className="flex items-center gap-3">
            <Tag className="w-8 h-8" />
            <span className="text-xl">Descontos Especiais</span>
          </div>
          <div className="flex items-center gap-3">
            <Moon className="w-8 h-8" />
            <span className="text-xl">100 Noites de Teste</span>
          </div>
        </div>
        <button onClick={handleWhatsAppClick} className="btn btn-whatsapp text-lg">
          <MessageCircle className="w-6 h-6" />
          Falar no WhatsApp
        </button>
      </div>
    </section>
  )
}
```

### 8. FinalCTASection

**Responsabilidade:** Última oportunidade de conversão antes do footer.

**Props:** Nenhuma

```typescript
export default function FinalCTASection() {
  const handleWhatsAppClick = () => {
    openWhatsApp('Olá! Estou pronto para melhorar meu sono. Gostaria de falar com um especialista.')
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6">
          Pronto para dormir melhor?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Fale com nossos especialistas e encontre o colchão perfeito para você
        </p>
        <button onClick={handleWhatsAppClick} className="btn btn-whatsapp text-xl px-10 py-4">
          <MessageCircle className="w-7 h-7" />
          Falar com especialista no WhatsApp
        </button>
      </div>
    </section>
  )
}
```

### 9. FloatingWhatsAppButton

**Responsabilidade:** Botão fixo sempre visível para contato rápido.

**Props:** Nenhuma

```typescript
export default function FloatingWhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const handleClick = () => {
    openWhatsApp('Olá! Gostaria de mais informações sobre os colchões.')
  }

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 z-50 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </button>
  )
}
```

### 10. LandingFooter

**Responsabilidade:** Footer customizado com informações da empresa.

**Props:** Nenhuma

```typescript
export default function LandingFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Informações da empresa */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Sobre Nós</h3>
            <p className="mb-4">
              Especialistas em sono há mais de 20 anos, oferecendo os melhores colchões para sua qualidade de vida.
            </p>
          </div>
          
          {/* Contato */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Contato</h3>
            <p className="mb-2">📍 Endereço da loja</p>
            <p className="mb-2">📞 (47) 99779-4812</p>
            <p className="mb-2">✉️ contato@exemplo.com</p>
          </div>
          
          {/* Redes sociais */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Redes Sociais</h3>
            <div className="flex gap-4">
              {/* Ícones de redes sociais */}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2024 Colchões Premium. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
```

## Data Models

### ProductLanding Interface

```typescript
interface ProductLanding {
  id: string
  name: string
  description: string
  image: string
  rating: number
  highlights: string[]
}
```

**Fonte de dados:** Pode ser estático no código ou carregado do Supabase (tabela `produtos`).

### Testimonial Interface

```typescript
interface Testimonial {
  id: string
  name: string
  avatar: string
  rating: number
  text: string
  date?: string
}
```

**Fonte de dados:** Estático no código (hardcoded).

### Benefit Interface

```typescript
interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
}
```

**Fonte de dados:** Estático no código.

### Tip Interface

```typescript
interface Tip {
  icon: React.ReactNode
  title: string
  description: string
}
```

**Fonte de dados:** Estático no código.

### WhatsApp Message Templates

```typescript
const WHATSAPP_MESSAGES = {
  hero: 'Olá! Vim da landing page e gostaria de saber mais sobre os colchões.',
  product: (productName: string) => 
    `Olá! Tenho interesse no modelo ${productName}. Gostaria de mais informações.`,
  promo: 'Olá! Gostaria de saber mais sobre as promoções disponíveis.',
  final: 'Olá! Estou pronto para melhorar meu sono. Gostaria de falar com um especialista.',
  floating: 'Olá! Gostaria de mais informações sobre os colchões.'
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*



### Property 1: WhatsApp CTA Behavior

*For any* CTA button on the landing page, when clicked, the system should open WhatsApp (mobile app or web) with a pre-filled message that identifies the landing page as the source.

**Validates: Requirements 1.7, 7.4, 8.5, 12.1, 12.2, 12.4**

### Property 2: Product Card Completeness

*For any* product card displayed in the Products Section, the card should render all required fields: product image, model name, description, star rating, and WhatsApp CTA button.

**Validates: Requirements 3.2, 3.3, 3.4, 3.5, 3.6**

### Property 3: Product-Specific WhatsApp Message

*For any* product card CTA button, when clicked, the WhatsApp message should include the specific product model name in the pre-filled text.

**Validates: Requirements 3.7, 12.5**

### Property 4: Benefit Item Structure

*For any* benefit item displayed in the Benefits Section, the item should render both an icon element and a text description.

**Validates: Requirements 2.6**

### Property 5: Testimonial Completeness

*For any* testimonial displayed in the Social Proof Section, the testimonial should render all required fields: star rating, customer photo/avatar, and customer name.

**Validates: Requirements 4.2, 4.3, 4.4**

### Property 6: Educational Tip Structure

*For any* tip displayed in the Educational Section, the tip should include an icon or illustration element.

**Validates: Requirements 5.3**

### Property 7: WhatsApp Link Format

*For any* WhatsApp link generated by the landing page, the URL should follow the format "https://wa.me/[phone_number]?text=[encoded_message]" with proper URL encoding of the message parameter.

**Validates: Requirements 12.3**

### Property 8: Image Accessibility and Performance

*For any* image element on the landing page, the image should have an alt attribute for accessibility, maintain proportional scaling across different viewport sizes, and implement lazy loading if positioned below the fold.

**Validates: Requirements 9.4, 13.2, 14.1**

### Property 9: CTA Touch Target Size

*For any* CTA button element on the landing page, the button should have minimum dimensions of 44px x 44px to ensure adequate touch target size on mobile devices.

**Validates: Requirements 9.6**

### Property 10: Text Contrast Compliance

*For any* text element on the landing page, the color contrast ratio between text and background should be at least 4.5:1 for normal text and at least 3:1 for large text (18pt+ or 14pt+ bold).

**Validates: Requirements 14.2, 14.3**

### Property 11: Interactive Element Keyboard Accessibility

*For any* interactive element (buttons, links) on the landing page, the element should be keyboard navigable (focusable via Tab key) and display a visible focus indicator when focused.

**Validates: Requirements 14.4, 14.5**

### Property 12: Semantic HTML Structure

*For any* major section of the landing page, the section should use appropriate semantic HTML5 elements (section, article, nav, header, footer, main) rather than generic div elements.

**Validates: Requirements 14.6**

### Property 13: ARIA Label Presence

*For any* interactive element that lacks clear text content (icon-only buttons, decorative elements with functionality), the element should include appropriate ARIA labels (aria-label or aria-labelledby) for screen reader compatibility.

**Validates: Requirements 14.7**

## Error Handling

### WhatsApp Integration Errors

**Scenario:** WhatsApp link fails to open or phone number is invalid.

**Handling:**
- Links use standard `https://wa.me/` format which is universally supported
- Phone number is configured in `src/lib/config.ts` as a constant
- No runtime validation needed as the number is static
- If user doesn't have WhatsApp installed, browser will handle gracefully (typically showing app store or web version)

### Image Loading Errors

**Scenario:** Product images or hero images fail to load.

**Handling:**
- Implement fallback placeholder images using `onError` handler
- Use low-quality image placeholders (LQIP) for progressive loading
- Provide meaningful alt text so content is still accessible

```typescript
<img
  src={product.image}
  alt={product.name}
  onError={(e) => {
    e.currentTarget.src = '/placeholder-product.jpg'
  }}
  loading="lazy"
/>
```

### Responsive Layout Issues

**Scenario:** Content doesn't render correctly on extreme viewport sizes.

**Handling:**
- Use Tailwind's responsive utilities with mobile-first approach
- Test on common breakpoints: 320px, 375px, 768px, 1024px, 1920px
- Use `max-w-7xl` containers to prevent excessive stretching on ultra-wide screens
- Implement CSS Grid with `auto-fit` for flexible layouts

### Accessibility Failures

**Scenario:** User navigates with keyboard or screen reader and encounters issues.

**Handling:**
- All interactive elements must have visible focus states (Tailwind's `focus:` utilities)
- Skip-to-content link for keyboard users (optional enhancement)
- Proper heading hierarchy (h1 → h2 → h3) for screen readers
- ARIA labels on icon-only buttons

## Testing Strategy

### Dual Testing Approach

This feature will employ both unit testing and property-based testing to ensure comprehensive coverage:

**Unit Tests** will focus on:
- Specific examples of component rendering (Hero section displays correct text)
- Edge cases (empty product list, missing images)
- Integration points (WhatsApp link generation with special characters in product names)
- Responsive breakpoint behavior at specific widths (768px, 1024px)

**Property-Based Tests** will focus on:
- Universal properties that hold for all inputs (all CTA buttons open WhatsApp correctly)
- Comprehensive input coverage through randomization (any product data renders valid card)
- Accessibility compliance across all elements (all images have alt text)
- Consistency rules (all testimonials have required fields)

### Testing Tools

**Unit Testing:**
- Framework: Vitest (already configured in project)
- Component Testing: React Testing Library
- DOM Queries: `@testing-library/dom`
- User Interaction: `@testing-library/user-event`

**Property-Based Testing:**
- Library: `fast-check` (JavaScript/TypeScript property-based testing library)
- Configuration: Minimum 100 iterations per property test
- Each property test must include a comment tag referencing the design document

**Tag Format:**
```typescript
// Feature: landing-page-colchoes, Property 1: WhatsApp CTA Behavior
test('any CTA button opens WhatsApp with pre-filled message', () => {
  fc.assert(
    fc.property(fc.constantFrom('hero', 'product', 'promo', 'final', 'floating'), (ctaType) => {
      // Test implementation
    }),
    { numRuns: 100 }
  )
})
```

### Test Organization

```
src/
├── pages/
│   ├── LandingPage.tsx
│   └── __tests__/
│       ├── LandingPage.test.tsx          # Unit tests
│       └── LandingPage.properties.test.tsx  # Property-based tests
├── components/
│   ├── landing/
│   │   ├── HeroSection.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── ProductsSection.tsx
│   │   ├── SocialProofSection.tsx
│   │   ├── EducationalSection.tsx
│   │   ├── PromotionalBanner.tsx
│   │   ├── FinalCTASection.tsx
│   │   ├── FloatingWhatsAppButton.tsx
│   │   ├── LandingFooter.tsx
│   │   └── __tests__/
│   │       ├── HeroSection.test.tsx
│   │       ├── ProductCardLanding.test.tsx
│   │       ├── ProductCardLanding.properties.test.tsx
│   │       └── ... (outros testes)
```

### Unit Test Examples

**Example 1: Hero Section Content**
```typescript
describe('HeroSection', () => {
  it('displays the main headline', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/durma melhor/i)
  })

  it('displays WhatsApp CTA button with correct text', () => {
    render(<HeroSection />)
    const button = screen.getByRole('button', { name: /falar com um vendedor no whatsapp/i })
    expect(button).toBeInTheDocument()
  })

  it('has full viewport height', () => {
    const { container } = render(<HeroSection />)
    const section = container.firstChild
    expect(section).toHaveClass('min-h-screen')
  })
})
```

**Example 2: Responsive Behavior**
```typescript
describe('LandingPage Responsive', () => {
  it('displays single column layout on mobile (< 768px)', () => {
    global.innerWidth = 375
    global.dispatchEvent(new Event('resize'))
    
    render(<ProductsSection />)
    const grid = screen.getByTestId('products-grid')
    expect(grid).toHaveClass('grid-cols-1')
  })

  it('displays multi-column layout on desktop (>= 768px)', () => {
    global.innerWidth = 1024
    global.dispatchEvent(new Event('resize'))
    
    render(<ProductsSection />)
    const grid = screen.getByTestId('products-grid')
    expect(grid).toHaveClass('md:grid-cols-2', 'lg:grid-cols-3')
  })
})
```

### Property-Based Test Examples

**Example 1: WhatsApp CTA Behavior (Property 1)**
```typescript
import fc from 'fast-check'

// Feature: landing-page-colchoes, Property 1: WhatsApp CTA Behavior
describe('Property: WhatsApp CTA Behavior', () => {
  it('any CTA button opens WhatsApp with pre-filled message', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('hero', 'product', 'promo', 'final', 'floating'),
        (ctaType) => {
          const { container } = render(<LandingPage />)
          const button = getButtonByType(container, ctaType)
          
          const href = button.getAttribute('href') || button.onclick?.toString()
          
          // Should contain wa.me link
          expect(href).toContain('wa.me')
          // Should contain phone number
          expect(href).toContain(WHATSAPP_NUMBER)
          // Should contain encoded message
          expect(href).toContain('text=')
        }
      ),
      { numRuns: 100 }
    )
  })
})
```

**Example 2: Product Card Completeness (Property 2)**
```typescript
// Feature: landing-page-colchoes, Property 2: Product Card Completeness
describe('Property: Product Card Completeness', () => {
  it('any product card displays all required fields', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.uuid(),
          name: fc.string({ minLength: 1, maxLength: 100 }),
          description: fc.string({ minLength: 10, maxLength: 500 }),
          image: fc.webUrl(),
          rating: fc.integer({ min: 1, max: 5 }),
          highlights: fc.array(fc.string(), { minLength: 1, maxLength: 5 })
        }),
        (product) => {
          render(<ProductCardLanding product={product} />)
          
          // Should display image
          const img = screen.getByRole('img')
          expect(img).toHaveAttribute('src', product.image)
          expect(img).toHaveAttribute('alt', product.name)
          
          // Should display name
          expect(screen.getByText(product.name)).toBeInTheDocument()
          
          // Should display description
          expect(screen.getByText(product.description)).toBeInTheDocument()
          
          // Should display rating (stars)
          const stars = screen.getAllByTestId('star-icon')
          expect(stars).toHaveLength(5)
          
          // Should display CTA button
          const ctaButton = screen.getByRole('button', { name: /consultar no whatsapp/i })
          expect(ctaButton).toBeInTheDocument()
        }
      ),
      { numRuns: 100 }
    )
  })
})
```

**Example 3: Image Accessibility (Property 8)**
```typescript
// Feature: landing-page-colchoes, Property 8: Image Accessibility and Performance
describe('Property: Image Accessibility and Performance', () => {
  it('any image has alt text and proper attributes', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            src: fc.webUrl(),
            alt: fc.string({ minLength: 1 }),
            isBelowFold: fc.boolean()
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (images) => {
          render(<TestImageComponent images={images} />)
          
          images.forEach((img) => {
            const element = screen.getByAltText(img.alt)
            
            // Should have alt attribute
            expect(element).toHaveAttribute('alt', img.alt)
            
            // Should have lazy loading if below fold
            if (img.isBelowFold) {
              expect(element).toHaveAttribute('loading', 'lazy')
            }
            
            // Should maintain aspect ratio (no fixed width/height that distorts)
            const style = window.getComputedStyle(element)
            expect(style.objectFit).toBe('cover' || 'contain')
          })
        }
      ),
      { numRuns: 100 }
    )
  })
})
```

**Example 4: CTA Touch Target Size (Property 9)**
```typescript
// Feature: landing-page-colchoes, Property 9: CTA Touch Target Size
describe('Property: CTA Touch Target Size', () => {
  it('any CTA button meets minimum touch target size', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('hero', 'product', 'promo', 'final', 'floating'),
        (ctaType) => {
          render(<LandingPage />)
          const button = getButtonByType(ctaType)
          
          const rect = button.getBoundingClientRect()
          
          // Minimum 44px x 44px for touch targets
          expect(rect.width).toBeGreaterThanOrEqual(44)
          expect(rect.height).toBeGreaterThanOrEqual(44)
        }
      ),
      { numRuns: 100 }
    )
  })
})
```

**Example 5: Keyboard Accessibility (Property 11)**
```typescript
// Feature: landing-page-colchoes, Property 11: Interactive Element Keyboard Accessibility
describe('Property: Interactive Element Keyboard Accessibility', () => {
  it('any interactive element is keyboard navigable with focus indicator', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('button', 'link'),
        (elementType) => {
          render(<LandingPage />)
          const interactiveElements = elementType === 'button' 
            ? screen.getAllByRole('button')
            : screen.getAllByRole('link')
          
          interactiveElements.forEach((element) => {
            // Should be focusable
            element.focus()
            expect(document.activeElement).toBe(element)
            
            // Should have visible focus indicator (outline or ring)
            const styles = window.getComputedStyle(element)
            const hasFocusIndicator = 
              styles.outline !== 'none' || 
              styles.boxShadow.includes('ring') ||
              element.classList.toString().includes('focus')
            
            expect(hasFocusIndicator).toBe(true)
          })
        }
      ),
      { numRuns: 100 }
    )
  })
})
```

### Test Coverage Goals

- Unit test coverage: Minimum 80% for component logic
- Property test coverage: All 13 correctness properties must have corresponding tests
- Integration test: Full page render without errors
- Accessibility test: Automated axe-core scan with zero violations
- Visual regression: Screenshot comparison for major breakpoints (optional)

### Continuous Integration

Tests should run on:
- Pre-commit hook (fast unit tests only)
- Pull request CI pipeline (all tests including property tests)
- Pre-deployment verification (full test suite + Lighthouse audit)

---

## Implementation Notes

### File Structure

```
src/
├── pages/
│   └── LandingPage.tsx                    # Main landing page component
├── components/
│   └── landing/
│       ├── HeroSection.tsx
│       ├── BenefitsSection.tsx
│       ├── BenefitCard.tsx
│       ├── ProductsSection.tsx
│       ├── ProductCardLanding.tsx
│       ├── SocialProofSection.tsx
│       ├── TestimonialCard.tsx
│       ├── EducationalSection.tsx
│       ├── TipCard.tsx
│       ├── PromotionalBanner.tsx
│       ├── FinalCTASection.tsx
│       ├── FloatingWhatsAppButton.tsx
│       └── LandingFooter.tsx
├── lib/
│   └── config.ts                          # WhatsApp number already configured
└── assets/
    └── images/
        └── landing/
            ├── hero-bedroom.jpg
            ├── product-1.jpg
            ├── product-2.jpg
            ├── product-3.jpg
            └── testimonial-avatars/
```

### Dependencies

No new dependencies required. The project already has:
- React + TypeScript
- Tailwind CSS
- React Router
- Lucide React (for icons)

For testing:
- Install `fast-check` for property-based testing: `npm install -D fast-check`
- Vitest and React Testing Library already configured

### Routing Configuration

Add to `src/App.tsx`:

```typescript
<Route path="/landing" element={<LandingPage />} />
// or
<Route path="/colchoes" element={<LandingPage />} />
```

Note: LandingPage does NOT use the Layout wrapper to avoid showing the standard Navbar/Footer.

### Performance Optimizations

1. **Image Optimization:**
   - Use WebP format with JPEG fallback
   - Implement responsive images with `srcset`
   - Compress images to < 200KB each
   - Use CDN for image delivery (optional)

2. **Code Splitting:**
   - Lazy load sections below the fold using `React.lazy()`
   - Split testimonials and educational content into separate chunks

3. **CSS Optimization:**
   - Tailwind's JIT mode already optimizes unused styles
   - Use `@apply` sparingly to avoid bloat
   - Inline critical CSS for hero section (optional)

4. **JavaScript Optimization:**
   - Minimize use of heavy libraries
   - Use native browser APIs where possible
   - Defer non-critical scripts

### Accessibility Checklist

- [ ] All images have descriptive alt text
- [ ] Color contrast meets WCAG AA standards (4.5:1 for normal text)
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible and clear
- [ ] Semantic HTML5 elements used throughout
- [ ] ARIA labels on icon-only buttons
- [ ] Heading hierarchy is logical (h1 → h2 → h3)
- [ ] Form inputs have associated labels (if any forms added)
- [ ] No content flashing that could trigger seizures
- [ ] Page is navigable with screen reader (test with NVDA/JAWS)

### Browser Compatibility

Target browsers:
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari iOS (last 2 versions)
- Chrome Android (last 2 versions)

Tailwind CSS and React provide excellent cross-browser compatibility out of the box.

### SEO Considerations

While this is a landing page focused on conversion, basic SEO should be implemented:

```typescript
// Add to LandingPage component
useEffect(() => {
  document.title = 'Colchões Premium - Durma Melhor, Viva Melhor'
  
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', 
      'Descubra os melhores colchões para uma noite de sono perfeita. Conforto, tecnologia e garantia. Frete grátis e 100 noites de teste.'
    )
  }
}, [])
```

### Analytics Integration (Optional)

Track key conversion events:
- Hero CTA click
- Product card CTA click
- Promotional banner CTA click
- Final CTA click
- Floating button click
- Scroll depth (25%, 50%, 75%, 100%)

Implementation can use Google Analytics, Meta Pixel, or custom analytics solution.

---

## Design Review Checklist

Before proceeding to implementation, verify:

- [ ] All 14 requirements from requirements.md are addressed in the design
- [ ] Component hierarchy is clear and logical
- [ ] Data models are well-defined with TypeScript interfaces
- [ ] All 13 correctness properties are testable and non-redundant
- [ ] Testing strategy includes both unit and property-based tests
- [ ] Error handling covers common failure scenarios
- [ ] Accessibility requirements are comprehensive
- [ ] Performance considerations are documented
- [ ] File structure is organized and scalable
- [ ] Integration with existing project is seamless

---

**Design Document Status:** Complete and ready for review.

**Next Steps:** 
1. User review and approval of design
2. Task breakdown and implementation planning
3. Component development
4. Test implementation
5. Integration and deployment
