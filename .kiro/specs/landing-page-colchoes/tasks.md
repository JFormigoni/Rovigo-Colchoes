# Implementation Plan: Landing Page de Colchões

## Overview

Este plano detalha a implementação da landing page de colchões como uma nova rota no projeto React existente. A implementação seguirá uma abordagem incremental, construindo componentes de forma modular, integrando funcionalidades WhatsApp, e validando através de testes unitários e baseados em propriedades.

A implementação utilizará a stack atual do projeto: React + TypeScript + Tailwind CSS + Vite, com integração ao React Router para roteamento.

## Tasks

- [x] 1. Setup inicial e estrutura de arquivos
  - Criar estrutura de diretórios para componentes da landing page
  - Criar arquivo principal `src/pages/LandingPage.tsx`
  - Criar diretório `src/components/landing/` para componentes específicos
  - Adicionar rota `/landing` no `src/App.tsx` sem o Layout wrapper
  - _Requirements: 1.1-1.7, 9.1-9.6_

- [x] 2. Implementar utilitário de integração WhatsApp
  - [x] 2.1 Criar função helper `openWhatsApp` em `src/lib/whatsapp.ts`
    - Implementar formatação de URL WhatsApp com número e mensagem
    - Implementar encoding correto de mensagens para URL
    - Criar templates de mensagens para diferentes CTAs
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_
  
  - [x] 2.2 Escrever teste de propriedade para formato de link WhatsApp
    - **Property 7: WhatsApp Link Format**
    - **Valida: Requirements 12.3**
    - Testar que qualquer mensagem gerada segue formato correto
    - Testar encoding de caracteres especiais

- [x] 3. Implementar HeroSection
  - [x] 3.1 Criar componente `src/components/landing/HeroSection.tsx`
    - Implementar layout full viewport height com imagem de fundo
    - Adicionar overlay para legibilidade do texto
    - Implementar headline e subtitle responsivos
    - Adicionar botão CTA principal com ícone WhatsApp
    - Integrar função `openWhatsApp` com mensagem do hero
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_
  
  - [x] 3.2 Escrever testes unitários para HeroSection
    - Testar renderização de headline e subtitle
    - Testar presença de botão CTA com texto correto
    - Testar classe min-h-screen aplicada
    - _Requirements: 1.1-1.6_

- [x] 4. Implementar BenefitsSection e BenefitCard
  - [x] 4.1 Criar componente `src/components/landing/BenefitCard.tsx`
    - Implementar interface `Benefit` com icon, title, description
    - Criar card visual com ícone e texto
    - Aplicar estilos Tailwind para layout responsivo
    - _Requirements: 2.6_
  
  - [x] 4.2 Criar componente `src/components/landing/BenefitsSection.tsx`
    - Definir array de 4 benefícios (conforto, suporte, garantia, entrega)
    - Implementar grid responsivo (1 col mobile, 2-4 cols desktop)
    - Renderizar BenefitCard para cada benefício
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_
  
  - [x] 4.3 Escrever teste de propriedade para estrutura de benefícios
    - **Property 4: Benefit Item Structure**
    - **Valida: Requirements 2.6**
    - Testar que qualquer benefício renderiza ícone e descrição

- [x] 5. Implementar ProductsSection e ProductCardLanding
  - [x] 5.1 Criar interface `ProductLanding` em `src/types/landing.ts`
    - Definir tipos: id, name, description, image, rating, highlights
    - _Requirements: 3.2, 3.3, 3.4, 3.5_
  
  - [x] 5.2 Criar componente `src/components/landing/ProductCardLanding.tsx`
    - Implementar card com imagem, nome, descrição, rating
    - Adicionar botão CTA "Consultar no WhatsApp"
    - Integrar `openWhatsApp` com nome do produto na mensagem
    - Implementar lazy loading para imagens
    - Adicionar fallback para erro de carregamento de imagem
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 13.2_
  
  - [x] 5.3 Criar componente `src/components/landing/ProductsSection.tsx`
    - Definir array de produtos (mínimo 3 produtos)
    - Implementar grid responsivo (1 col mobile, 2-3 cols desktop)
    - Renderizar ProductCardLanding para cada produto
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_
  
  - [x] 5.4 Escrever teste de propriedade para completude de product card
    - **Property 2: Product Card Completeness**
    - **Valida: Requirements 3.2, 3.3, 3.4, 3.5, 3.6**
    - Testar que qualquer produto renderiza todos os campos obrigatórios
  
  - [x] 5.5 Escrever teste de propriedade para mensagem WhatsApp específica do produto
    - **Property 3: Product-Specific WhatsApp Message**
    - **Valida: Requirements 3.7, 12.5**
    - Testar que mensagem inclui nome do produto

- [x] 6. Checkpoint - Validar componentes principais
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implementar SocialProofSection e TestimonialCard
  - [x] 7.1 Criar interface `Testimonial` em `src/types/landing.ts`
    - Definir tipos: id, name, avatar, rating, text, date (opcional)
    - _Requirements: 4.2, 4.3, 4.4_
  
  - [x] 7.2 Criar componente `src/components/landing/TestimonialCard.tsx`
    - Implementar card com avatar, nome, rating, texto
    - Aplicar estilos para layout de depoimento
    - _Requirements: 4.2, 4.3, 4.4_
  
  - [x] 7.3 Criar componente `src/components/landing/SocialProofSection.tsx`
    - Definir array de depoimentos (mínimo 3)
    - Implementar grid responsivo
    - Renderizar TestimonialCard para cada depoimento
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [x] 7.4 Escrever teste de propriedade para completude de depoimentos
    - **Property 5: Testimonial Completeness**
    - **Valida: Requirements 4.2, 4.3, 4.4**
    - Testar que qualquer depoimento renderiza todos os campos obrigatórios

- [x] 8. Implementar EducationalSection e TipCard
  - [x] 8.1 Criar interface `Tip` em `src/types/landing.ts`
    - Definir tipos: icon, title, description
    - _Requirements: 5.3_
  
  - [x] 8.2 Criar componente `src/components/landing/TipCard.tsx`
    - Implementar card com ícone e texto
    - Aplicar estilos para layout de dica
    - _Requirements: 5.3, 5.4_
  
  - [x] 8.3 Criar componente `src/components/landing/EducationalSection.tsx`
    - Definir array de dicas (mínimo 3)
    - Implementar grid responsivo
    - Renderizar TipCard para cada dica
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [x] 8.4 Escrever teste de propriedade para estrutura de dicas educacionais
    - **Property 6: Educational Tip Structure**
    - **Valida: Requirements 5.3**
    - Testar que qualquer dica inclui elemento de ícone

- [x] 9. Implementar PromotionalBanner
  - [x] 9.1 Criar componente `src/components/landing/PromotionalBanner.tsx`
    - Implementar banner com gradiente de fundo
    - Adicionar ícones para frete grátis, descontos, período de teste
    - Adicionar botão CTA "Falar no WhatsApp"
    - Integrar `openWhatsApp` com mensagem de promoção
    - Aplicar cores contrastantes para destaque
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  
  - [x] 9.2 Escrever testes unitários para PromotionalBanner
    - Testar renderização de benefícios promocionais
    - Testar presença de botão CTA
    - _Requirements: 6.1-6.4_

- [x] 10. Implementar FinalCTASection
  - [x] 10.1 Criar componente `src/components/landing/FinalCTASection.tsx`
    - Implementar seção com frase motivacional
    - Adicionar botão CTA grande e proeminente
    - Integrar `openWhatsApp` com mensagem final
    - Aplicar ênfase visual
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  
  - [x] 10.2 Escrever testes unitários para FinalCTASection
    - Testar renderização de frase motivacional
    - Testar presença de botão CTA
    - _Requirements: 7.1, 7.2_

- [x] 11. Implementar FloatingWhatsAppButton
  - [x] 11.1 Criar componente `src/components/landing/FloatingWhatsAppButton.tsx`
    - Implementar botão fixo no canto inferior direito
    - Adicionar lógica de visibilidade baseada em scroll (aparecer após 300px)
    - Aplicar z-index alto para ficar sobre outros elementos
    - Integrar `openWhatsApp` com mensagem do floating button
    - Adicionar animação de transição suave
    - Garantir tamanho mínimo de 44px x 44px
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 9.6_
  
  - [x] 11.2 Escrever testes unitários para FloatingWhatsAppButton
    - Testar posicionamento fixo
    - Testar visibilidade baseada em scroll
    - Testar z-index alto
    - _Requirements: 8.1, 8.2, 8.4_

- [x] 12. Implementar LandingFooter
  - [x] 12.1 Criar componente `src/components/landing/LandingFooter.tsx`
    - Implementar grid com 3 colunas (sobre, contato, redes sociais)
    - Adicionar informações da empresa
    - Adicionar endereço e contatos
    - Adicionar links de redes sociais
    - Implementar layout responsivo (1 col mobile, 3 cols desktop)
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_
  
  - [x] 12.2 Escrever testes unitários para LandingFooter
    - Testar renderização de informações da empresa
    - Testar renderização de contatos
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [x] 13. Integrar todos os componentes na LandingPage
  - [x] 13.1 Montar página completa em `src/pages/LandingPage.tsx`
    - Importar todos os componentes de seção
    - Organizar componentes na ordem correta
    - Aplicar container principal com bg-white
    - Adicionar FloatingWhatsAppButton como último elemento
    - _Requirements: 1.1-14.7_
  
  - [x] 13.2 Escrever teste de integração para página completa
    - Testar renderização de todas as seções
    - Testar ausência de erros de console
    - _Requirements: 1.1-14.7_

- [x] 14. Checkpoint - Validar integração completa
  - Ensure all tests pass, ask the user if questions arise.

- [x] 15. Implementar otimizações de acessibilidade
  - [x] 15.1 Adicionar alt text descritivo para todas as imagens
    - Revisar todos os componentes com imagens
    - Garantir alt text significativo (não genérico)
    - _Requirements: 14.1_
  
  - [x] 15.2 Implementar navegação por teclado e indicadores de foco
    - Adicionar classes focus: do Tailwind em todos os elementos interativos
    - Testar navegação com Tab em todos os botões e links
    - _Requirements: 14.4, 14.5_
  
  - [x] 15.3 Adicionar ARIA labels para elementos icon-only
    - Adicionar aria-label no FloatingWhatsAppButton
    - Adicionar aria-label em outros botões sem texto visível
    - _Requirements: 14.7_
  
  - [x] 15.4 Validar hierarquia semântica de HTML
    - Garantir uso de elementos section, article, header, footer
    - Validar hierarquia de headings (h1 → h2 → h3)
    - _Requirements: 14.6_
  
  - [x] 15.5 Escrever teste de propriedade para acessibilidade de imagens
    - **Property 8: Image Accessibility and Performance**
    - **Valida: Requirements 9.4, 13.2, 14.1**
    - Testar que qualquer imagem tem alt text e lazy loading apropriado
  
  - [x] 15.6 Escrever teste de propriedade para tamanho de touch targets
    - **Property 9: CTA Touch Target Size**
    - **Valida: Requirements 9.6**
    - Testar que qualquer botão CTA tem mínimo 44px x 44px
  
  - [x] 15.7 Escrever teste de propriedade para contraste de texto
    - **Property 10: Text Contrast Compliance**
    - **Valida: Requirements 14.2, 14.3**
    - Testar que qualquer texto tem contraste adequado (4.5:1 ou 3:1)
  
  - [x] 15.8 Escrever teste de propriedade para acessibilidade de teclado
    - **Property 11: Interactive Element Keyboard Accessibility**
    - **Valida: Requirements 14.4, 14.5**
    - Testar que qualquer elemento interativo é navegável por teclado
  
  - [x] 15.9 Escrever teste de propriedade para estrutura HTML semântica
    - **Property 12: Semantic HTML Structure**
    - **Valida: Requirements 14.6**
    - Testar que seções principais usam elementos semânticos
  
  - [x] 15.10 Escrever teste de propriedade para ARIA labels
    - **Property 13: ARIA Label Presence**
    - **Valida: Requirements 14.7**
    - Testar que elementos icon-only têm ARIA labels

- [x] 16. Implementar otimizações de performance
  - [x] 16.1 Otimizar carregamento de imagens
    - Implementar lazy loading para imagens abaixo da dobra
    - Adicionar placeholders de baixa qualidade (LQIP) opcional
    - Implementar handler onError para fallback de imagens
    - _Requirements: 13.2, 13.3_
  
  - [x] 16.2 Configurar meta tags para SEO básico
    - Adicionar useEffect para definir document.title
    - Atualizar meta description
    - _Requirements: 13.1, 13.4_
  
  - [x] 16.3 Executar auditoria Lighthouse
    - Validar performance score >= 85
    - Validar acessibilidade score >= 90
    - _Requirements: 13.5_

- [x] 17. Implementar testes de propriedade para comportamento WhatsApp
  - [x] 17.1 Escrever teste de propriedade para comportamento de CTA WhatsApp
    - **Property 1: WhatsApp CTA Behavior**
    - **Valida: Requirements 1.7, 7.4, 8.5, 12.1, 12.2, 12.4**
    - Testar que qualquer botão CTA abre WhatsApp com mensagem pré-preenchida
    - Testar todos os tipos de CTA (hero, product, promo, final, floating)

- [x] 18. Validação final e testes de responsividade
  - [x] 18.1 Testar layout responsivo em múltiplos breakpoints
    - Testar em 320px (mobile pequeno)
    - Testar em 375px (mobile médio)
    - Testar em 768px (tablet)
    - Testar em 1024px (desktop)
    - Testar em 1920px (desktop grande)
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
  
  - [x] 18.2 Executar suite completa de testes
    - Executar todos os testes unitários
    - Executar todos os testes de propriedade (13 propriedades)
    - Validar cobertura de testes >= 80%

- [x] 19. Checkpoint final - Validação completa
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marcadas com `*` são opcionais e podem ser puladas para um MVP mais rápido
- Cada task referencia requirements específicos para rastreabilidade
- Checkpoints garantem validação incremental
- Testes de propriedade validam propriedades universais de correção
- Testes unitários validam exemplos específicos e casos extremos
- A implementação usa TypeScript + React + Tailwind CSS conforme stack do projeto
- Instalar `fast-check` para testes de propriedade: `npm install -D fast-check`
- Todos os 13 testes de propriedade devem incluir comentário com tag: `// Feature: landing-page-colchoes, Property N: [Nome]`
