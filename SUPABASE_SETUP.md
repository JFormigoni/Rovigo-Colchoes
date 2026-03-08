# Configuração do Supabase - Loja de Colchões

## Visão Geral

Este projeto usa Supabase como backend, que fornece:
- **PostgreSQL Database** (Firestore equivalente)
- **Authentication** (Login de usuários)
- **Row Level Security** (Segurança de dados)
- **Realtime** (Atualizações em tempo real - opcional)

---

## Passo 1: Criar Projeto no Supabase

1. Acesse: **https://supabase.com/**
2. Clique em **"Start your project"**
3. Faça login com GitHub, Google ou email
4. Clique em **"New project"**
5. Preencha:
   - **Name**: `loja-colchoes`
   - **Database Password**: Crie uma senha forte (anote!)
   - **Region**: `South America (São Paulo)`
6. Clique em **"Create new project"**
7. Aguarde 2-3 minutos para o projeto ser criado

---

## Passo 2: Criar Tabela de Produtos

1. No menu lateral, clique em **"Table Editor"**
2. Clique em **"Create a new table"**
3. Preencha:
   - **Name**: `produtos`
   - **Description**: `Tabela de produtos da loja`
   - Desmarque **"Enable Row Level Security (RLS)"** por enquanto

4. Adicione as seguintes colunas:

| Nome | Tipo | Default | Configurações |
|------|------|---------|---------------|
| id | uuid | gen_random_uuid() | Primary Key, Auto-increment |
| created_at | timestamptz | now() | - |
| nome | text | - | Not null |
| descricao | text | - | Not null |
| preco | numeric | - | Not null |
| preco_promocional | numeric | null | Nullable |
| promocao | boolean | false | Not null |
| destaque | boolean | false | Not null |
| estoque | boolean | true | Not null |
| cores | text[] | {} | Array, Not null |
| tamanhos | text[] | {} | Array, Not null |
| imagem | text | null | Nullable |

5. Clique em **"Save"**

---

## Passo 3: Configurar Row Level Security (RLS)

1. Ainda no Table Editor, clique na tabela **`produtos`**
2. Clique em **"RLS disabled"** para ativar
3. Clique em **"New Policy"**

### Política 1: Leitura Pública

- **Policy name**: `Permitir leitura pública`
- **Policy command**: `SELECT`
- **Target roles**: `public`
- **USING expression**: `true`
- Clique em **"Review"** → **"Save policy"**

### Política 2: Escrita Autenticada

- Clique em **"New Policy"** novamente
- **Policy name**: `Permitir escrita para usuários autenticados`
- **Policy command**: `ALL`
- **Target roles**: `authenticated`
- **USING expression**: `true`
- **WITH CHECK expression**: `true`
- Clique em **"Review"** → **"Save policy"**

---

## Passo 4: Criar Usuário Admin

1. No menu lateral, clique em **"Authentication"**
2. Clique em **"Users"**
3. Clique em **"Add user"** → **"Create new user"**
4. Preencha:
   - **Email**: `admin@sualoja.com`
   - **Password**: Crie uma senha forte
   - **Auto Confirm User**: Marque esta opção
5. Clique em **"Create user"**

---

## Passo 5: Obter Credenciais

1. No menu lateral, clique em **"Project Settings"** (ícone de engrenagem)
2. Clique em **"API"**
3. Você verá:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJhbGc...` (chave pública)

---

## Passo 6: Configurar Variáveis de Ambiente

1. Na raiz do projeto, crie um arquivo `.env`
2. Cole o seguinte conteúdo:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

3. Substitua pelos valores copiados do Supabase
4. Salve o arquivo

**IMPORTANTE:** Nunca commite o arquivo `.env` no Git!

---

## Passo 7: Instalar Dependências

```bash
npm install
```

---

## Passo 8: Executar o Projeto

```bash
npm run dev
```

O projeto estará disponível em: **http://localhost:5173**

---

## Passo 9: Testar o Sistema

### Testar Frontend

1. Acesse `http://localhost:5173`
2. Navegue pelas páginas
3. Verifique se a home carrega

### Testar Login Admin

1. Acesse `http://localhost:5173/admin/login`
2. Faça login com o email e senha criados no Passo 4
3. Você deve ser redirecionado para `/admin`

### Adicionar Produto de Teste

1. No painel admin, clique em **"Adicionar Novo Produto"**
2. Preencha os campos:
   - **Nome**: Colchão Teste
   - **Descrição**: Produto de teste
   - **Preço**: 999.90
   - **Cores**: Branco, Cinza
   - **Tamanhos**: Marque Queen
   - **URL da Imagem**: `https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800`
3. Clique em **"Salvar Produto"**
4. Verifique se o produto aparece na lista

### Testar Página de Produtos

1. Acesse `http://localhost:5173/produtos`
2. O produto deve aparecer
3. Clique no produto
4. Selecione cor e tamanho
5. Clique em **"Falar com Vendedor no WhatsApp"**
6. Verifique se abre o WhatsApp com a mensagem correta

---

## Passo 10: Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`

---

## Deploy

### Opção 1: Vercel (Recomendado)

1. Instale o Vercel CLI:
```bash
npm install -g vercel
```

2. Faça deploy:
```bash
vercel
```

3. Configure as variáveis de ambiente no dashboard da Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Opção 2: Netlify

1. Instale o Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Faça deploy:
```bash
netlify deploy --prod
```

3. Configure as variáveis de ambiente no dashboard do Netlify

### Opção 3: Supabase Hosting (Em breve)

O Supabase está desenvolvendo seu próprio serviço de hosting.

---

## Estrutura do Banco de Dados

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

-- Política de leitura pública
CREATE POLICY "Permitir leitura pública"
ON produtos FOR SELECT
TO public
USING (true);

-- Política de escrita autenticada
CREATE POLICY "Permitir escrita para usuários autenticados"
ON produtos FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
```

---

## Configurar WhatsApp

No arquivo `src/components/ProductModal.tsx` e `src/pages/About.tsx`, altere:

```typescript
const WHATSAPP_NUMBER = '5511999999999' // Seu número
```

Formato: código do país (55) + DDD + número

---

## Problemas Comuns

### Erro: "Invalid API key"
- Verifique se copiou corretamente as credenciais
- Verifique se o arquivo `.env` está na raiz do projeto
- Reinicie o servidor de desenvolvimento

### Erro: "Row Level Security"
- Verifique se criou as políticas de RLS corretamente
- Teste desabilitando RLS temporariamente para debug

### Login não funciona
- Verifique se criou o usuário no Supabase
- Verifique se marcou "Auto Confirm User"
- Tente resetar a senha do usuário

### Produtos não aparecem
- Verifique se a tabela foi criada corretamente
- Verifique as políticas de RLS
- Abra o console do navegador para ver erros

---

## Recursos Úteis

- **Documentação Supabase**: https://supabase.com/docs
- **Supabase Dashboard**: https://app.supabase.com/
- **Supabase Discord**: https://discord.supabase.com/
- **React + Supabase Tutorial**: https://supabase.com/docs/guides/getting-started/tutorials/with-react

---

## Vantagens do Supabase vs Firebase

✅ **Open Source** - Código aberto  
✅ **PostgreSQL** - Banco de dados relacional completo  
✅ **Mais barato** - Plano gratuito mais generoso  
✅ **SQL direto** - Queries SQL nativas  
✅ **Self-hosting** - Pode hospedar você mesmo  
✅ **Sem vendor lock-in** - Seus dados são seus  

---

**Pronto! Seu projeto está configurado com Supabase.** 🚀
