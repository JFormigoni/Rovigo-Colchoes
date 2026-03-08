# Loja de Colchões - Projeto React + TypeScript + Supabase

## ✅ Migração Completa Realizada

O projeto foi completamente migrado de HTML/CSS/JavaScript + Firebase para:

- ⚛️ **React 18** com TypeScript
- 🎨 **Tailwind CSS** para estilização
- 🎯 **Lucide React** para ícones
- 🗄️ **Supabase** como backend (substituindo Firebase)
- ⚡ **Vite** como build tool

---

## 📁 Estrutura do Projeto

```
loja-colchoes/
├── src/
│   ├── components/
│   │   ├── Layout.tsx           # Layout principal
│   │   ├── Navbar.tsx           # Navegação responsiva
│   │   ├── Footer.tsx           # Rodapé
│   │   ├── ProductCard.tsx      # Card de produto
│   │   ├── ProductModal.tsx     # Modal de detalhes
│   │   └── ProductForm.tsx      # Formulário admin
│   ├── pages/
│   │   ├── Home.tsx             # Página inicial
│   │   ├── Products.tsx         # Catálogo
│   │   ├── About.tsx            # Sobre nós
│   │   ├── Login.tsx            # Login admin
│   │   └── Admin.tsx            # Painel admin
│   ├── lib/
│   │   ├── supabase.ts          # Cliente Supabase
│   │   └── database.types.ts    # Tipos TypeScript
│   ├── App.tsx                  # Rotas
│   ├── main.tsx                 # Entry point
│   └── index.css                # Estilos globais
├── index.html                   # HTML raiz (Vite)
├── package.json                 # Dependências
├── tsconfig.json                # Config TypeScript
├── tailwind.config.js           # Config Tailwind
├── vite.config.ts               # Config Vite
├── .env.example                 # Template env vars
├── .gitignore                   # Arquivos ignorados
├── README.md                    # Documentação principal
├── SUPABASE_SETUP.md            # Guia Supabase
├── HOSPEDAGEM_IMAGENS.md        # Guia de imagens
└── PRODUTOS_EXEMPLO.md          # Produtos de teste
```

---

## 🚀 Como Iniciar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Supabase

Siga o guia completo: **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**

Resumo rápido:
1. Crie projeto no Supabase
2. Crie tabela `produtos`
3. Configure RLS (Row Level Security)
4. Crie usuário admin
5. Copie credenciais

### 3. Configurar Variáveis de Ambiente

Crie arquivo `.env`:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### 4. Executar Projeto

```bash
npm run dev
```

Acesse: **http://localhost:5173**

---

## 🎯 Funcionalidades Implementadas

### Frontend Público

✅ **Home**
- Hero section com gradiente
- Produtos em destaque (carregados do Supabase)
- Seção sobre a loja
- Design responsivo

✅ **Produtos**
- Grid de produtos
- Cards com imagem, preço, badges
- Modal de detalhes ao clicar
- Seleção de cor e tamanho
- Botão WhatsApp com mensagem automática

✅ **Sobre Nós**
- História da empresa
- Missão, visão e valores
- Botão de contato WhatsApp

✅ **Navegação**
- Navbar responsiva com menu mobile
- Links entre páginas
- Footer

### Painel Administrativo

✅ **Login**
- Autenticação via Supabase
- Validação de formulário
- Redirecionamento automático

✅ **Dashboard**
- Lista de todos os produtos
- Cards com preview de imagem
- Badges de status (promoção, destaque, estoque)
- Botões de editar e excluir

✅ **CRUD de Produtos**
- Adicionar novo produto
- Editar produto existente
- Deletar produto (com confirmação)
- Upload de imagem via URL
- Seleção múltipla de cores e tamanhos
- Checkboxes para promoção, destaque e estoque

---

## 🔧 Tecnologias e Bibliotecas

### Core
- **React 18.2.0** - Framework UI
- **TypeScript 5.2.2** - Tipagem estática
- **Vite 5.0.8** - Build tool

### UI/Styling
- **Tailwind CSS 3.4.0** - Utility-first CSS
- **Lucide React 0.309.0** - Ícones SVG
- **PostCSS 8.4.32** - Processador CSS
- **Autoprefixer 10.4.16** - Prefixos CSS

### Backend/Database
- **Supabase JS 2.39.3** - Cliente Supabase
  - PostgreSQL Database
  - Authentication
  - Row Level Security

### Routing
- **React Router DOM 6.21.1** - Navegação SPA

### Dev Tools
- **ESLint** - Linter
- **TypeScript ESLint** - Linting TypeScript

---

## 📊 Comparação: Antes vs Depois

| Aspecto | Antes (Firebase) | Depois (Supabase) |
|---------|------------------|-------------------|
| Frontend | HTML/CSS/JS | React + TypeScript |
| Estilização | CSS puro | Tailwind CSS |
| Ícones | Nenhum | Lucide React |
| Backend | Firebase | Supabase |
| Database | Firestore (NoSQL) | PostgreSQL (SQL) |
| Auth | Firebase Auth | Supabase Auth |
| Storage | Firebase Storage | URLs externas |
| Build | Nenhum | Vite |
| Tipagem | Nenhuma | TypeScript |
| Componentes | Nenhum | Reutilizáveis |
| Routing | Multi-página | SPA (React Router) |

---

## 🎨 Customização

### Alterar Cores do Tema

Edite `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#0ea5e9',  // Sua cor principal
        600: '#0284c7',
        700: '#0369a1',
      },
    },
  },
},
```

### Configurar WhatsApp

Edite em 2 arquivos:

**src/components/ProductModal.tsx** (linha 8):
```typescript
const WHATSAPP_NUMBER = '5511999999999'
```

**src/pages/About.tsx** (linha 3):
```typescript
const WHATSAPP_NUMBER = '5511999999999'
```

### Alterar Logo

Edite `src/components/Navbar.tsx`:

```tsx
<Link to="/" className="text-2xl font-bold">
  Seu Logo Aqui
</Link>
```

Ou adicione uma imagem:

```tsx
<Link to="/">
  <img src="/logo.png" alt="Logo" className="h-10" />
</Link>
```

---

## 🗄️ Estrutura do Banco de Dados

### Tabela: produtos

```typescript
interface Produto {
  id: string                    // UUID (auto-gerado)
  created_at: string            // Timestamp
  nome: string                  // Nome do produto
  descricao: string             // Descrição
  preco: number                 // Preço normal
  preco_promocional: number | null  // Preço promocional
  promocao: boolean             // Em promoção?
  destaque: boolean             // Destaque na home?
  estoque: boolean              // Em estoque?
  cores: string[]               // Array de cores
  tamanhos: string[]            // Array de tamanhos
  imagem: string | null         // URL da imagem
}
```

---

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

Configure as variáveis de ambiente no dashboard.

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Build Manual

```bash
npm run build
```

Arquivos otimizados em `dist/`

---

## 📝 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Verificar código
```

---

## 🔒 Segurança

✅ **Row Level Security (RLS)** habilitado no Supabase  
✅ **Leitura pública** de produtos  
✅ **Escrita apenas autenticada**  
✅ **Senhas criptografadas**  
✅ **Tokens JWT** para autenticação  
✅ **Variáveis de ambiente** para credenciais  

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Invalid API key"
- Verifique o arquivo `.env`
- Reinicie o servidor: `Ctrl+C` e `npm run dev`

### Produtos não aparecem
- Verifique RLS no Supabase
- Abra DevTools (F12) → Console para ver erros

### Build falha
```bash
npm run build -- --debug
```

---

## 📚 Documentação Adicional

- **[README.md](./README.md)** - Documentação principal
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Setup completo do Supabase
- **[HOSPEDAGEM_IMAGENS.md](./HOSPEDAGEM_IMAGENS.md)** - Como hospedar imagens
- **[PRODUTOS_EXEMPLO.md](./PRODUTOS_EXEMPLO.md)** - Produtos para teste

---

## 🎓 Recursos de Aprendizado

- **React**: https://react.dev/learn
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Supabase**: https://supabase.com/docs
- **Vite**: https://vitejs.dev/guide/

---

## ✨ Melhorias Futuras (Sugestões)

- [ ] Adicionar busca de produtos
- [ ] Filtros por preço, tamanho, cor
- [ ] Paginação de produtos
- [ ] Carrinho de compras (opcional)
- [ ] Sistema de avaliações
- [ ] Galeria de imagens por produto
- [ ] Dashboard com estatísticas
- [ ] Notificações em tempo real
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados

---

**Projeto completamente migrado e pronto para uso!** 🚀

Desenvolvido com ❤️ usando React + TypeScript + Tailwind CSS + Supabase
