# Design Document: Website Redesign Modern

## Overview

This design document specifies the complete redesign of the existing website (Home, Products, About pages and shared Navbar/Footer components) to apply the modern, minimalist design system already implemented in the landing page. The redesign will transform the current purple gradient aesthetic into a clean, contemporary interface using a blue/white/beige/gray color palette with generous spacing, modern typography, and strategic WhatsApp integration.

The architecture prioritizes:
- Visual consistency with the existing landing page design system
- Backward compatibility - maintaining all existing functionality (Supabase integration, admin panel, authentication)
- Component reusability and modern React patterns
- Mobile-first responsive design
- Accessibility compliance (WCAG 2.1 AA)
- Performance optimization through lazy loading and efficient rendering

This is a visual redesign that updates styling and user experience while preserving all business logic, database integrations, and administrative features.

## Architecture

### Component Hierarchy

```
App (src/App.tsx)
├── Layout (src/components/Layout.tsx)
│   ├── Navbar (REDESIGNED)
│   ├── Outlet (page content)
│   └── Footer (REDESIGNED)
│
├── Home Page (REDESIGNED)
│   ├── HeroSection (new component)
│   ├── FeaturedProductsSection
│   │   └── ProductCard (REDESIGNED)
│   └── AboutPreviewSection (redesigned)
│
├── Products Page (REDESIGNED)
│   ├── ProductCard (REDESIGNED)
│   └── ProductModal (REDESIGNED)
│
├── About Page (REDESIGNED)
│   ├── InfoCard (new component)
│   └── ContactSection
│
├── Admin Page (UNCHANGED - styling only)
└── Login Page (UNCHANGED - styling only)
```

### Design System Integration

The redesign applies the Modern_Design_System established in the landing page:

**Color Palette:**
- Primary: Blue-600 (#2563eb)
- Background: White (#ffffff)
- Secondary Background: Gray-50 (#f9fafb), Beige-50
- Text: Gray-900 (#111827), Gray-600 (#4b5563)
- WhatsApp: Green-500 (#22c55e)
- Dark Sections: Gray-900 (#111827)

**Typography:**
- Font Family: System sans-serif stack (similar to landing page)
- Heading Hierarchy: text-4xl/5xl/6xl for h1, text-3xl for h2, text-2xl for h3
- Body: text-base with line-height 1.6-1.8
- Font Weights: bold (700) for headings, semibold (600) for emphasis, regular (400) for body

**Spacing System:**
- Section Padding: py-16 or py-20
- Container Max Width: max-w-7xl
- Grid Gaps: gap-6 or gap-8
- Border Radius: rounded-lg (8px) or rounded-xl (12px)

**Component Patterns:**
- Cards: white background, subtle shadow, rounded corners
- Buttons: consistent sizing, hover effects, smooth transitions
- Images: rounded corners, lazy loading, fallback handling

### State Management

No changes to existing state management. The redesign maintains:
- Local component state for UI interactions (modals, mobile menu)
- Supabase integration for product data
- React Router for navigation
- Existing authentication state management

## Components and Interfaces

### 1. Navbar (Redesigned)

**Location:** `src/components/Navbar.tsx`

**Responsability:** Primary navigation with modern light design, WhatsApp CTA, and mobile menu.

**Props:** None

**Key Changes from Current:**
- Background: `bg-gray-800` → `bg-white` with `border-b border-gray-200`
- Text Color: `text-white` → `text-gray-900`
- Active/Hover: Blue accent instead of purple
- Add WhatsApp CTA button (desktop only)
- Hide Admin link from public navigation
- Maintain sticky positioning and mobile hamburger menu

**Interface:**
```typescript
// No props interface needed - component uses internal state only
```

**Structure:**
```typescript
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleWhatsAppClick = () => {
    openWhatsApp('Olá! Gostaria de mais informações sobre os colchões.')
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            ColchõesTop
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" />
            <NavLink to="/produtos" />
            <NavLink to="/sobre" />
            <button onClick={handleWhatsAppClick} className="btn btn-whatsapp">
              <MessageCircle size={20} />
              WhatsApp
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {/* Mobile navigation links */}
          </div>
        )}
      </div>
    </nav>
  )
}
```

### 2. Footer (Redesigned)

**Location:** `src/components/Footer.tsx`

**Responsibility:** Rich footer with company information, contact details, social links, and WhatsApp CTA.

**Props:** None

**Key Changes from Current:**
- Expand from simple copyright to multi-column layout
- Match LandingFooter design pattern
- Include contact information with icons
- Add social media links
- Add WhatsApp CTA
- Maintain dark background (gray-900)

**Structure:**
```typescript
export default function Footer() {
  const handleWhatsAppClick = () => {
    openWhatsApp('Olá! Gostaria de mais informações.')
  }

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">ColchõesTop</h3>
            <p className="mb-4">
              Especialistas em sono há mais de 20 anos.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Links Rápidos</h3>
            {/* Navigation links */}
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Contato</h3>
            {/* Contact information with icons */}
          </div>
          
          {/* Social & WhatsApp */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Redes Sociais</h3>
            {/* Social icons */}
            <button onClick={handleWhatsAppClick} className="btn btn-whatsapp mt-4">
              <MessageCircle size={20} />
              Falar no WhatsApp
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} ColchõesTop. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
```

### 3. Home Page - HeroSection (New Component)

**Location:** `src/components/home/HeroSection.tsx`

**Responsibility:** Modern hero section replacing purple gradient with clean design and dual CTAs.

**Props:** None

**Key Changes:**
- Remove purple gradient background
- Use clean background image or solid color with modern design
- Add primary WhatsApp CTA
- Add secondary "Ver Produtos" CTA
- Modern typography with better hierarchy
- Maintain full viewport height

**Structure:**
```typescript
export default function HeroSection() {
  const handleWhatsAppClick = () => {
    openWhatsApp('Olá! Vim do site e gostaria de saber mais sobre os colchões.')
  }

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
          Durma Melhor, Viva Melhor
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-600">
          Colchões de alta qualidade para o seu conforto e bem-estar
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleWhatsAppClick}
            className="btn btn-whatsapp text-lg px-8 py-4"
          >
            <MessageCircle className="w-6 h-6" />
            Falar no WhatsApp
          </button>
          
          <Link
            to="/produtos"
            className="btn btn-primary text-lg px-8 py-4"
          >
            Ver Produtos
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  )
}
```

### 4. ProductCard (Redesigned)

**Location:** `src/components/ProductCard.tsx`

**Responsibility:** Display product information with modern styling and WhatsApp CTA.

**Props:**
```typescript
interface ProductCardProps {
  produto: Produto
  onClick?: () => void
}
```

**Key Changes:**
- Add WhatsApp CTA button
- Update card styling to match landing page ProductCardLanding
- Add hover effects with smooth transitions
- Improve image handling with rounded corners
- Better badge styling for promotions and stock status
- Maintain all existing functionality (click handler, price display, badges)

**Structure:**
```typescript
export default function ProductCard({ produto, onClick }: ProductCardProps) {
  const hasPromo = produto.promocao && produto.preco_promocional
  const outOfStock = !produto.estoque

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    openWhatsApp(`Olá! Tenho interesse no colchão ${produto.nome}. Gostaria de mais informações.`)
  }

  return (
    <div
      className="card cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative w-full h-64 bg-gray-200">
        <img
          src={produto.imagem || 'https://via.placeholder.com/300x250?text=Sem+Imagem'}
          alt={produto.nome}
          className="w-full h-full object-cover rounded-t-lg"
          loading="lazy"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{produto.nome}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{produto.descricao}</p>
        
        {/* Price display */}
        <div className="flex items-center gap-3 mb-3">
          {/* Existing price logic */}
        </div>

        {/* Badges */}
        <div className="flex gap-2 mb-4">
          {hasPromo && <span className="badge badge-promo">PROMOÇÃO</span>}
          {outOfStock && <span className="badge badge-out">FORA DE ESTOQUE</span>}
        </div>

        {/* WhatsApp CTA */}
        {!outOfStock && (
          <button
            onClick={handleWhatsAppClick}
            className="btn btn-whatsapp w-full justify-center"
          >
            <MessageCircle className="w-5 h-5" />
            Consultar no WhatsApp
          </button>
        )}
      </div>
    </div>
  )
}
```

### 5. ProductModal (Redesigned)

**Location:** `src/components/ProductModal.tsx`

**Responsibility:** Display full product details in modern modal with WhatsApp CTA.

**Props:**
```typescript
interface ProductModalProps {
  produto: Produto
  onClose: () => void
}
```

**Key Changes:**
- Update modal styling to match modern design system
- Enhance WhatsApp CTA button prominence
- Improve image display with rounded corners
- Better spacing and typography
- Smooth animations for open/close
- Maintain all existing functionality (color/size selection, close handler)

**Structure:**
```typescript
export default function ProductModal({ produto, onClose }: ProductModalProps) {
  const [selectedColor, setSelectedColor] = useState(produto.cores[0] || '')
  const [selectedSize, setSelectedSize] = useState(produto.tamanhos[0] || '')

  const handleWhatsApp = () => {
    const message = `Olá, tenho interesse no colchão ${produto.nome}.
Cor: ${selectedColor}
Tamanho: ${selectedSize}.
Poderia me passar mais informações?`
    openWhatsApp(message)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header with close button */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">{produto.nome}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div>
            <img
              src={produto.imagem || 'https://via.placeholder.com/400x400?text=Sem+Imagem'}
              alt={produto.nome}
              className="w-full rounded-xl shadow-md"
            />
          </div>

          {/* Details */}
          <div>
            <p className="text-gray-600 mb-6 leading-relaxed">{produto.descricao}</p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              {/* Existing price logic */}
            </div>

            {/* Color and Size selectors */}
            <div className="space-y-4 mb-6">
              {/* Existing selectors with updated styling */}
            </div>

            {/* WhatsApp CTA */}
            <button 
              onClick={handleWhatsApp} 
              className="btn btn-whatsapp w-full justify-center text-lg py-4"
            >
              <MessageCircle size={24} />
              Falar com Vendedor no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 6. Home Page (Redesigned)

**Location:** `src/pages/Home.tsx`

**Responsibility:** Main landing page with hero, featured products, and about preview.

**Props:** None

**Key Changes:**
- Extract hero section to separate HeroSection component
- Update featured products section styling
- Update about preview section styling (gray-100 → gray-50 or beige-50)
- Add WhatsApp CTAs where appropriate
- Maintain all existing Supabase integration and loading states

**Structure:**
```typescript
export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)

  // Existing loadFeaturedProducts logic unchanged

  return (
    <div>
      {/* Hero Section - New Component */}
      <HeroSection />

      {/* Featured Products - Redesigned */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Produtos em Destaque
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Conheça nossos colchões mais populares
          </p>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Nenhum produto em destaque no momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((produto) => (
                <ProductCard
                  key={produto.id}
                  produto={produto}
                  onClick={() => (window.location.href = '/produtos')}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Preview - Redesigned */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Sobre Nossa Loja</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Há mais de 20 anos oferecendo os melhores colchões para garantir noites de sono
            perfeitas. Qualidade, conforto e atendimento personalizado.
          </p>
          <Link to="/sobre" className="btn btn-primary text-lg">
            Saiba Mais
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
```

### 7. Products Page (Redesigned)

**Location:** `src/pages/Products.tsx`

**Responsibility:** Product catalog with grid layout and modal.

**Props:** None

**Key Changes:**
- Update page title styling
- Update grid layout styling
- Use redesigned ProductCard component
- Use redesigned ProductModal component
- Update loading spinner styling
- Update empty state styling
- Maintain all existing Supabase integration

**Structure:**
```typescript
export default function Products() {
  const [products, setProducts] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null)

  // Existing loadProducts logic unchanged

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 text-gray-900">
          Nossos Produtos
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Encontre o colchão perfeito para suas necessidades
        </p>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Nenhum produto disponível no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((produto) => (
              <ProductCard
                key={produto.id}
                produto={produto}
                onClick={() => produto.estoque && setSelectedProduct(produto)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          produto={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
```

### 8. About Page (Redesigned)

**Location:** `src/pages/About.tsx`

**Responsibility:** Company information with modern card layout.

**Props:** None

**Key Changes:**
- Update page title styling
- Update information cards with modern styling (shadows, rounded corners, icons)
- Add icons from lucide-react for visual enhancement
- Update contact section with prominent WhatsApp CTA
- Improve spacing and typography
- Maintain all existing content

**Structure:**
```typescript
export default function About() {
  const handleWhatsAppClick = () => {
    openWhatsApp('Olá, gostaria de mais informações sobre os colchões.')
  }

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 text-gray-900">
          Sobre Nós
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Conheça nossa história e valores
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* História Card */}
          <div className="card p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Nossa História</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Fundada em 2004, a ColchõesTop nasceu do sonho de proporcionar noites de sono
              perfeitas para todas as famílias. Começamos como uma pequena loja e hoje somos
              referência em qualidade e atendimento personalizado.
            </p>
          </div>

          {/* Missão Card */}
          <div className="card p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Missão</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Oferecer colchões de alta qualidade que proporcionem conforto, saúde e bem-estar,
              garantindo noites de sono reparadoras para nossos clientes.
            </p>
          </div>

          {/* Visão Card */}
          <div className="card p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Visão</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Ser a loja de colchões mais confiável e reconhecida pela excelência em produtos e
              atendimento, expandindo nossa presença e impactando positivamente a qualidade de
              vida das pessoas.
            </p>
          </div>

          {/* Valores Card */}
          <div className="card p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Valores</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Qualidade em primeiro lugar
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Atendimento personalizado
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Transparência e honestidade
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Compromisso com o cliente
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Inovação constante
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="card p-12 text-center bg-gradient-to-br from-blue-50 to-white">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Entre em Contato</h2>
          <p className="text-gray-700 mb-6 text-lg">
            Tem alguma dúvida? Fale conosco pelo WhatsApp!
          </p>
          <button onClick={handleWhatsAppClick} className="btn btn-whatsapp text-lg px-8 py-4">
            <MessageCircle size={24} />
            Falar no WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}
```

## Data Models

### Produto Interface (Existing - No Changes)

```typescript
interface Produto {
  id: string
  nome: string
  descricao: string
  preco: number
  preco_promocional: number | null
  promocao: boolean
  imagem: string | null
  cores: string[]
  tamanhos: string[]
  estoque: boolean
  destaque: boolean
  created_at: string
}
```

**Source:** Supabase database table `produtos`

**Usage:** All product-related components (ProductCard, ProductModal, Home, Products pages)

### WhatsApp Message Templates

```typescript
const WHATSAPP_MESSAGES = {
  navbar: 'Olá! Gostaria de mais informações sobre os colchões.',
  footer: 'Olá! Gostaria de mais informações.',
  hero: 'Olá! Vim do site e gostaria de saber mais sobre os colchões.',
  product: (productName: string) => 
    `Olá! Tenho interesse no colchão ${productName}. Gostaria de mais informações.`,
  productModal: (productName: string, color: string, size: string) =>
    `Olá, tenho interesse no colchão ${productName}.\nCor: ${color}\nTamanho: ${size}.\nPoderia me passar mais informações?`,
  about: 'Olá, gostaria de mais informações sobre os colchões.'
}
```

**Source:** Defined in components or centralized in `src/lib/whatsapp.ts`

**Usage:** All WhatsApp CTA buttons across the website

## Data Models

