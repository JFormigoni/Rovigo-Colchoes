# Guia de Configuração do Projeto

## 📱 Configurar Número do WhatsApp

O número do WhatsApp está centralizado em um único arquivo para facilitar a manutenção.

### Como Alterar o Número

Edite o arquivo **`src/lib/config.ts`**:

```typescript
export const WHATSAPP_NUMBER = '5547997794812' // Seu número aqui
```

**Formato do número:**
- Código do país (55 = Brasil)
- DDD (47 = Santa Catarina)
- Número (997794812)
- **Sem espaços, traços ou parênteses**

**Exemplos:**
- São Paulo: `5511987654321`
- Rio de Janeiro: `5521987654321`
- Santa Catarina: `5547997794812`

### Componentes que Usam o WhatsApp

O número é usado automaticamente em:
- ✅ `src/pages/About.tsx` - Botão de contato
- ✅ `src/components/ProductModal.tsx` - Botão de interesse em produto

### Funções Disponíveis

O arquivo `src/lib/config.ts` exporta 3 itens:

```typescript
// 1. Número do WhatsApp
export const WHATSAPP_NUMBER = '5547997794812'

// 2. Gerar link do WhatsApp
export function getWhatsAppLink(message: string): string

// 3. Abrir WhatsApp em nova aba
export function openWhatsApp(message: string): void
```

### Como Usar em Novos Componentes

Se você criar novos componentes que precisam do WhatsApp:

```typescript
import { openWhatsApp, getWhatsAppLink } from '@/lib/config'

// Opção 1: Abrir diretamente
function handleClick() {
  openWhatsApp('Olá, tenho uma dúvida!')
}

// Opção 2: Apenas gerar o link
function MyComponent() {
  const link = getWhatsAppLink('Olá!')
  return <a href={link}>Falar no WhatsApp</a>
}
```

---

## 🗄️ Configurar Supabase

### 1. Criar arquivo .env

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### 2. Obter Credenciais

1. Acesse: https://app.supabase.com/
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`

### 3. Reiniciar Servidor

Após criar/editar o `.env`:

```bash
# Pare o servidor (Ctrl+C)
# Inicie novamente
npm run dev
```

---

## 🎨 Personalizar Cores

### Alterar Cor Principal

Edite **`tailwind.config.js`**:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',  // Cor principal
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      },
    },
  },
},
```

### Gerar Paleta de Cores

Use ferramentas online:
- https://uicolors.app/create
- https://tailwindshades.com/

---

## 🏷️ Alterar Nome da Loja

### Navbar

Edite **`src/components/Navbar.tsx`** (linha 13):

```tsx
<Link to="/" className="text-2xl font-bold">
  Rovigo Colchões  {/* Seu nome aqui */}
</Link>
```

### Título das Páginas

Edite **`index.html`** (linha 7):

```html
<title>Rovigo Colchões - Conforto e Qualidade</title>
```

### Textos da Home

Edite **`src/pages/Home.tsx`**:

```tsx
<h1 className="text-5xl md:text-6xl font-bold mb-6">
  Durma Melhor, Viva Melhor  {/* Seu slogan */}
</h1>
```

---

## 📝 Alterar Textos da Página Sobre

Edite **`src/pages/About.tsx`**:

```tsx
<p className="text-gray-700 leading-relaxed">
  Fundada em 2004, a ColchõesTop...  {/* Sua história */}
</p>
```

---

## 🖼️ Adicionar Logo

### Opção 1: Texto Personalizado

Já está configurado! Basta alterar o texto na Navbar.

### Opção 2: Imagem

1. Coloque sua logo em `public/logo.png`
2. Edite **`src/components/Navbar.tsx`**:

```tsx
<Link to="/" className="flex items-center">
  <img src="/logo.png" alt="Logo" className="h-10" />
</Link>
```

---

## 🔧 Configurações Avançadas

### Alterar Porta do Servidor

Edite **`vite.config.ts`**:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Porta desejada
  },
})
```

### Adicionar Variáveis de Ambiente

1. Adicione no `.env`:
```env
VITE_NOME_DA_LOJA=Rovigo Colchões
VITE_EMAIL_CONTATO=contato@rovigo.com
```

2. Use no código:
```typescript
const nomeLoja = import.meta.env.VITE_NOME_DA_LOJA
```

---

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Verificar código
npm run lint
```

---

## 🚀 Deploy

### Vercel

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

---

## 📚 Arquivos de Configuração

| Arquivo | Descrição |
|---------|-----------|
| `src/lib/config.ts` | WhatsApp e configurações gerais |
| `.env` | Credenciais Supabase (não commitar) |
| `tailwind.config.js` | Cores e tema |
| `vite.config.ts` | Configuração do Vite |
| `tsconfig.json` | Configuração TypeScript |

---

## ✅ Checklist de Configuração

- [ ] Configurar número do WhatsApp em `src/lib/config.ts`
- [ ] Criar arquivo `.env` com credenciais Supabase
- [ ] Alterar nome da loja na Navbar
- [ ] Personalizar textos da página Sobre
- [ ] Ajustar cores no `tailwind.config.js` (opcional)
- [ ] Adicionar logo (opcional)
- [ ] Testar todas as funcionalidades

---

**Pronto! Seu projeto está configurado.** 🎉
