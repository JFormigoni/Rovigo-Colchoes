# Loja de Colchões - React + TypeScript + Supabase

Website moderno e completo para loja de colchões com painel administrativo.

## 🚀 Tecnologias

- **React 18** - Framework UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Estilização utility-first
- **Lucide React** - Ícones modernos
- **Supabase** - Backend completo (Database + Auth)
- **React Router** - Navegação entre páginas

## ✨ Funcionalidades

### Frontend (Público)

- ✅ **Home** - Banner hero, produtos em destaque, sobre a loja
- ✅ **Produtos** - Catálogo completo com filtros
- ✅ **Detalhes do Produto** - Modal com seleção de cor e tamanho
- ✅ **Integração WhatsApp** - Mensagem automática com dados do produto
- ✅ **Sobre Nós** - História, missão, visão e valores
- ✅ **Design Responsivo** - Mobile-first, otimizado para todos os dispositivos

### Painel Admin (Protegido)

- ✅ **Login Seguro** - Autenticação via Supabase
- ✅ **Dashboard** - Lista de todos os produtos
- ✅ **CRUD Completo** - Criar, editar e deletar produtos
- ✅ **Upload de Imagens** - Via URL externa (Imgur, Cloudinary)
- ✅ **Gerenciar Status** - Promoção, destaque, estoque
- ✅ **Interface Intuitiva** - Formulários validados e feedback visual

### Fluxo de Compra

1. Cliente navega pelos produtos
2. Clica em um produto de interesse
3. Seleciona cor e tamanho desejados
4. Clica em "Falar com Vendedor no WhatsApp"
5. Mensagem automática é gerada com todos os detalhes
6. Cliente é redirecionado para WhatsApp

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (gratuita)

### Passo 1: Clone o repositório

```bash
git clone https://github.com/seu-usuario/loja-colchoes.git
cd loja-colchoes
```

### Passo 2: Instale as dependências

```bash
npm install
```

### Passo 3: Configure o Supabase

Siga o guia completo em **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**

Resumo:
1. Crie um projeto no Supabase
2. Crie a tabela `produtos`
3. Configure Row Level Security
4. Crie um usuário admin
5. Copie as credenciais

### Passo 4: Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### Passo 5: Execute o projeto

```bash
npm run dev
```

Acesse: **http://localhost:5173**

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout.tsx      # Layout principal com navbar e footer
│   ├── Navbar.tsx      # Barra de navegação
│   ├── Footer.tsx      # Rodapé
│   ├── ProductCard.tsx # Card de produto
│   ├── ProductModal.tsx # Modal de detalhes do produto
│   └── ProductForm.tsx # Formulário de produto (admin)
├── pages/              # Páginas da aplicação
│   ├── Home.tsx        # Página inicial
│   ├── Products.tsx    # Catálogo de produtos
│   ├── About.tsx       # Sobre nós
│   ├── Login.tsx       # Login do admin
│   └── Admin.tsx       # Painel administrativo
├── lib/                # Configurações e utilitários
│   ├── supabase.ts     # Cliente Supabase
│   └── database.types.ts # Tipos TypeScript do banco
├── App.tsx             # Componente raiz com rotas
├── main.tsx            # Entry point
└── index.css           # Estilos globais + Tailwind
```

## 🎨 Personalização

### Alterar Cores

Edite `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Suas cores aqui
      },
    },
  },
},
```

### Configurar WhatsApp

Edite os arquivos:
- `src/components/ProductModal.tsx` (linha 8)
- `src/pages/About.tsx` (linha 3)

```typescript
const WHATSAPP_NUMBER = '5511999999999' // Seu número
```

### Alterar Logo

Edite `src/components/Navbar.tsx` (linha 13):

```tsx
<Link to="/" className="text-2xl font-bold">
  Seu Logo Aqui
</Link>
```

## 📱 Hospedagem de Imagens

Como o projeto não usa storage próprio, hospede as imagens em:

- **Imgur** (recomendado): https://imgur.com/upload
- **Cloudinary**: https://cloudinary.com/
- **ImgBB**: https://imgbb.com/

Consulte **[HOSPEDAGEM_IMAGENS.md](./HOSPEDAGEM_IMAGENS.md)** para detalhes.

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

Os arquivos estarão em `dist/`

## 🗄️ Banco de Dados

### Tabela: produtos

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid | ID único (gerado automaticamente) |
| created_at | timestamptz | Data de criação |
| nome | text | Nome do produto |
| descricao | text | Descrição detalhada |
| preco | numeric | Preço normal |
| preco_promocional | numeric | Preço em promoção (opcional) |
| promocao | boolean | Se está em promoção |
| destaque | boolean | Se aparece na home |
| estoque | boolean | Se está disponível |
| cores | text[] | Array de cores disponíveis |
| tamanhos | text[] | Array de tamanhos disponíveis |
| imagem | text | URL da imagem |

## 🔒 Segurança

- ✅ Row Level Security (RLS) habilitado
- ✅ Leitura pública de produtos
- ✅ Escrita apenas para usuários autenticados
- ✅ Senhas criptografadas pelo Supabase
- ✅ Tokens JWT para autenticação

## 📝 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Verifica código com ESLint
```

## 🐛 Problemas Comuns

### Erro: "Invalid API key"
- Verifique o arquivo `.env`
- Reinicie o servidor (`npm run dev`)

### Produtos não aparecem
- Verifique as políticas de RLS no Supabase
- Abra o console do navegador para ver erros

### Login não funciona
- Verifique se criou o usuário no Supabase
- Confirme que o usuário está ativo

## 📚 Documentação

- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Configuração completa do Supabase
- **[HOSPEDAGEM_IMAGENS.md](./HOSPEDAGEM_IMAGENS.md)** - Como hospedar imagens
- **[PRODUTOS_EXEMPLO.md](./PRODUTOS_EXEMPLO.md)** - Produtos prontos para teste

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 🆘 Suporte

- **Documentação Supabase**: https://supabase.com/docs
- **Documentação React**: https://react.dev/
- **Documentação Tailwind**: https://tailwindcss.com/docs

---

**Desenvolvido com ❤️ usando React + TypeScript + Supabase**
