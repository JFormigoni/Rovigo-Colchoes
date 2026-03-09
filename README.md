# Rovigo Colchões - E-commerce Moderno

E-commerce completo para venda de colchões com landing page moderna, catálogo de produtos e painel administrativo.

## 🚀 Tecnologias

- **React 18** - Framework frontend
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router** - Roteamento
- **Tailwind CSS** - Estilização
- **Supabase** - Backend (Database + Auth)
- **Lucide React** - Ícones
- **Vitest** - Testes unitários

## 📋 Funcionalidades

### Landing Page
- Hero section com call-to-action
- Seção de produtos em destaque
- Benefícios e diferenciais
- Depoimentos em carrossel
- Dicas educacionais
- Banner promocional
- Botão flutuante do WhatsApp

### Catálogo de Produtos
- Listagem completa de produtos
- Filtros por categoria e preço
- Modal de detalhes do produto
- Seleção de cor e tamanho
- Integração com WhatsApp

### Painel Administrativo
- Dashboard com estatísticas
- Gerenciamento de produtos (CRUD)
- Upload de imagens
- Ações rápidas (estoque, destaque, promoção)
- Autenticação segura

## 🛠️ Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no Supabase

### Passo 1: Clone o repositório
```bash
git clone <seu-repositorio>
cd loja-colchoes-react
```

### Passo 2: Instale as dependências
```bash
npm install
```

### Passo 3: Configure o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Crie a tabela `produtos`:

```sql
CREATE TABLE produtos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL,
  preco NUMERIC NOT NULL,
  preco_promocional NUMERIC,
  promocao BOOLEAN DEFAULT false,
  destaque BOOLEAN DEFAULT false,
  estoque BOOLEAN DEFAULT true,
  cores TEXT[] NOT NULL DEFAULT '{}',
  tamanhos TEXT[] NOT NULL DEFAULT '{}',
  imagem TEXT
);

-- Habilitar RLS
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;

-- Permitir leitura pública
CREATE POLICY "Permitir leitura pública"
ON produtos FOR SELECT TO public USING (true);

-- Permitir escrita autenticada
CREATE POLICY "Permitir escrita para usuários autenticados"
ON produtos FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Configurar replica identity para permitir delete
ALTER TABLE produtos REPLICA IDENTITY DEFAULT;
```

3. Crie um usuário admin em Authentication > Users

### Passo 4: Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
VITE_WHATSAPP_NUMBER=5511999999999
```

### Passo 5: Execute o projeto

```bash
npm run dev
```

Acesse: `http://localhost:5173`

## 📦 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Executa linter
npm run test         # Executa testes
npm run test:watch   # Testes em modo watch
npm run test:ui      # Interface visual dos testes
```

## 🌐 Deploy

### Vercel (Recomendado)

1. Faça push do código para GitHub
2. Importe o projeto no [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_WHATSAPP_NUMBER`
4. Deploy automático!

O arquivo `vercel.json` já está configurado para SPA routing.

### Outras Plataformas

O projeto é compatível com Netlify, Cloudflare Pages e outras plataformas que suportam SPAs.

## 🔐 Acesso Admin

- **Login**: `/admin/login`
- **Dashboard**: `/admin`

Use as credenciais criadas no Supabase para acessar.

## 📱 Estrutura de Rotas

```
/                    → Landing Page
/produtos            → Catálogo de produtos
/sobre               → Página sobre a empresa
/admin/login         → Login administrativo
/admin               → Dashboard admin
```

## 🎨 Personalização

### Cores
Edite `src/index.css` para alterar o esquema de cores.

### WhatsApp
Configure o número no arquivo `.env` ou em `src/lib/whatsapp.ts`.

### Conteúdo
Edite os componentes em `src/components/landing/` para personalizar textos e imagens.

## 🧪 Testes

O projeto inclui testes unitários e property-based tests:

```bash
npm run test        # Executa todos os testes
npm run test:ui     # Interface visual
```

## 📄 Licença

Este projeto é privado e proprietário.

## 🤝 Suporte

Para dúvidas ou problemas, entre em contato com o desenvolvedor.
