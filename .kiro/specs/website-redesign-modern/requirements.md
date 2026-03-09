# Requirements Document

## Introduction

Esta especificação define os requisitos para redesenhar completamente o website existente (páginas Home, Products, About e componentes compartilhados Navbar/Footer) para aplicar o sistema de design moderno e minimalista já implementado na landing page. O objetivo é criar uma experiência visual consistente em todo o site, mantendo toda a funcionalidade existente (catálogo de produtos, painel admin, autenticação) enquanto moderniza a interface com foco em conversão, usabilidade e estética contemporânea.

O redesign aplicará: paleta de cores azul/branco/bege/cinza, tipografia sans-serif moderna, espaçamento generoso, integração WhatsApp em pontos estratégicos, design responsivo mobile-first, e componentes reutilizáveis alinhados com o sistema de design da landing page.

## Glossary

- **Modern_Design_System**: Sistema de design minimalista com paleta azul/branco/bege/cinza, tipografia moderna, espaçamento generoso
- **Home_Page**: Página principal do site em `/` com hero section, produtos em destaque e preview sobre a empresa
- **Products_Page**: Página de catálogo de produtos em `/produtos` com grid de produtos e modal de detalhes
- **About_Page**: Página sobre a empresa em `/sobre` com história, missão, visão e valores
- **Navbar**: Componente de navegação superior compartilhado entre todas as páginas
- **Footer**: Componente de rodapé compartilhado entre todas as páginas
- **WhatsApp_CTA**: Call-to-Action button que abre conversa no WhatsApp com mensagem pré-preenchida
- **Product_Card**: Componente que exibe informações de um produto no grid
- **Product_Modal**: Modal que exibe detalhes completos de um produto
- **Responsive_Layout**: Layout que se adapta a diferentes tamanhos de tela (mobile, tablet, desktop)
- **Legacy_Design**: Design atual com gradiente roxo, navbar cinza escuro e estilo básico
- **Supabase_Integration**: Integração existente com banco de dados Supabase para produtos

## Requirements

### Requirement 1: Navbar Redesign

**User Story:** Como visitante navegando pelo site, quero uma barra de navegação moderna e limpa que reflita o novo design system, para que eu tenha uma experiência visual consistente e profissional.

#### Acceptance Criteria

1. THE Navbar SHALL use a white or light background instead of dark gray
2. THE Navbar SHALL use the Modern_Design_System color palette (blue for active links, gray for text)
3. THE Navbar SHALL display the logo/brand name with modern typography
4. THE Navbar SHALL display navigation links for Home, Products, About
5. THE Navbar SHALL include a WhatsApp_CTA button with icon in the desktop menu
6. THE Navbar SHALL maintain sticky positioning at the top of the viewport
7. WHEN the viewport width is less than 768px, THE Navbar SHALL display a mobile hamburger menu
8. THE Navbar SHALL use smooth transitions for hover states and mobile menu animations
9. THE Navbar SHALL maintain adequate spacing and padding following the Modern_Design_System
10. THE Navbar SHALL hide the Admin link from public navigation (accessible only via direct URL)

### Requirement 2: Footer Redesign

**User Story:** Como visitante que chegou ao final de uma página, quero um rodapé informativo e bem estruturado que forneça informações de contato e links úteis, para que eu possa facilmente encontrar formas de entrar em contato ou navegar para outras seções.

#### Acceptance Criteria

1. THE Footer SHALL use a dark background (gray-900 or similar) with light text for contrast
2. THE Footer SHALL display company information in a multi-column layout on desktop
3. THE Footer SHALL include a section with company address and contact information
4. THE Footer SHALL include a section with social media links or placeholders
5. THE Footer SHALL include a WhatsApp_CTA button or link
6. THE Footer SHALL display copyright information
7. WHEN the viewport width is less than 768px, THE Footer SHALL stack sections vertically
8. THE Footer SHALL use icons from lucide-react for visual enhancement
9. THE Footer SHALL maintain consistent spacing with the Modern_Design_System
10. THE Footer SHALL match the visual style of the landing page footer

### Requirement 3: Home Page Hero Section Redesign

**User Story:** Como visitante chegando ao site pela primeira vez, quero ver uma hero section moderna e impactante que comunique claramente a proposta de valor, para que eu entenda imediatamente o que a empresa oferece e me sinta atraído a explorar mais.

#### Acceptance Criteria

1. THE Home_Page SHALL replace the purple gradient hero with a modern design using the Modern_Design_System colors
2. THE Home_Page hero SHALL use a high-quality background image or clean color background
3. THE Home_Page hero SHALL display a compelling headline about sleep quality and comfort
4. THE Home_Page hero SHALL display a subtitle highlighting key benefits
5. THE Home_Page hero SHALL include a primary WhatsApp_CTA button with icon
6. THE Home_Page hero SHALL include a secondary button linking to the Products_Page
7. THE Home_Page hero SHALL use modern typography with appropriate font sizes and weights
8. THE Home_Page hero SHALL maintain adequate white space and padding
9. WHEN the viewport width is less than 768px, THE Home_Page hero SHALL adjust text sizes and button layouts for mobile
10. THE Home_Page hero SHALL use subtle animations or transitions for visual appeal (optional)

### Requirement 4: Home Page Featured Products Section Redesign

**User Story:** Como visitante interessado em produtos, quero ver produtos em destaque apresentados de forma atraente e moderna, para que eu possa rapidamente identificar opções interessantes e navegar para mais detalhes.

#### Acceptance Criteria

1. THE Home_Page featured products section SHALL use the Modern_Design_System styling
2. THE Home_Page SHALL display the section title with modern typography
3. THE Home_Page SHALL display Product_Card components with updated styling matching the landing page design
4. THE Product_Card SHALL include product image with rounded corners and shadow
5. THE Product_Card SHALL display product name, description, and price with modern typography
6. THE Product_Card SHALL include a WhatsApp_CTA button for direct inquiry
7. THE Product_Card SHALL use hover effects with smooth transitions
8. THE Home_Page SHALL maintain the existing Supabase_Integration for loading featured products
9. WHEN no featured products exist, THE Home_Page SHALL display an empty state with modern styling
10. WHEN products are loading, THE Home_Page SHALL display a modern loading spinner

### Requirement 5: Home Page About Preview Section Redesign

**User Story:** Como visitante querendo conhecer mais sobre a empresa, quero ver uma prévia atraente da seção sobre que me incentive a clicar para saber mais, para que eu possa decidir se quero conhecer melhor a empresa.

#### Acceptance Criteria

1. THE Home_Page about preview section SHALL use a light background (gray-50 or beige-50) instead of gray-100
2. THE Home_Page about preview SHALL display a section title with modern typography
3. THE Home_Page about preview SHALL display descriptive text with appropriate line height and spacing
4. THE Home_Page about preview SHALL include a CTA button linking to the About_Page
5. THE Home_Page about preview SHALL use the Modern_Design_System color palette for buttons and text
6. THE Home_Page about preview SHALL maintain adequate padding and spacing
7. WHEN the viewport width is less than 768px, THE Home_Page about preview SHALL adjust text sizes appropriately

### Requirement 6: Products Page Redesign

**User Story:** Como visitante procurando por produtos, quero ver um catálogo moderno e organizado que facilite a visualização e comparação de produtos, para que eu possa encontrar o colchão ideal para minhas necessidades.

#### Acceptance Criteria

1. THE Products_Page SHALL use the Modern_Design_System styling throughout
2. THE Products_Page SHALL display a page title with modern typography
3. THE Products_Page SHALL display products in a responsive grid layout
4. THE Product_Card SHALL use updated styling matching the Modern_Design_System
5. THE Product_Card SHALL include a WhatsApp_CTA button for direct product inquiry
6. THE Product_Card SHALL display product availability status with modern badges
7. THE Products_Page SHALL maintain the existing Supabase_Integration for loading products
8. THE Products_Page SHALL maintain the existing Product_Modal functionality
9. WHEN a product is clicked, THE Products_Page SHALL open the Product_Modal with updated styling
10. WHEN no products exist, THE Products_Page SHALL display an empty state with modern styling
11. WHEN products are loading, THE Products_Page SHALL display a modern loading spinner

### Requirement 7: Product Modal Redesign

**User Story:** Como visitante interessado em um produto específico, quero ver detalhes completos em um modal moderno e bem estruturado, para que eu possa tomar uma decisão informada e facilmente entrar em contato.

#### Acceptance Criteria

1. THE Product_Modal SHALL use the Modern_Design_System styling
2. THE Product_Modal SHALL display product image with modern styling and rounded corners
3. THE Product_Modal SHALL display product name, description, and price with modern typography
4. THE Product_Modal SHALL include a prominent WhatsApp_CTA button for product inquiry
5. THE Product_Modal SHALL include a close button with modern icon and styling
6. THE Product_Modal SHALL use a backdrop overlay with appropriate opacity
7. THE Product_Modal SHALL use smooth open/close animations
8. WHEN the WhatsApp_CTA is clicked, THE Product_Modal SHALL open WhatsApp with a pre-filled message including the product name
9. WHEN the viewport width is less than 768px, THE Product_Modal SHALL adjust layout for mobile viewing
10. THE Product_Modal SHALL maintain all existing functionality while updating visual design

### Requirement 8: About Page Redesign

**User Story:** Como visitante querendo conhecer a empresa, quero ver informações sobre história, missão, visão e valores apresentadas de forma moderna e visualmente atraente, para que eu possa entender melhor a empresa e seus valores.

#### Acceptance Criteria

1. THE About_Page SHALL use the Modern_Design_System styling throughout
2. THE About_Page SHALL display a page title with modern typography
3. THE About_Page SHALL display information cards for História, Missão, Visão, and Valores
4. THE About_Page information cards SHALL use modern card styling with subtle shadows and rounded corners
5. THE About_Page information cards SHALL use the Modern_Design_System color palette for accents
6. THE About_Page SHALL include icons from lucide-react to enhance visual communication
7. THE About_Page SHALL display a contact section with WhatsApp_CTA button
8. THE About_Page contact section SHALL use modern styling and prominent placement
9. WHEN the viewport width is less than 768px, THE About_Page SHALL stack cards vertically
10. THE About_Page SHALL maintain adequate spacing and white space throughout

### Requirement 9: WhatsApp Integration Enhancement

**User Story:** Como visitante pronto para fazer contato, quero ter múltiplos pontos de acesso ao WhatsApp em todo o site, para que eu possa facilmente iniciar uma conversa independente de onde estou navegando.

#### Acceptance Criteria

1. THE Navbar SHALL include a WhatsApp_CTA button visible on desktop
2. THE Footer SHALL include a WhatsApp_CTA button or link
3. THE Home_Page hero SHALL include a WhatsApp_CTA button
4. THE Product_Card SHALL include a WhatsApp_CTA button for product-specific inquiries
5. THE Product_Modal SHALL include a WhatsApp_CTA button with product context
6. THE About_Page SHALL include a WhatsApp_CTA button in the contact section
7. WHEN any WhatsApp_CTA is clicked, THE system SHALL open WhatsApp with an appropriate pre-filled message
8. WHEN a product-specific WhatsApp_CTA is clicked, THE system SHALL include the product name in the message
9. THE WhatsApp_CTA buttons SHALL use consistent styling across all pages
10. THE WhatsApp_CTA buttons SHALL use the green WhatsApp brand color (#25D366) or similar

### Requirement 10: Typography System

**User Story:** Como visitante lendo conteúdo no site, quero que todo o texto seja legível, hierarquicamente organizado e visualmente agradável, para que eu possa facilmente consumir informações sem esforço.

#### Acceptance Criteria

1. THE website SHALL use modern sans-serif fonts (system fonts or Google Fonts)
2. THE website SHALL define a clear typographic hierarchy (h1, h2, h3, body, small)
3. THE website SHALL use font sizes appropriate for each heading level
4. THE website SHALL use appropriate font weights (bold for headings, regular for body)
5. THE website SHALL use adequate line height for readability (1.5 to 1.8 for body text)
6. THE website SHALL use appropriate letter spacing for headings
7. THE website SHALL ensure text color contrast meets WCAG AA standards
8. WHEN the viewport width is less than 768px, THE website SHALL adjust font sizes for mobile readability
9. THE website SHALL use consistent typography across all pages
10. THE website SHALL match the typography style of the landing page

### Requirement 11: Color Palette Application

**User Story:** Como visitante navegando pelo site, quero ver uma paleta de cores consistente e moderna que transmita conforto e profissionalismo, para que eu tenha uma experiência visual coesa e agradável.

#### Acceptance Criteria

1. THE website SHALL use blue as the primary brand color (similar to landing page)
2. THE website SHALL use white as the primary background color
3. THE website SHALL use light gray (gray-50, gray-100) for secondary backgrounds
4. THE website SHALL use beige or warm neutrals for accent sections
5. THE website SHALL use dark gray (gray-800, gray-900) for text and dark sections
6. THE website SHALL use green (#25D366) specifically for WhatsApp_CTA buttons
7. THE website SHALL remove all purple gradient styling from the Legacy_Design
8. THE website SHALL use subtle shadows and borders instead of heavy gradients
9. THE website SHALL maintain color consistency across all pages
10. THE website SHALL match the color palette of the landing page

### Requirement 12: Spacing and Layout System

**User Story:** Como visitante navegando pelo site, quero que todos os elementos tenham espaçamento adequado e respirem visualmente, para que eu tenha uma experiência de leitura confortável e não me sinta sobrecarregado.

#### Acceptance Criteria

1. THE website SHALL use consistent spacing units (4px, 8px, 16px, 24px, 32px, 48px, 64px)
2. THE website SHALL use generous padding within sections (py-16 or py-20 for major sections)
3. THE website SHALL use adequate margins between elements
4. THE website SHALL use max-width containers (max-w-7xl or similar) to prevent excessive stretching
5. THE website SHALL use appropriate gap spacing in grid layouts (gap-6, gap-8)
6. THE website SHALL maintain adequate white space around text blocks
7. THE website SHALL use consistent border radius for cards and buttons (rounded-lg, rounded-xl)
8. WHEN the viewport width is less than 768px, THE website SHALL adjust spacing for mobile devices
9. THE website SHALL avoid cramped layouts and ensure visual breathing room
10. THE website SHALL match the spacing system of the landing page

### Requirement 13: Responsive Design Consistency

**User Story:** Como visitante acessando o site de diferentes dispositivos, quero que todas as páginas se adaptem perfeitamente ao meu tamanho de tela, para que eu tenha uma experiência otimizada independente do dispositivo.

#### Acceptance Criteria

1. THE website SHALL implement mobile-first Responsive_Layout approach
2. WHEN the viewport width is less than 768px, THE website SHALL display single-column layouts
3. WHEN the viewport width is 768px or greater, THE website SHALL display multi-column layouts where appropriate
4. THE website SHALL ensure all images scale proportionally on different screen sizes
5. THE website SHALL ensure all text remains readable on screens from 320px to 1920px width
6. THE website SHALL ensure all buttons remain easily tappable on mobile (minimum 44px touch target)
7. THE Navbar SHALL adapt to mobile with hamburger menu
8. THE Footer SHALL stack sections vertically on mobile
9. THE website SHALL test responsive behavior at common breakpoints (320px, 375px, 768px, 1024px, 1920px)
10. THE website SHALL match the responsive behavior of the landing page

### Requirement 14: Component Styling Consistency

**User Story:** Como visitante navegando entre diferentes páginas, quero que componentes similares (botões, cards, inputs) tenham aparência e comportamento consistentes, para que eu tenha uma experiência previsível e coesa.

#### Acceptance Criteria

1. THE website SHALL use consistent button styling across all pages
2. THE website SHALL use consistent card styling across all pages
3. THE website SHALL use consistent hover effects and transitions
4. THE website SHALL use consistent loading spinner styling
5. THE website SHALL use consistent empty state messaging and styling
6. THE website SHALL use consistent icon sizing and styling
7. THE website SHALL use consistent form input styling (if applicable)
8. THE website SHALL use consistent modal/dialog styling
9. THE website SHALL define reusable CSS classes or Tailwind utilities for common patterns
10. THE website SHALL match component styling with the landing page components

### Requirement 15: Animation and Interaction

**User Story:** Como visitante interagindo com o site, quero que transições e animações sejam suaves e sutis, para que eu tenha uma experiência moderna e polida sem distrações excessivas.

#### Acceptance Criteria

1. THE website SHALL use smooth transitions for hover states (transition-colors, transition-transform)
2. THE website SHALL use smooth transitions for modal open/close animations
3. THE website SHALL use smooth transitions for mobile menu open/close
4. THE website SHALL use subtle scale or shadow effects on card hover
5. THE website SHALL use smooth scroll behavior for anchor links (optional)
6. THE website SHALL avoid jarring or excessive animations
7. THE website SHALL use consistent transition durations (150ms, 200ms, 300ms)
8. THE website SHALL respect user preferences for reduced motion (prefers-reduced-motion)
9. THE website SHALL ensure animations do not impact performance
10. THE website SHALL match the animation style of the landing page

### Requirement 16: Accessibility Compliance

**User Story:** Como visitante com necessidades de acessibilidade, quero que todas as páginas redesenhadas sejam navegáveis e compreensíveis usando tecnologias assistivas, para que eu possa acessar todas as informações e funcionalidades.

#### Acceptance Criteria

1. THE website SHALL provide alternative text for all images
2. THE website SHALL maintain color contrast ratio of at least 4.5:1 for normal text
3. THE website SHALL maintain color contrast ratio of at least 3:1 for large text
4. THE website SHALL support keyboard navigation for all interactive elements
5. THE website SHALL provide visible focus indicators for all interactive elements
6. THE website SHALL use semantic HTML elements appropriately (header, nav, main, section, footer)
7. THE website SHALL include ARIA labels where necessary for screen reader compatibility
8. THE website SHALL maintain logical heading hierarchy (h1 → h2 → h3)
9. THE website SHALL ensure all forms have associated labels (if applicable)
10. THE website SHALL match the accessibility standards of the landing page

### Requirement 17: Performance Optimization

**User Story:** Como visitante com conexão de internet variável, quero que todas as páginas carreguem rapidamente, para que eu não abandone o site por lentidão.

#### Acceptance Criteria

1. THE website SHALL load above-the-fold content within 2 seconds on a 3G connection
2. THE website SHALL implement lazy loading for images below the fold
3. THE website SHALL optimize all images for web delivery
4. THE website SHALL minimize CSS and JavaScript bundle sizes
5. THE website SHALL avoid layout shifts during page load (CLS optimization)
6. THE website SHALL use efficient Tailwind CSS purging to remove unused styles
7. THE website SHALL maintain existing Supabase_Integration performance
8. THE website SHALL avoid unnecessary re-renders in React components
9. THE website SHALL achieve a Lighthouse performance score of at least 85
10. THE website SHALL match or exceed the performance of the landing page

### Requirement 18: Backward Compatibility

**User Story:** Como administrador do site, quero que todas as funcionalidades existentes continuem funcionando após o redesign, para que eu não perca capacidades importantes do sistema.

#### Acceptance Criteria

1. THE website SHALL maintain all existing Supabase_Integration functionality
2. THE website SHALL maintain the admin panel functionality and access
3. THE website SHALL maintain the authentication system functionality
4. THE website SHALL maintain the product CRUD operations in the admin panel
5. THE website SHALL maintain the product filtering and display logic
6. THE website SHALL maintain the featured products functionality
7. THE website SHALL maintain the product stock status display
8. THE website SHALL maintain all existing routing and navigation
9. THE website SHALL maintain the Product_Modal functionality
10. THE website SHALL only update visual design and styling, not core business logic
